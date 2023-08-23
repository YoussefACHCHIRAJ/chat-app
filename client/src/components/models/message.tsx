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
        "md:p-2 px-1 py-[.2em] rounded-xl max-w-[60%]",
        `${isMessageLefted ? "ml-auto bg-orange" : "bg-blueCiel"}`
      )}
    >
      <div className="message flex flex-col">
        <p className='text-sm'>{content}</p>
        <span className="time self-end text-xs md:text-sm font-light">{time}</span>
      </div>
    </div>
  );
};

export default Message;
