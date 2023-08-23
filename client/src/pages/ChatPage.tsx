import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import io from "socket.io-client";

import { SideBar, Chat, TopBar } from "@/components/chat";
import { userType, MessageTypes } from "@/types";

export const socket = io("http://localhost:8080");

const ChatPage = () => {
  const { user } = useClerk();
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [receiver, setReceiver] = useState<userType | null>(null);
  const [unreadmessage, setUnreadmessage] = useState<{sender:string, isUnread:boolean}>({
    sender:'',
    isUnread: false
  });

  const selectReceiver = (receiver: userType) => {
    const generatedChatId = [receiver.id, user?.id].sort().join('-');
    console.log(`generatedChatId: ${generatedChatId}`);
    setChatId(generatedChatId);
    setReceiver(receiver);

    socket.emit('join-chat', {receiverId:receiver.id,senderId:user?.id, chatId:generatedChatId });

    if(receiver.id === unreadmessage.sender) setUnreadmessage({sender:'', isUnread: false});
  };

  useEffect(() => {
    socket.on('join-chat-req', data => {
      const {receiverId, chatId} = data;
      console.log(`chatId [comes from server]: ${chatId}`);
      
        if(receiverId !== user?.id) return;
        setChatId(chatId);
        socket.emit("join-req-accept", chatId);
    });
    socket.on('receive-message', messageData => {
      console.log('message received:', messageData);
      setMessages(messages => [...messages, messageData]);

      if(messageData.chatId !== chatId) {
        setUnreadmessage({
          sender: messageData.sender,
          isUnread: true
        });
      }
      
      return () => {
        socket.off("join-chat");
        socket.off("join-chat-req");
        socket.off("join-req-accept");
        socket.off("receive-message");
      }
    });
    
  }, [socket]);
  console.log('unread: ', unreadmessage);
  console.log(`receiver: ${receiver?.id}`);
  console.log(`chatId: ${chatId}`);
  return (
    <main className="flex flex-col md:flex-row w-full h-full">
      <TopBar
        selectReceiver={selectReceiver}
        receiverId={receiver?.id}
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
