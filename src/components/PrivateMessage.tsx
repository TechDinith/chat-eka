import { useState } from "react";
import type { User } from "../interfaces/user.interface";
import { usePrivateMessages } from "../hooks";
import { Button, Input } from "./ui";

interface Props {
  user: User;
  selectedUser: User;
}

export default function PrivateMessage({ user, selectedUser }: Props) {
  const [input, setInput] = useState("");
  const { messages, send } = usePrivateMessages(
    user.docId,
    selectedUser.docId
  );

  const handleSend = async () => {
    if (!input.trim()) return;
    await send(user.username, input.trim());
    setInput("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        PM: {selectedUser.username}
      </h3>
      <div className="flex gap-2 mb-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} disabled={!input.trim()}>
          Send
        </Button>
      </div>
      <div className="overflow-y-auto max-h-60 space-y-1">
        {messages
          .slice()
          .reverse()
          .map((m, i) => (
            <p key={i} className="text-sm">
              {m}
            </p>
          ))}
      </div>
    </div>
  );
}
