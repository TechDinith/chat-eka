import React, { useState, useEffect } from "react";
import { User } from "../interfaces/user.interface";
import PrivateMessagingBox from "./PrivateMessage";

interface ChatRoomProps {
  activeUsers: User[];
  user: User;
  onLogout: () => void;
  setActiveUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  activeUsers,
  setActiveUsers,
  user,
  onLogout,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loggedOutUsername, setLoggedOutUsername] = useState<string | null>(
    null
  );
  const [privateMessages, setPrivateMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [privateMessagesMap, setPrivateMessagesMap] = useState<
    Record<string, string[]>
  >({});

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${user.username}: ${messageInput}`,
      ]);
      setMessageInput(""); // Clear the input field after sending
    }
  };
  const loadPrivateMessages = (user1: User, user2: User): string[] => {
    const users = [user1.nic, user2.nic].sort().join("-"); // Create a unique key
    return privateMessagesMap[users] || [];
  };
  useEffect(() => {
    if (user) {
      setLoggedOutUsername(null);
    }
    if (selectedUser) {
      // Load private messages between the current user and selected user
      const privateMessages = loadPrivateMessages(user, selectedUser);
      setPrivateMessages(privateMessages);

      const usersKey = [user.nic, selectedUser.nic].sort().join("-");
      const privateMessagesObj = { [usersKey]: privateMessages };
      setPrivateMessagesMap((prevMap) => ({
        ...prevMap,
        ...privateMessagesObj,
      }));
    }
  }, [user, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      const updatedUsers: User[] = activeUsers.map((user) =>
        user === selectedUser ? { ...user, hasNewMessage: true } : user
      );
      setActiveUsers(updatedUsers);
    }
  }, [selectedUser]);

  return (
    <div className="bg-black bg-opacity-70 text-black h-screen p-4">
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
          <div className="w-1/4 border-r pr-4">
            <h3 className="text-xl font-semibold mb-2">Users</h3>
            <ul className="space-y-2">
              {activeUsers.map((activeUser, i) => (
                <li
                  key={i}
                  className={`flex ${
                    activeUser.hasNewMessage &&
                    String(activeUser.nic) !== String(user.nic)
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                  onClick={() => setSelectedUser(activeUser)}
                >
                  <p
                    className="text-white mr-1 cursor-pointer"
                    title={`${activeUser.username}\nAge: ${activeUser.age}\nGender: ${activeUser.gender}`}
                  >
                    {activeUser.username}
                  </p>
                </li>
              ))}
              {loggedOutUsername && (
                <li>
                  <p className="text-red-600 mr-1">{loggedOutUsername}</p>{" "}
                  logged out
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
                    .map((message, index) => <li key={index}>{message}</li>)
                    .reverse()}
                </ul>
              </div>
            </div>

            <div className="lg:w-1/4 w-full m-2">
              {selectedUser &&
                String(selectedUser.nic) !== String(user.nic) && (
                  <PrivateMessagingBox
                    privateMessages={privateMessages}
                    setPrivateMessages={setPrivateMessages}
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
