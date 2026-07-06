import { useState, useEffect, useCallback } from "react";
import type { User } from "../interfaces/user.interface";
import * as activeUsers from "../services/activeUsers";
import {
  extractBirthYear,
  extractGender,
  calculateAge,
} from "../functions/functions.chat";

const SESSION_KEY = "chat-eka-session";

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(u: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(u));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(loadSession);

  useEffect(() => {
    if (!user?.docId) return;
    return activeUsers.subscribeUser(user.docId, (updated) => {
      setUser(updated);
      saveSession(updated);
    });
  }, [user?.docId]);

  const login = useCallback(async (username: string, nic: string) => {
    const birthYear = extractBirthYear(nic);
    const gender = extractGender(nic);
    const age = calculateAge(Number(birthYear)).toString();

    const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(nic))))
      .slice(0, 10).map((b) => b.toString(16).padStart(2, "0")).join("");
    await activeUsers.setUser(hash, { username, age, gender });
    const u: User = { username, age, gender, docId: hash };
    saveSession(u);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    if (!user?.docId) return;
    await activeUsers.removeUser(user.docId);
    activeUsers.deleteUserPrivateMessages(user.docId).catch(() => {});
    clearSession();
    setUser(null);
  }, [user?.docId]);

  return { user, setUser, login, logout };
}
