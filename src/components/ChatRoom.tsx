import React, { useState, useEffect } from "react";
import { User } from "../interfaces/user.interface";
import PrivateMessagingBox from "./PrivateMessage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

interface ChatRoomProps {
  activeUsers: User[];
  user: User;
  onLogout: () => void;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface Message {
  message: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
const MAX_MESSAGE_COUNT = 500; // Set the maximum message count

const ChatRoom: React.FC<ChatRoomProps> = ({
  setLoggedInUser,
  activeUsers,
  user,
  onLogout,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loggedOutUsername, setLoggedOutUsername] = useState<string | null>(
    null
  );
  const [messageInput, setMessageInput] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");

  const handleSendMessage = async () => {
    if (messageInput.trim() !== "") {
      const newMessage = `${user.username}: ${messageInput}`;

      // Add the new message to Firestore
      const messagesRef = collection(firestore, "messages");
      await addDoc(messagesRef, {
        message: newMessage,
        timestamp: new Date(),
      });

      setMessageInput(""); // Clear the input field after sending

      // Check and delete older messages if necessary
      const q = query(
        messagesRef,
        orderBy("timestamp"),
        limit(MAX_MESSAGE_COUNT + 1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > MAX_MESSAGE_COUNT) {
        const oldestMessages = querySnapshot.docs.slice(
          0,
          querySnapshot.size - MAX_MESSAGE_COUNT
        );

        // Create a WriteBatch instance to perform batch operations
        const batch = writeBatch(firestore);

        oldestMessages.forEach((doc) => {
          const docRef = doc.ref;
          batch.delete(docRef);
        });

        // Commit the batch operations
        await batch.commit();
      }
    }
  };

  useEffect(() => {
    if (user) {
      setLoggedOutUsername(null);
    }
  }, [user, selectedUser]);

  const onSelectUser = async (activeUser: User) => {
    setSelectedUser(activeUser);

    if (activeUser) {
      const userDocRef = doc(firestore, "activeUsers", user.docId);

      try {
        // Fetch the current user's data
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists() && userDocSnapshot.data().hasNewMessage) {
          const updatedHasNewMessage = userDocSnapshot
            .data()
            .hasNewMessage.filter(
              (senderDocId: any) =>
                String(senderDocId) !== String(activeUser.docId)
            );

          // Update the user's hasNewMessage field
          await updateDoc(userDocRef, {
            hasNewMessage: updatedHasNewMessage,
          });
        }
      } catch (error) {
        console.error("Error updating hasNewMessage:", error);
      }
    }
  };

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("timestamp"), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data() as Message;
        newMessages.push({
          ...messageData,
        });
      });
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-black bg-opacity-70 text-black flex-grow p-4">
      <div className="bg-white p-4 rounded shadow-md h-full bg-opacity-70">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">චැට් එක</h2>{" "}
          <p className="text-sm mb-4 m-4">
            කැමති username එකක් උඩින් hover කලාම එයාගෙ details (Age,Gender)
            පෙන්නනව, username එක click කලොත් private message කරන්නත් පුලුවන්
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setLoggedOutUsername(user.username);
              onLogout();
            }}
          >
            Logout
          </button>
        </div>
        <div className="flex">
          <div className="w-1/4 border-r pr-4 h-screen">
            <h3 className="text-xl font-semibold mb-2">Users</h3>
            <ul className="space-y-2">
              {activeUsers.map((activeUser, i) => {
                const isNewMessageFromUser =
                  user.hasNewMessage &&
                  user.hasNewMessage.includes(String(activeUser.docId));
                return (
                  <li
                    key={i}
                    className={`flex ${
                      isNewMessageFromUser ? "ring-2 ring-red-500" : ""
                    }`}
                    onClick={() => onSelectUser(activeUser)}
                  >
                    <p
                      className="text-white mr-1 cursor-pointer"
                      title={`${activeUser.username}\nAge: ${activeUser.age}\nGender: ${activeUser.gender}`}
                    >
                      {activeUser.username}
                    </p>
                  </li>
                );
              })}

              {loggedOutUsername && (
                <li>
                  <p className="text-red-600 mr-1">{loggedOutUsername}</p>
                </li>
              )}
            </ul>
          </div>
          <div className="w-3/4 pl-4 lg:flex">
            <div className="flex-shrink-0 lg:w-3/4 w-full">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Send
              </button>

              <div className="w-full mr-4 overflow-y-auto max-h-96 mt-2 lg:w-3/4">
                <ul className="space-y-2">
                  {messages
                    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                    .map((message, index) => (
                      <li key={index}>{message.message}</li>
                    ))
                    .reverse()}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/4 w-full m-2">
              {selectedUser &&
                String(selectedUser.docId) !== String(user.docId) && (
                  <PrivateMessagingBox
                    privateMessage={privateMessage}
                    setPrivateMessage={setPrivateMessage}
                    setLoggedInUser={setLoggedInUser}
                    user={user}
                    selectedUser={selectedUser}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
