import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import type { Message } from "../interfaces/message.interface";

const ref = collection(firestore, "messages");
const MAX = 500;

export async function addMessage(username: string, text: string) {
  await addDoc(ref, {
    message: `${username}: ${text}`,
    timestamp: new Date(),
  });
}

export function subscribeMessages(onMessages: (msgs: Message[]) => void): Unsubscribe {
  const q = query(ref, orderBy("timestamp"), limit(100));
  return onSnapshot(q, (snapshot) => {
    onMessages(snapshot.docs.map((d) => ({ ...d.data(), id: d.id } as Message)));
  });
}

export async function trimOldMessages() {
  const q = query(ref, orderBy("timestamp"), limit(MAX + 1));
  const snapshot = await getDocs(q);
  if (snapshot.size <= MAX) return;

  const batch = writeBatch(firestore);
  snapshot.docs.slice(0, snapshot.size - MAX).forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
