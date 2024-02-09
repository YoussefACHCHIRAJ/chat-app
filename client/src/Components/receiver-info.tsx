import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Ban, Trash, X } from "lucide-react";
import { UserType } from "@/Types";
import { cn } from "@/lib/utils";
import { ShareMediaModel } from "./Models";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";

interface ReceiverInfoProps {
  onlineUsers: string[]
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>
}

const ReceiverInfo = ({onlineUsers, setOpenBlock, setOpenClearChat}:ReceiverInfoProps) => {
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const { profile, username, email } = receiver as UserType;
  const dispatch = useDispatch()
  return (
    <section className="w-[20em] hidden  lg:flex flex-col bg-primary border-l border-gray-600 shadow-xl shadow-primary items-center pt-10">
      <div className="w-20 relative">
        <img
          className="w-full rounded-full object-contain h-full"
          src={profile}
          alt={username}
        />
        <span className={cn("absolute  h-3 w-3 right-4 bottom-0", 
          `${onlineUsers.includes(receiver?.userId as string) ? 'flex' : 'hidden'}`
        )}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
        </span>
      </div>
      <p className="text-gray-300 text-xl mt-3">{username}</p>
      <p className="text-gray-400 text-lg mt-2">{email}</p>
      <div className="mt-6 text-white flex items-center justify-between space-x-10">
        <ShareMediaModel />
        <button>
          <Ban onClick={() => setOpenBlock(true)}/>
        </button>
        <button>
          <Trash onClick={() => setOpenClearChat(true)} />
        </button>
        <button>
          <X onClick={() => dispatch(setReceiver(null))}/>
        </button>
      </div>
    </section>
  );
};

export default ReceiverInfo;
