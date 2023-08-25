import { cn } from "@/lib/utils";
import { userType } from "@/types";

interface userChatType {
  user: userType;
  onClick: (user: userType) => void;
  receiverId: string | undefined;
  unReadMessage:  Map<string, number>
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const UserChat = ({ user, onClick, receiverId, unReadMessage, closeModal }: userChatType) => {
  const isUnread = unReadMessage.has(user?.id);
  const handleClick = () => {
    onClick(user); 
    closeModal && closeModal(false);
  }
  return (
    <div
      onClick={handleClick}
      className={cn(
        `flex gap-2 md:px-3 px-2 py-3 mx-[.1em] md:mx-0 rounded-xl text-sm items-center justify-start cursor-pointer ${
          receiverId === user.id ? "bg-gradient-to-r from-msgBg to-SnMsgBg2" : 'bg-secondary'} ${isUnread ? 'bg-[#444254]' : ''}`
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
            ` capitalize text-white ${
              receiverId === user.id ? "font-bold text-lg" : isUnread ? 'font-extrabold text-lg' : " font-semibold"
            }`
          )}
        >
          {user.fullName}
        </h3>
      </div>
      {isUnread && <p className='bg-green text-white font-bold rounded-full text-center w-5 h-5'>{unReadMessage.get(user?.id)}</p>}
    </div>
  );
};

export default UserChat;
