import React, { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

interface PrivateMessagingBoxProps {
  selectedUser: User;
  user: User;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  setPrivateMessage: React.Dispatch<React.SetStateAction<string>>;
  privateMessage: string;
}

const activeUsersRef = collection(firestore, "activeUsers");

const PrivateMessagingBox: React.FC<PrivateMessagingBoxProps> = ({
  selectedUser,
  user,
  setLoggedInUser,
  setPrivateMessage,
  privateMessage,
}) => {
  const [privateMessages, setPrivateMessages] = useState<string[]>([]);

  const privateMessagesRef = collection(firestore, "privateMessages");
  const conversationId = [user.docId, selectedUser.docId].sort().join("-");

  useEffect(() => {
    // Fetch and listen for private messages within the conversation
    const conversationDocRef = doc(privateMessagesRef, conversationId);
    const unsubscribe = onSnapshot(conversationDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const conversationData = docSnapshot.data();
        if (conversationData) {
          setPrivateMessages(conversationData.messages || []);
        }
      } else {
        setPrivateMessages([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  useEffect(() => {
    // Listen for changes in the logged-in user's data
    const userDocRef = doc(firestore, "activeUsers", user.docId);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedUserData = docSnapshot.data() as User;
        setLoggedInUser({
          ...user,
          ...updatedUserData,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  const handleSendPrivateMessage = async () => {
    try {
      if (privateMessage.trim() !== "") {
        const newMessage = `${user.username}: ${privateMessage}`;

        // Update or create the conversation document
        const conversationDocRef = doc(privateMessagesRef, conversationId);
        const conversationSnapshot = await getDoc(conversationDocRef);
        if (conversationSnapshot.exists()) {
          // Update existing conversation
          await updateDoc(conversationDocRef, {
            messages: [...conversationSnapshot.data().messages, newMessage],
          });

          // Update recipient's hasNewMessage field
          const recipientDocRef = doc(activeUsersRef, selectedUser.docId);
          const recipientSnapshot = await getDoc(recipientDocRef);
          if (
            recipientSnapshot.exists() &&
            Array.isArray(recipientSnapshot.data().hasNewMessage)
          ) {
            await updateDoc(recipientDocRef, {
              hasNewMessage: [
                ...recipientSnapshot.data().hasNewMessage,
                user.docId,
              ],
            });
          } else {
            await updateDoc(recipientDocRef, {
              hasNewMessage: [user.docId],
            });
          }
        } else {
          // Create new conversation
          await setDoc(conversationDocRef, {
            participants: [user.docId, selectedUser.docId],
            messages: [newMessage],
          });

          // Update recipient's hasNewMessage field
          const recipientDocRef = doc(activeUsersRef, selectedUser.docId);
          const recipientSnapshot = await getDoc(recipientDocRef);
          if (
            recipientSnapshot.exists() &&
            Array.isArray(recipientSnapshot.data().hasNewMessage)
          ) {
            await updateDoc(recipientDocRef, {
              hasNewMessage: [
                ...recipientSnapshot.data().hasNewMessage,
                user.docId,
              ],
            });
          } else {
            await updateDoc(recipientDocRef, {
              hasNewMessage: [user.docId],
            });
          }
        }

        setPrivateMessage("");
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="border p-2">
      <h3 className="text-lg font-semibold mb-2">
        Private messaging with {selectedUser.username}
      </h3>
      <input
        type="text"
        value={privateMessage}
        onChange={(e) => setPrivateMessage(e.target.value)}
        className="w-full p-2 border rounded-md resize-none"
        placeholder="Type your private message..."
      />

      <button
        onClick={handleSendPrivateMessage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Send Private Message
      </button>
      <div className="w-full mr-4 overflow-y-auto max-h-96 mt-2">
        <ul className="space-y-2">
          {privateMessages
            .map((message, index) => <li key={index}>{message}</li>)
            .reverse()}
        </ul>
      </div>
    </div>
  );
};

export default PrivateMessagingBox;
