import UserChat from "./user-chat";
import useGetUsers from "@/Hooks/useGetUsers";
import { UserType } from "@/Types";
import { UserListSkeleton } from ".";

interface FriendListProps {
  onlineUsers: string[]
  authUser: UserType | null
}

const FriendList = ({onlineUsers, authUser}:FriendListProps) => {
  const {
    data: users,
    isLoading: isUsersLoading,
    isError,
    error: usersErrors,
  } = useGetUsers();
  
  if (isError) console.log({ usersErrors:usersErrors });
  
  return (
    <div className="h-full mt-2 w-full rounded-t-xl py-2 px-0 space-y-1 overflow-y-auto">
        {isUsersLoading ? (
          <UserListSkeleton />
        ) : users?.length > 0 ? (
          users?.map((user: UserType) => {
            const isOnline = onlineUsers.includes(user?.userId as string);
            if (user.userId !== authUser?.userId)

              return <UserChat key={user.userId} user={user} isOnline={isOnline} />;
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