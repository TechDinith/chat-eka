import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

const ref = collection(firestore, "privateMessages");

export function conversationId(a: string, b: string) {
  return [a, b].sort().join("-");
}

export function subscribeConversation(
  id: string,
  onMessages: (msgs: string[]) => void
): Unsubscribe {
  return onSnapshot(doc(ref, id), (snap) => {
    if (snap.exists()) {
      onMessages(snap.data().messages ?? []);
    } else {
      onMessages([]);
    }
  });
}

export async function sendMessage(
  convId: string,
  senderId: string,
  recipientId: string,
  username: string,
  text: string
) {
  const convDoc = doc(ref, convId);
  const snap = await getDoc(convDoc);
  const msg = `${username}: ${text}`;

  if (snap.exists()) {
    const messages = snap.data().messages ?? [];
    await updateDoc(convDoc, { messages: [...messages, msg] });
  } else {
    await setDoc(convDoc, {
      participants: [senderId, recipientId],
      messages: [msg],
    });
  }
}

export async function notifyNewMessage(recipientId: string, senderId: string) {
  const recipientDoc = doc(collection(firestore, "activeUsers"), recipientId);
  const snap = await getDoc(recipientDoc);
  if (!snap.exists()) return;

  const data = snap.data();
  const existing = Array.isArray(data.hasNewMessage) ? data.hasNewMessage : [];
  await updateDoc(recipientDoc, {
    hasNewMessage: [...existing, senderId],
  });
}
