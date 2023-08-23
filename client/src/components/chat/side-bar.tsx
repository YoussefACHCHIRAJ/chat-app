import {UserChat} from "@/components/models";
import { Options } from ".";
import { UserButton, useClerk } from "@clerk/clerk-react";
import useGetUsers from "@/hooks/useGetUsers";
import { userType } from "@/types";



interface sidebarProps {
  selectReceiver: (user: userType) => void;
  receiverId: string | undefined;
  unReadMessage: {sender:string, isUnread:boolean};
}

const SideBar = ({ selectReceiver, receiverId, unReadMessage }: sidebarProps) => {
  const { user } = useClerk();
  const { users, isLoading, errors } = useGetUsers(user?.id as string)

  if (!user || isLoading) {
    console.log("loading...");
    return null;
  }

  return (
    <section className="min-w-[18em] hidden md:flex flex-col">
      <div className="flex-1 bg-blueCiel flex gap-2 px-3 py-3 rounded-b-xl text-sm items-center justify-start">
        <UserButton />
        <div className="flex-1">
          <h3 className="font-bold text-headText capitalize">
            {user?.fullName}
          </h3>
          <p className="font-light text-lightText">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <Options />
      </div>

      <div className="h-full bg-blueCiel mt-4 rounded-t-xl py-2 px-3 space-y-4 overflow-y-auto">
        {users?.length > 0 && !errors
          ? users?.map((user) => (
              <UserChat
                key={user.id}
                user={user}
                onClick={selectReceiver}
                receiverId={receiverId}
                unReadMessage={unReadMessage}
              />
            ))
          : (<div className='mx-auto text-center first-letter:capitalize mt-5'>there is no users.</div>)}
      </div>
    </section>
  );
};

export default SideBar;
