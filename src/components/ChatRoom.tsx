import { useState, useRef, useEffect } from "react";
import type { User } from "../interfaces/user.interface";
import { useMessages } from "../hooks";
import { Button, Input } from "./ui";
import PrivateMessage from "./PrivateMessage";
import { clearNewMessage } from "../services/activeUsers";

interface Props {
  user: User;
  activeUsers: User[];
  onLogout: () => void;
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

function parseMsg(msg: string) {
  const i = msg.indexOf(": ");
  return i === -1 ? { sender: "", text: msg } : { sender: msg.slice(0, i), text: msg.slice(i + 2) };
}

function UserRow({ u, user, selectedUser, onSelect }: { u: User; user: User; selectedUser: User | null; onSelect: (u: User) => void }) {
  const hasNew = user.hasNewMessage?.includes(u.docId);
  return (
    <button
      key={u.docId}
      onClick={() => onSelect(u)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/5 text-left ${selectedUser?.docId === u.docId ? "bg-white/10" : ""}`}
    >
      <div className={`w-8 h-8 rounded-full ${avatarColor(u.username)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
        {u.username.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">{u.username}</p>
        <p className="text-[10px] text-white/40">{u.age} · {u.gender}</p>
      </div>
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        {hasNew && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />}
      </div>
    </button>
  );
}

export default function ChatRoom({ user, activeUsers, onLogout }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [input, setInput] = useState("");
  const { messages, send, sending } = useMessages();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await send(user.username, input.trim());
    setInput("");
  };

  const handleSelectUser = (u: User) => {
    setSelectedUser(u);
    setShowUsers(false);
    if (u.docId && user.hasNewMessage?.includes(u.docId)) clearNewMessage(user.docId, u.docId);
  };

  return (
    <div className="min-h-screen p-3 flex">
      <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-w-7xl mx-auto">
        <header className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white/60 hover:text-white" onClick={() => setShowUsers(true)}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-lg font-bold text-white">චැට් එක</h1>
          </div>
          <Button variant="danger" onClick={onLogout}>Logout</Button>
        </header>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Desktop sidebar */}
          <aside className="hidden md:flex w-60 border-r border-white/10 flex-col">
            <div className="p-4 border-b border-white/5">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Online — {activeUsers.length}</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {activeUsers.map((u) => <UserRow key={u.docId} u={u} user={user} selectedUser={selectedUser} onSelect={handleSelectUser} />)}
            </div>
          </aside>

          {/* Mobile users overlay */}
          {showUsers && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowUsers(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0f0a1a]/95 backdrop-blur-xl p-4">
                <button onClick={() => setShowUsers(false)} className="text-white/40 hover:text-white mb-3 text-sm">← Back</button>
                <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Online — {activeUsers.length}</h2>
                <div className="overflow-y-auto">
                  {activeUsers.map((u) => <UserRow key={u.docId} u={u} user={user} selectedUser={selectedUser} onSelect={handleSelectUser} />)}
                </div>
              </div>
            </div>
          )}

          {/* Main chat */}
          <main className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {messages.map((m) => {
                const { sender, text } = parseMsg(m.message);
                const isOwn = sender === user.username;
                return (
                  <div key={m.id} className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
                    {!isOwn && (
                      <div className={`w-7 h-7 rounded-full ${avatarColor(sender)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {sender.charAt(0).toUpperCase()}
                      </div>
                    )}
              <div ref={bottomRef} />
                    <div className={`max-w-[75%] sm:max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                      {!isOwn && <p className="text-[10px] text-white/40 mb-0.5 px-1">{sender}</p>}
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed break-words ${
                        isOwn
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                          : "bg-white/10 text-white/90 rounded-bl-md"
                      }`}>
                        {text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend} disabled={sending || !input.trim()}>Send</Button>
              </div>
            </div>
          </main>

          {/* PM panel: inline on lg, overlay below */}
          {selectedUser && selectedUser.docId !== user.docId && (
            <>
              <div className="hidden lg:flex border-l border-white/10">
                <PrivateMessage user={user} selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
              </div>
              <div className="fixed inset-0 z-40 lg:hidden">
                <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedUser(null)} />
                <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0f0a1a]/95 backdrop-blur-xl">
                  <PrivateMessage user={user} selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}