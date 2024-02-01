import UserChat from "./user-chat";
import useGetUsers from "@/Hooks/useGetUsers";
import { NotificationType, UserType } from "@/Types";
import { UserListSkeleton } from ".";
import useGetNotification from "@/Hooks/useGetNotifications";
import { useEffect } from "react";
import { socket } from "@/Pages";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import useDeleteNotification from "@/Hooks/useDeleteNotifications";

interface FriendListProps {
  onlineUsers: string[];
  authUser: UserType | null;
}

const FriendList = ({ onlineUsers, authUser }: FriendListProps) => {
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersErrors,
  } = useGetUsers();

  const {
    data: notifications,
    isError: isNotificationsError,
    isLoading: isNotificationsLoading,
    refetch,
  } = useGetNotification(authUser?._id as string);

  const { mutate: deleteNotification } = useDeleteNotification();

  useEffect(() => {
    socket.on("refresh-notifications", (sender) => {
      if (receiver?._id == sender._id) {
        deleteNotification({
          receiver: authUser?._id as string,
          sender: sender._id,
        });
      }
      refetch();

    });
    return () => {
      socket.off("refresh-notifications");
    };
  }, [authUser?._id, deleteNotification, receiver?._id, refetch]);

  if (isNotificationsLoading) {
    console.log("notifications loading ....");
    return null;
  }

  if (isNotificationsError) {
    console.log("notifications error ");
    return null;
  }

  if (isUsersError) console.log({ usersErrors: usersErrors });

  return (
    <div className="h-full mt-2 w-full rounded-t-xl py-2 px-0 space-y-1 overflow-y-auto">
      {isUsersLoading ? (
        <UserListSkeleton />
      ) : users?.length > 0 ? (
        users?.map((user: UserType) => {
          const isOnline = onlineUsers.includes(user?.userId as string);
          const notification = notifications.find(
            (notification: NotificationType) =>
              user?._id === notification.sender
          );
          if (user.userId !== authUser?.userId)
            return (
              <UserChat
                key={user.userId}
                user={user}
                isOnline={isOnline}
                notification={notification}
                refetchNotifications={refetch}
              />
            );
        })
      ) : (
        <div className="mx-auto text-center first-letter:capitalize mt-5 text-white">
          there is no users. or maybe you're not connecting
        </div>
      )}
    </div>
  );
};

export default FriendList;
