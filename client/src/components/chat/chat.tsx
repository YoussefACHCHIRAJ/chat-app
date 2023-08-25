import { MessageTypes, userType } from "@/types";
import { CurrentUserChat, SendBox, Message } from "@/components/models";
import { useEffect, useRef } from "react";
import { useClerk } from "@clerk/clerk-react";

interface chatProps {
  chatId: string;
  messages: MessageTypes[];
  receiver: userType;
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
}

const chat = ({ chatId, messages, setMessages, receiver }: chatProps) => {
  const { user } = useClerk();
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      const chatSpace = chatRef.current as any;
      chatSpace.scrollTop = chatSpace.scrollHeight - chatSpace.clientHeight;
    }
  }, [messages]);

  const AllMessages = (
    <div
      className="space-y-3 flex-1 relative py-4 px-4   overflow-y-auto scrollbar"
      ref={chatRef}
    >
      {messages.length > 0 ? (
        messages.map((message, index) => {
          const { sender, receiver: msgReceiver } = message;
          const [userId, receiverId] = [user?.id, receiver?.id].sort();
          if (
            (userId === msgReceiver && receiverId === sender) ||
            (sender === userId && msgReceiver === receiverId)
          ) {
            return (
              <Message key={`${message.time} ${index}`} message={message} />
            );
          }
        })
      ) : (
        <h1 className="text-center font-bold text-xl text-headText px-4">
          There is no messages.
          <br /> Start chating now
        </h1>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-2 w-full flex-1 overflow-auto">
      <CurrentUserChat receiver={receiver} />
      {AllMessages}
      <SendBox
        setMessages={setMessages}
        chatId={chatId}
        receiver={receiver?.id}
      />
    </div>
  );
};

export default chat;
