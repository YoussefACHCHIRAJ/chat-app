import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { FriendListModal } from "../Modals";
import { cn } from "@/lib/utils";
import { Users2 } from "lucide-react";
import { Options } from ".";


const TopBar = () => {
  const [isopenModal, setIsOpenModal] = useState(false);
  return (
    <div className="w-full h-12 md:hidden bg-primary flex justify-between items-center px-2 border-b border-black">
      <UserButton />
      <div className="relative hover:cursor-pointer text-white">
        <Users2 onClick={() => setIsOpenModal(true)} />
        <div className={cn(`w-2 h-2 bg-green absolute rounded-full top-0 -right-2 `)}></div>
      </div>
      <FriendListModal
        isOpen={isopenModal}
        setIsOpen={setIsOpenModal}
      />

      <Options />
    </div>
  );
};

export default TopBar;
