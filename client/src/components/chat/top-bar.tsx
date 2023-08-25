import { UserButton } from "@clerk/clerk-react";
import { Users2 } from "lucide-react";
import { useState } from "react";

import { FriendListModal } from "@/components/models";
import { Options } from ".";
import { userType } from "@/types";
import { cn } from "@/lib/utils";

interface TopBarProps {
  selectReceiver: (user: userType) => void;
  receiverId: string | undefined;
  unReadMessage: Map<string, number>;
}

const TopBar = ({ selectReceiver, receiverId, unReadMessage }: TopBarProps) => {
  const [isopenModal, setIsOpenModal] = useState(false);
  return (
    <div className="w-full h-12 md:hidden bg-primary flex justify-between items-center px-2 border-b border-black">
      <UserButton />
      <div className="relative hover:cursor-pointer text-white">
        <Users2 onClick={() => setIsOpenModal(true)} />
        <div className={cn(`w-2 h-2 bg-green absolute rounded-full top-0 -right-2 ${unReadMessage.size? 'block' : 'hidden'}`)}></div>
      </div>
      <FriendListModal
        unReadMessage={unReadMessage}
        isOpen={isopenModal}
        setIsOpen={setIsOpenModal}
        selectReceiver={selectReceiver}
        receiverId={receiverId}
      />

      <Options />
    </div>
  );
};

export default TopBar;
