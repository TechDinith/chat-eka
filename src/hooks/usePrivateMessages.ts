import { useState, useEffect, useCallback } from "react";
import * as privateMessagesService from "../services/privateMessages";
import * as activeUsersService from "../services/activeUsers";

export function usePrivateMessages(
  myId: string | undefined,
  otherId: string | undefined
) {
  const [messages, setMessages] = useState<string[]>([]);

  const convId =
    myId && otherId
      ? privateMessagesService.conversationId(myId, otherId)
      : null;

  useEffect(() => {
    if (!convId) return;
    return privateMessagesService.subscribeConversation(convId, setMessages);
  }, [convId]);

  const send = useCallback(
    async (username: string, text: string) => {
      if (!myId || !otherId || !convId) return;
      await privateMessagesService.sendMessage(
        convId,
        myId,
        otherId,
        username,
        text
      );
      await privateMessagesService.notifyNewMessage(otherId, myId);
    },
    [myId, otherId, convId]
  );

  return { messages, send };
}
