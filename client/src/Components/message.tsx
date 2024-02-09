import { MessageTypes, UserType } from "@/Types";
import { cn, humanTime } from "@/lib/utils";
import { useClerk } from "@clerk/clerk-react";

const Message = ({ message }: { message: MessageTypes<UserType | null> }) => {
  const { user } = useClerk();
  const { sender, content, time } = message;

  return (
    <div
      className={cn(
        "md:p-2 px-2 md:py-2 py-[.3em] rounded-bl-xl rounded-br-xl min-w-[5em] w-fit md:max-w-lg max-w-sm relative whitespace-pre-wrap break-words",
        `
          ${
            sender?.userId === user?.id
              ? "message-sender rounded-tl-xl ml-auto"
              : "message-receiver rounded-tr-xl"
          }
        `
      )}
    >
      <div className=" flex flex-col">
        <p className="text-sm text-white">{content}</p>
        <span className="time self-end text-xs md:text-[0.70rem] font-light text-white">
          {humanTime(time)}
        </span>
      </div>
    </div>
  );
};

export default Message;
