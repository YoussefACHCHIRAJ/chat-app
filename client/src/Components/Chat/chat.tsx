import { useEffect, useRef, useState } from "react";

import {
  CurrentUserChat,
  SendBox,
  Message,
  BlockChat,
  ClearChat,
} from "@/Components/Modals";
// import { messages } from "@/Constants";
import useGetMessages from "@/Hooks/useGetMessages";
import { useClerk } from "@clerk/clerk-react";
import { MessageTypes } from "@/Types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { socket } from "@/Pages";

const Chat = () => {
  const { user } = useClerk();
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const chatRef = useRef<HTMLDivElement>(null);
  const [openBlock, setOpenBlock] = useState(false);
  const [openClearChat, setOpenClearChat] = useState(false);
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const { fetchMessages, errors, isLoading } = useGetMessages();

  // Effect for fetching messages when component mounts
  useEffect(() => {
    (async () => {
      const messagesFetched = await fetchMessages(user?.id as string);
      setMessages(messagesFetched);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Effect for listening to new messages via Socket.IO
  useEffect(() => {
    const handleReceiveMessage = (newMessage: MessageTypes) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  // Effect for scrolling to the bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);


  const AllMessages = (
    <div
      className="space-y-3 flex-1 relative py-4 px-4 overflow-y-auto scrollbar"
      ref={chatRef}
    >
      {
        /**Add loading and errors Ui later */
        isLoading
          ? "isLoading messages ..."
          : errors
          ? `error while fetching messages: ${errors}`
          : messages.map((message) => {

              const {receiver:messageReceiver, sender: messageSender} = message;
              const isMessageInChatRoom = 
                (receiver?.userId === messageReceiver?.userId && authUser?.userId === messageSender?.userId) || 
                (authUser?.userId === messageReceiver?.userId && receiver?.userId === messageSender?.userId)
              if (isMessageInChatRoom)
                return (
                  <Message
                    key={new Date(message.time).getTime()}
                    message={message}
                  />
                );
            })
      }
    </div>
  );

  return (
    <div className="flex flex-col gap-2 w-full flex-1 overflow-auto">
      <BlockChat openBlock={openBlock} setOpenBlock={setOpenBlock} />
      <ClearChat
        openClearChat={openClearChat}
        setOpenClearChat={setOpenClearChat}
      />
      <CurrentUserChat
        setOpenBlock={setOpenBlock}
        setOpenClearChat={setOpenClearChat}
      />
      {AllMessages}
      <SendBox setMessages={setMessages} />
    </div>
  );
};

export default Chat;
