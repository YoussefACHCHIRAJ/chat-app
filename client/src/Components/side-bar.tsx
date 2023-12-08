import { FriendListModal } from "@/Components/Modals";
import { UserButton } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import OptionsModal from "./Modals/options-modal";

const SideBar = ({ onlineUsers }: { onlineUsers: string[] }) => {
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
        <OptionsModal />
      </div>
      <FriendListModal authUser={authUser} onlineUsers={onlineUsers} />
    </section>
  );
};

export default SideBar;
