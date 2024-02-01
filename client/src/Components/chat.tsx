import { useEffect, useRef, useState } from "react";

import useGetMessages from "@/Hooks/useGetMessages";
import { MessageTypes } from "@/Types";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { socket } from "@/Pages";
import { ErrorMessageModal, LoadingModal } from "./Modals";
import { CurrentUserChat, Message, SendBox } from ".";

interface CurrentUserChatProps {
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat = ({ setOpenBlock, setOpenClearChat }: CurrentUserChatProps) => {
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  const {
    data: messagesFetched,
    isError,
    isLoading,
    refetch
  } = useGetMessages(authUser?._id as string, receiver?._id as string);

  // Effect for fetching messages when component mounts
  useEffect(() => {
    setMessages(messagesFetched);
  }, [messagesFetched]);

  // Effect for listening to new messages via Socket.IO
  useEffect(() => {
    const handleReceiveMessage = (newMessage: MessageTypes) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      refetch();
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message");
    };
  }, [refetch]);

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
        isLoading ? (
          <LoadingModal />
        ) : isError ? (
          <ErrorMessageModal />
        ) : (
          messages?.map((message) => {
            const { receiver: messageReceiver, sender: messageSender } =
              message;
            const isMessageInChatRoom =
              (receiver?.userId === messageReceiver?.userId &&
                authUser?.userId === messageSender?.userId) ||
              (authUser?.userId === messageReceiver?.userId &&
                receiver?.userId === messageSender?.userId);

            if (isMessageInChatRoom)
              return (
                <Message
                  key={new Date(message.time).getTime()}
                  message={message}
                />
              );
          })
        )
      }
    </div>
  );

  return (
    <div className="flex flex-col gap-2 w-full flex-1 overflow-auto">
      <div className="hidden md:block lg:hidden">
        <CurrentUserChat
          setOpenBlock={setOpenBlock}
          setOpenClearChat={setOpenClearChat}
        />
      </div>
      {AllMessages}
      <SendBox setMessages={setMessages} />
    </div>
  );
};

export default Chat;
