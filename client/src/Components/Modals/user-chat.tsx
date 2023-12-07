import { cn } from "@/lib/utils";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";
import { RootState } from "@/Redux/store";
import { UserType } from "@/Types";
import {  useDispatch, useSelector } from "react-redux";

interface userChatType {
  user: UserType,
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const UserChat = ({ closeModal, user }: userChatType) => {
  const dispatch = useDispatch();
  const receiver = useSelector((state: RootState) => state.receiver.value);


  
  const handleSelectReceiver = () => {
    
    dispatch(setReceiver(user));
    closeModal && closeModal(false)
  }


  return (
    <div
      onClick={handleSelectReceiver}
      className={cn(
        `flex gap-2 md:px-3 px-2 py-3 mx-[.1em] md:mx-0 text-sm rounded-xl items-center justify-start cursor-pointer
          ${user.userId === receiver?.userId && "message-receiver"}
          `
      )}
    >
      <div className="border rounded-full md:w-12 w-8 md:h-12 h-8 bg-black">
        <img
          className="rounded-full w-full h-full object-contain"
          alt={user?.username}
          src={user.profile}
        />
      </div>
      <div className="flex-1">
        <h3
          className={cn(
            ` capitalize text-white`
          )}
        >
          {user?.username}
        </h3>
      </div>
      {/* {isUnread && <p className='bg-green text-white font-bold rounded-full text-center w-5 h-5'>{unReadMessage.get(user?.userId)}</p>} */}
    </div>
  );
};

export default UserChat;
