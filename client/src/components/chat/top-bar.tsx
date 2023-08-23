import { UserButton } from "@clerk/clerk-react";
import { Users2 } from "lucide-react";
import { useState } from "react";

import {FriendListModal} from "@/components/models";
import { Options } from ".";
import { userType } from "@/types";

interface TopBarProps {
  selectReceiver: (user: userType) => void;
  receiverId: string| undefined;
}

const TopBar = ({ selectReceiver, receiverId }: TopBarProps) => {
  const [isopenModal, setIsOpenModal] = useState(false);
  return (
    <div className="w-full h-12 md:hidden bg-darkBlue flex justify-between items-center px-2">
      <UserButton />
      <Users2 onClick={() => setIsOpenModal(true)} />

      <FriendListModal
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
