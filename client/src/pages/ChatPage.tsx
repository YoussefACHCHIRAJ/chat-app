import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import io from "socket.io-client";

import { SideBar, Chat, TopBar } from "@/components/chat";
import { userType, MessageTypes } from "@/types";
import useGetMessages from "@/hooks/useGetMessages";
// import useGetNotification from "@/hooks/useGetNotifications";
// import useDeleteNotification from "@/hooks/useDeleteNotifications";

interface DataType {
  receiverId: string,
  senderId: string,
  chatId: string,
}

export const socket = io("http://localhost:8080");

const ChatPage = () => {
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [receiver, setReceiver] = useState<userType | null>(null);
  const [unreadmessage, setUnreadmessage] = useState(new Map<string, number>());

  const { user } = useClerk();
  const { fetchMessages, errors } = useGetMessages();
  // const deleteNotification = useDeleteNotification();
  // const {
  //   notifications,
  //   errors: notifyErrors,
  //   isLoading,
  // } = useGetNotification(user?.id as string);

  // if (notifyErrors) {
  //   console.log("notifyErrors", notifyErrors);
   
  // }
  // useEffect(() => {
  //   setUnreadmessage(
  //     new Map(notifications.map((notify) => [notify.sender, notify.count]))
  //   );
  // }, [isLoading]);

  const selectReceiver = async (receiver: userType) => {
    const generatedChatId = [receiver.id, user?.id].sort().join("-");
    setChatId(generatedChatId);
    setReceiver(receiver);
    const fetchedMessages = await fetchMessages(generatedChatId);
    fetchedMessages ? setMessages(fetchedMessages.result) : console.log({errors});
    

    socket.emit("join-chat", {
      receiverId: receiver.id,
      senderId: user?.id,
      chatId: generatedChatId,
    });

    setUnreadmessage((prevMessages) => {
      const updateUnreadmessages = new Map(prevMessages);
      updateUnreadmessages.delete(receiver.id);
      return updateUnreadmessages;
    });

    // const isnotifyDeleted = await deleteNotification(
    //   user?.id as string,
    //   receiver?.id
    // );
    // if (!isnotifyDeleted) console.log("failed delete notifications");
  };

  useEffect(() => {
    const handleJoinChat = (data: DataType) => {
      const { receiverId, chatId } = data;
      if (receiverId !== user?.id) return;
      setChatId(chatId);
      socket.emit("join-req-accept", chatId);
    };

    const handleReceiveMessages = (newMessage: MessageTypes) => {
      setMessages((messages) => [...messages, newMessage]);

      if (receiver?.id === newMessage.senderId) return;

      setUnreadmessage((prevMessages) => {
        const updateUnreadmessages = new Map(prevMessages);

        if (!updateUnreadmessages.has(newMessage.senderId)) {
          updateUnreadmessages.set(newMessage.senderId, 1);
          return updateUnreadmessages;
        }
        updateUnreadmessages.set(
          newMessage.senderId,
          updateUnreadmessages.get(newMessage.senderId)! + 1
        );
        return updateUnreadmessages;
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
  }, [receiver, user?.id]);

  useEffect(() => {
  }, [messages]);
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
          removeReceiver={setReceiver}
        />
      ) : (
        <div className=" mx-auto mt-10 px-4 text-white">
          <img
            className="w-80 h-80 mx-auto mt-4"
            src="/chat.svg"
            alt="chatting"
          />
          <p className="md:text-3xl text-lg font-bold">
            Select a friend to start chating
          </p>
        </div>
      )}
    </main>
  );
};

export default ChatPage;
