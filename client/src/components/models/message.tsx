import { cn } from "@/lib/utils";
import { MessageTypes } from "@/types";
import { useClerk } from "@clerk/clerk-react";

const Message = ({ message }: { message: MessageTypes }) => {
  const { user } = useClerk();

  const { sender, content, time } = message;
  const isMessageLefted = sender === user?.id;
  return (
    <div
      className={cn(
        "md:p-2 px-2 md:py-3 py-[.3em] rounded-bl-xl rounded-br-xl min-w-[5em] w-fit md:max-w-lg max-w-sm relative ",
        `${isMessageLefted ? "ml-auto message-sender rounded-tl-xl" : "rounded-tr-xl message-receiver"}`
      )}
    >
      <div className="message flex flex-col">
        <p className='text-sm md:text-lg text-white'>{content}</p>
        <span className="time self-end text-xs md:text-sm font-light text-white">{time}</span>
      </div>
    </div>
  );
};

export default Message;
