import React, { useEffect, useState } from "react";
import { User } from "../interfaces/user.interface";

interface PrivateMessagingBoxProps {
  selectedUser: User;
  privateMessages: string[];
  setPrivateMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PrivateMessagingBox: React.FC<PrivateMessagingBoxProps> = ({
  selectedUser,
  setPrivateMessages,
  privateMessages,
}) => {
  const [privateMessage, setPrivateMessage] = useState("");

  useEffect(() => {
    // Load private messages from props when the component mounts
    setPrivateMessages(privateMessages);
  }, [privateMessages]);

  const handleSendPrivateMessage = () => {
    if (privateMessage.trim() !== "") {
      const newMessage = `${selectedUser.username}: ${privateMessage}`;
      setPrivateMessages((prevMessages) => [...prevMessages, newMessage]);
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
