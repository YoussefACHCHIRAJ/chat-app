import { UserChat, UserListSkeleton } from "@/Components/Modals";
import { Options } from ".";
import { UserButton } from "@clerk/clerk-react";
import useGetUsers from "@/Hooks/useGetUsers";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const SideBar = () => {
  const {
    users,
    isLoading: isUsersLoading,
    errors: usersErrors,
  } = useGetUsers();
  if (usersErrors) console.log({ usersErrors });

  const authUser = useSelector((state: RootState) => state.authUser.value);
  return (
    <section className="max-w-[20em] hidden md:flex flex-col bg-primary border-r border-gray-600 shadow-xl shadow-primary">
      <div className="flex-1 flex gap-3 px-3 py-3 mt-3 rounded-b-xl text-sm items-center justify-start">
        <UserButton />
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-white capitalize">
            {authUser?.username}
          </h3>
          <p className="font-light text-xs text-white">{authUser?.email}</p>
        </div>
        <Options />
      </div>

      <div className="h-full mt-2 w-full rounded-t-xl py-2 px-0 space-y-1 overflow-y-auto">
        {isUsersLoading ? (
          <UserListSkeleton />
        ) : users?.length > 0 ? (
          users?.map((user) => {
            if (user.userId !== authUser?.userId)
              return <UserChat key={user.userId} user={user} />;
          })
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
