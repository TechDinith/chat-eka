import { useState } from "react";
import type { User } from "../interfaces/user.interface";
import { usePrivateMessages } from "../hooks";
import { Button, Input } from "./ui";

interface Props {
  user: User;
  selectedUser: User;
  onClose?: () => void;
}

const AVATARS = [
  "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500",
  "bg-cyan-500", "bg-violet-500", "bg-pink-500", "bg-teal-500",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATARS[Math.abs(hash) % AVATARS.length];
}

export default function PrivateMessage({ user, selectedUser, onClose }: Props) {
  const [input, setInput] = useState("");
  const { messages, send } = usePrivateMessages(user.docId, selectedUser.docId);

  const handleSend = async () => {
    if (!input.trim()) return;
    await send(user.username, input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-80">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white lg:hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
        <div className={`w-7 h-7 rounded-full ${avatarColor(selectedUser.username)} flex items-center justify-center text-white text-xs font-bold`}>
          {selectedUser.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-white font-medium">{selectedUser.username}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {[...messages].reverse().map((m, i) => {
          const sender = m.startsWith(`${user.username}: `) ? user.username : selectedUser.username;
          const text = m.includes(": ") ? m.slice(m.indexOf(": ") + 2) : m;
          const isOwn = sender === user.username;
          return (
            <div key={i} className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
              {!isOwn && (
                <div className={`w-6 h-6 rounded-full ${avatarColor(sender)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                  {sender.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed break-words max-w-[80%] ${
                isOwn
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                  : "bg-white/10 text-white/90 rounded-bl-md"
              }`}>
                {text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input.trim()}>Send</Button>
        </div>
      </div>
    </div>
  );
}