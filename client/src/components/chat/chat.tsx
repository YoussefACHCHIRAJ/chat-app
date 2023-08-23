import { MessageTypes, userType } from "@/types";
import { CurrentUserChat, SendBox, Message } from "@/components/models";

interface chatProps {
  chatId: string;
  messages: MessageTypes[];
  receiver: userType;
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  
}

const chat = ({ chatId, messages, setMessages, receiver }: chatProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full flex-1">
      <CurrentUserChat receiver={receiver} />
      <div className="space-y-3 flex-1 relative pt-20 px-4  overflow-y-auto">
        {messages.length > 0 &&
          messages.map((message, index) => {
            if (message.chatId === chatId) {
              return (
                <Message key={`${message.time} ${index}`} message={message} />
              );
            }
          })}
        {messages.length === 0 && (
          <h1 className="text-center font-bold text-xl text-headText px-4">
            There is no messages.
            <br /> Start chating now
          </h1>
        )}
      </div>
      <SendBox
        setMessages={setMessages}
        chatId={chatId}
        receiver={receiver?.id}
      />
    </div>
  );
};

export default chat;
