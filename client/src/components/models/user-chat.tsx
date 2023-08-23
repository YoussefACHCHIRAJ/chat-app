import { cn } from "@/lib/utils";
import { userType } from "@/types";
import { Mail } from "lucide-react";

interface userChatType {
  user: userType;
  onClick: (user: userType) => void;
  receiverId: string | undefined;
  unReadMessage: {sender:string, isUnread:boolean};
}

const UserChat = ({ user, onClick, receiverId, unReadMessage }: userChatType) => {
  const isUnread = unReadMessage.isUnread && unReadMessage.sender === user.id;
  return (
    <div
      onClick={() => onClick(user)}
      className={cn(
        `flex md:gap-2 md:px-3 px-1 py-1 mx-[.1em] md:mx-0 rounded-xl text-sm items-center justify-start cursor-pointer ${
          receiverId === user.id ? "bg-darkBlue" : isUnread ? 'bg-lightGray' : ''
        }`
      )}
    >
      <div className="border rounded-full md:w-12 w-8 md:h-12 h-8 bg-black">
        <img
          className="rounded-full w-full h-full object-contain"
          alt={user.fullName}
          src={user.profile}
        />
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            ` capitalize ${
              receiverId === user.id ? "text-white font-text-lg" : isUnread ? 'font-extrabold text-lg' : "text-headText font-semibold"
            }`
          )}
        >
          {user.fullName}
        </h3>
      </div>
      {isUnread && <Mail className='text-green font-extrabold' width={30} />}
    </div>
  );
};

export default UserChat;
