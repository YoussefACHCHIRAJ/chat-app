import { UserChat, UserListSkeleton } from "@/components/models";
import { Options } from ".";
import { UserButton, useClerk } from "@clerk/clerk-react";
import useGetUsers from "@/hooks/useGetUsers";
import { userType } from "@/types";

interface sidebarProps {
  selectReceiver: (user: userType) => void;
  receiverId: string | undefined;
  unReadMessage: Map<string, number>;
}

const SideBar = ({
  selectReceiver,
  receiverId,
  unReadMessage,
}: sidebarProps) => {
  const { user } = useClerk();
  const { users, isLoading, errors } = useGetUsers(user?.id as string);

  return (
    <section className="max-w-[20em] hidden md:flex flex-col bg-primary border-r border-gray-600 shadow-xl shadow-primary">
      <div className="flex-1 flex gap-3 px-3 py-3 mt-3 rounded-b-xl text-sm items-center justify-start">
        <UserButton />
        <div className="flex-1 space-y-2">
          <h3 className="font-bold text-white capitalize">{user?.fullName}</h3>
          <p className="font-light text-white">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <Options />
      </div>

      <div className="h-full mt-4 rounded-t-xl py-2 px-0 space-y-4 overflow-y-auto">
        {isLoading ? (
          <UserListSkeleton />
        ) : users?.length > 0 && !errors ? (
          users?.map((user) => (
            <UserChat
              key={user.id}
              user={user}
              onClick={selectReceiver}
              receiverId={receiverId}
              unReadMessage={unReadMessage}
            />
          ))
        ) : (
          <div className="mx-auto text-center first-letter:capitalize mt-5 text-white">
            there is no users. or maybe you're not connecting
          </div>
        )}
      </div>
    </section>
  );
};

export default SideBar;
