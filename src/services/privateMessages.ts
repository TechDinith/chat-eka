import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
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
    onMessages(snap.exists() ? snap.data().messages ?? [] : []);
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
  const msg = `${username}: ${text}`;

  const snap = await getDoc(convDoc);
  const messages = snap.exists() ? snap.data().messages ?? [] : [];
  await setDoc(convDoc, {
    participants: [senderId, recipientId],
    messages: [...messages, msg],
  }, { merge: true });
}

export async function notifyNewMessage(recipientId: string, senderId: string) {
  const recipientDoc = doc(collection(firestore, "activeUsers"), recipientId);
  await updateDoc(recipientDoc, {
    hasNewMessage: arrayUnion(senderId),
  });
}
