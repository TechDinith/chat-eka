import { useState } from "react";
import type { User } from "../interfaces/user.interface";
import { useMessages } from "../hooks";
import { Button, Input } from "./ui";
import PrivateMessage from "./PrivateMessage";
import { clearNewMessage } from "../services/activeUsers";

interface Props {
  user: User;
  setUser: (u: User) => void;
  activeUsers: User[];
  onLogout: () => void;
}

export default function ChatRoom({
  user,
  setUser,
  activeUsers,
  onLogout,
}: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [input, setInput] = useState("");
  const { messages, send, sending } = useMessages();

  const handleSend = async () => {
    if (!input.trim()) return;
    await send(user.username, input.trim());
    setInput("");
  };

  const handleSelectUser = (u: User) => {
    setSelectedUser(u);
    if (u.docId && user.hasNewMessage?.includes(u.docId)) {
      clearNewMessage(user.docId, u.docId);
    }
  };

  return (
    <div className="bg-black/70 text-black flex-grow p-4 min-h-screen">
      <div className="bg-white/70 p-4 rounded shadow-md h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">චැට් එක</h2>
          <p className="text-sm hidden md:block">
            කැමති username එකක් උඩින් hover කලාම එයාගෙ details පෙන්නනව, click
            කලොත් private message කරන්න පුලුවන්
          </p>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Users sidebar */}
          <div className="w-1/4 border-r pr-2 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-2">Users</h3>
            <ul className="space-y-1">
              {activeUsers.map((u) => {
                const hasNew = user.hasNewMessage?.includes(u.docId);
                return (
                  <li
                    key={u.docId}
                    className={`cursor-pointer p-1 rounded hover:bg-white/50 ${
                      hasNew ? "ring-2 ring-red-500" : ""
                    }`}
                    title={`${u.username}\nAge: ${u.age}\nGender: ${u.gender}`}
                    onClick={() => handleSelectUser(u)}
                  >
                    {u.username}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} disabled={sending || !input.trim()}>
                Send
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-1">
              {messages
                .slice()
                .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                .map((m, i) => (
                  <p key={i} className="text-sm">
                    {m.message}
                  </p>
                ))}
            </div>
          </div>

          {/* Private messaging */}
          {selectedUser && selectedUser.docId !== user.docId && (
            <div className="w-1/4 border-l pl-2">
              <PrivateMessage
                user={user}
                selectedUser={selectedUser}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
