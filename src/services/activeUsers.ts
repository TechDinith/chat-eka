import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  writeBatch,
  arrayRemove,
  type Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import type { User } from "../interfaces/user.interface";

const ref = collection(firestore, "activeUsers");

export async function createUser(data: {
  username: string;
  age: string;
  gender: string;
}) {
  const docRef = await addDoc(ref, data);
  return docRef.id;
}

export async function removeUser(docId: string) {
  await deleteDoc(doc(ref, docId));
}

export function subscribeUsers(onUsers: (users: User[]) => void): Unsubscribe {
  return onSnapshot(ref, (snapshot) => {
    onUsers(snapshot.docs.map((d) => ({ ...d.data(), docId: d.id } as User)));
  });
}

export function subscribeUser(docId: string, onUser: (user: User) => void): Unsubscribe {
  return onSnapshot(doc(ref, docId), (snapshot) => {
    if (snapshot.exists()) {
      onUser({ ...snapshot.data(), docId: snapshot.id } as User);
    }
  });
}

export async function getUser(docId: string) {
  const snap = await getDoc(doc(ref, docId));
  return snap.exists()
    ? ({ ...snap.data(), docId: snap.id } as User)
    : null;
}

export async function clearNewMessage(docId: string, senderDocId: string) {
  await updateDoc(doc(ref, docId), {
    hasNewMessage: arrayRemove(senderDocId),
  });
}

export async function deleteUserPrivateMessages(docId: string) {
  const q = query(
    collection(firestore, "privateMessages"),
    where("participants", "array-contains", docId)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return;

  const batch = writeBatch(firestore);
  snapshot.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
