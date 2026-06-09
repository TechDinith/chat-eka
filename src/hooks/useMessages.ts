import { useState, useEffect, useCallback } from "react";
import type { Message } from "../interfaces/message.interface";
import * as messagesService from "../services/messages";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    return messagesService.subscribeMessages(setMessages);
  }, []);

  const send = useCallback(async (username: string, text: string) => {
    setSending(true);
    try {
      await messagesService.addMessage(username, text);
      await messagesService.trimOldMessages();
    } finally {
      setSending(false);
    }
  }, []);

  return { messages, send, sending };
}
