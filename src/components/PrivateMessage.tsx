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
  user: User; // Add the current user
}

const activeUsersRef = collection(firestore, "activeUsers");

const PrivateMessagingBox: React.FC<PrivateMessagingBoxProps> = ({
  selectedUser,
  user,
}) => {
  const [privateMessages, setPrivateMessages] = useState<string[]>([]);
  const [privateMessage, setPrivateMessage] = useState("");

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

  const handleSendPrivateMessage = async () => {
    if (privateMessage.trim() !== "") {
      const newMessage = `${user.username}: ${privateMessage}`;

      // Update sender's hasNewMessage field
      const senderDocRef = doc(activeUsersRef, user.docId);
      await updateDoc(senderDocRef, {
        hasNewMessage: true,
      });

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
        await updateDoc(recipientDocRef, {
          hasNewMessage: true,
        });
      } else {
        // Create new conversation
        await setDoc(conversationDocRef, {
          participants: [user.docId, selectedUser.docId],
          messages: [newMessage],
        });

        // Update recipient's hasNewMessage field
        const recipientDocRef = doc(activeUsersRef, selectedUser.docId);
        await updateDoc(recipientDocRef, {
          hasNewMessage: true,
        });
      }

      setPrivateMessage("");
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
