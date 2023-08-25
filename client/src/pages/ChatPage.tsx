import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import io from "socket.io-client";

import { SideBar, Chat, TopBar } from "@/components/chat";
import { userType, MessageTypes } from "@/types";
import useGetMessages from "@/hooks/useGetMessages";

export const socket = io("http://localhost:8080");

const ChatPage = () => {
  const { user } = useClerk();
  const { fetchMessages, errors } = useGetMessages();
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [receiver, setReceiver] = useState<userType | null>(null);
  const [unreadmessage, setUnreadmessage] = useState(new Map<string, number>());

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("unreadmessages") || "{}");
    setUnreadmessage(new Map(Object.entries(storage)));
  }, []);

  const selectReceiver = (receiver: userType) => {
    const generatedChatId = [receiver.id, user?.id].sort().join("-");
    setChatId(generatedChatId);
    setReceiver(receiver);

    socket.emit("join-chat", {
      receiverId: receiver.id,
      senderId: user?.id,
      chatId: generatedChatId,
    });
    setUnreadmessage((prevMessages) => {
      const updateUnMessage = new Map(prevMessages);
      updateUnMessage.delete(receiver.id);
      return updateUnMessage;
    });
  };

  useEffect(() => {
    const handleJoinChat = (data: any) => {
      const { receiverId, chatId } = data;
      if (receiverId !== user?.id) return;
      setChatId(chatId);
      socket.emit("join-req-accept", chatId);
    };

    const handleReceiveMessages = (newMessage: MessageTypes) => {
      setMessages((messages) => [...messages, newMessage]);

      if (receiver?.id === newMessage.sender) return;

      setUnreadmessage((prevMessages) => {
        const updateUnMessage = new Map(prevMessages);

        if (!updateUnMessage.has(newMessage.sender)) {
          updateUnMessage.set(newMessage.sender, 1);
          return updateUnMessage;
        }
        updateUnMessage.set(
          newMessage.sender,
          updateUnMessage.get(newMessage.sender)! + 1
        );
        return updateUnMessage;
      });
    };
    socket.on("join-chat-req", handleJoinChat);
    socket.on("receive-message", handleReceiveMessages);
    return () => {
      socket.off("join-chat");
      socket.off("join-chat-req");
      socket.off("join-req-accept");
      socket.off("receive-message");
    };
  }, [receiver]);

  useEffect(() => {
    localStorage.setItem(
      "unreadmessages",
      JSON.stringify(Object.fromEntries(unreadmessage))
    );

    const fetchingMessages = async () => {
      const fetchedMessages = await fetchMessages();
      fetchedMessages
        ? setMessages([...fetchedMessages])
        : console.log("fetching error", errors);
    };
    fetchingMessages();
    
  }, [unreadmessage]);

  return (
    <main className="flex flex-col md:flex-row w-full h-full">
      <TopBar
        selectReceiver={selectReceiver}
        receiverId={receiver?.id}
        unReadMessage={unreadmessage}
      />
      <SideBar
        selectReceiver={selectReceiver}
        receiverId={receiver?.id}
        unReadMessage={unreadmessage}
      />
      {receiver ? (
        <Chat
          chatId={chatId}
          receiver={receiver}
          messages={messages}
          setMessages={setMessages}
        />
      ) : (
        <div className="md:text-xl text-lg font-bold mx-auto mt-10 px-4">
          Select a friend to start chating
          <img
            className="w-80 h-80 mx-auto mt-w"
            src="/chat.svg"
            alt="chatting"
          />
        </div>
      )}
    </main>
  );
};

export default ChatPage;
