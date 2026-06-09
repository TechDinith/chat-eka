import { useState, useEffect, useCallback } from "react";
import type { User } from "../interfaces/user.interface";
import * as activeUsers from "../services/activeUsers";
import {
  extractBirthYear,
  extractGender,
  calculateAge,
} from "../functions/functions.chat";

function loadSession(): User | null {
  const username = localStorage.getItem("username");
  const age = localStorage.getItem("age");
  const gender = localStorage.getItem("gender");
  const docId = localStorage.getItem("docId");
  return username && age && gender && docId
    ? { username, age, gender, docId }
    : null;
}

function saveSession(u: User) {
  localStorage.setItem("username", u.username);
  localStorage.setItem("age", u.age);
  localStorage.setItem("gender", u.gender);
  localStorage.setItem("docId", u.docId);
}

function clearSession() {
  ["username", "nic", "age", "gender", "docId"].forEach((k) =>
    localStorage.removeItem(k)
  );
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
    const age = calculateAge(Number(birthYear));
    const ageStr = age.toString();

    const docId = await activeUsers.createUser({ username, age: ageStr, gender });
    const u: User = { username, age: ageStr, gender, docId };
    localStorage.setItem("nic", nic);
    saveSession(u);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    if (!user?.docId) return;
    await activeUsers.removeUser(user.docId);
    await activeUsers.deleteUserPrivateMessages(user.docId);
    clearSession();
    setUser(null);
  }, [user?.docId]);

  return { user, setUser, login, logout };
}
