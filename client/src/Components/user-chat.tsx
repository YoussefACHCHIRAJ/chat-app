import useDeleteNotification from "@/Hooks/useDeleteNotifications";
import { cn } from "@/lib/utils";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";
import { RootState } from "@/Redux/store";
import { MessageTypes, NotificationType, UserType } from "@/Types";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface userChatType {
  user: UserType;
  isOnline: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  notification: NotificationType;
  refetchNotifications: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<unknown, unknown>>
  lastMessage: MessageTypes<string>
}

const UserChat = ({ closeModal, user, isOnline ,notification, refetchNotifications, lastMessage }: userChatType) => {
  const dispatch = useDispatch();
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const { mutate: deleteNotification } = useDeleteNotification();

  const isunread =
      user?._id === notification?.sender &&
      receiver?._id !== notification?.sender &&
      notification?.count !== 0

  const handleSelectReceiver = () => {
    dispatch(setReceiver(user));
    deleteNotification({
      receiver: authUser?._id as string,
      sender: user?._id as string,
    });
    refetchNotifications();
    closeModal && closeModal(false);
  };
  return (
    <div
      onClick={handleSelectReceiver}
      className={cn(
        `flex gap-2 md:px-3 px-2 py-2 mx-[.1em] md:mx-0 text-sm rounded-xl items-center justify-start cursor-pointer hover:bg-lightGray
          ${user.userId === receiver?.userId && "message-receiver"}
          ${isunread && "bg-lightGray"}
          `
      )}
    >
      <div className="border relative rounded-full md:w-10 md:h-10 w-8 h-8 bg-black">
        <span
          className={cn(
            "absolute  h-3 w-3 flex right-0 bottom-0",
            `${isOnline ? "flex" : "hidden"}`
          )}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
        </span>
        <img
          className="rounded-full w-full h-full object-contain"
          alt={user?.username}
          src={user.profile}
        />
      </div>
      <div className="flex-1">
        <h3 className={cn(` capitalize text-white`)}>{user?.username}</h3>
        { lastMessage !== null && (<p className="text-gray-200 text-xs truncate w-48">
          {lastMessage?.sender !== authUser?._id && "Sent"} You: {lastMessage?.content}</p>)}
      </div>
      {isunread && (
        <p className="bg-green text-white font-bold rounded-full text-center w-5 h-5">
          {notification?.count}
        </p>
      )}
    </div>
  );
};

export default UserChat;
