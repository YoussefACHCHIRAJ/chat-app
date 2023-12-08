import { Ban, Trash, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";
import { ShareMediaModal } from "./Modals";

interface CurrentUserChatProps {
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrentUserChat = ({setOpenBlock, setOpenClearChat}:CurrentUserChatProps) => {
  
  const receiver = useSelector((state: RootState) => state.receiver.value)
  const dispatch = useDispatch();
  return (
    <div className="w-full  bg-primary px-0 py-2 flex lg:hidden gap-3 items-center">
      <div className="border rounded-full w-10 h-10 bg-black">
        <img
          className="rounded-full w-full h-full object-contain"
          alt={receiver?.username}
          src={receiver?.profile}
        />
      </div>
      <div>
        <h2 className="md:text-sm text-xs text-white">{receiver?.username}</h2>
        <p className='font-light text-xs text-gray-200'>{receiver?.email}</p>
      </div>
      <div className="ml-auto text-white pr-4 flex items-center gap-6">
        <ShareMediaModal />
        <button onClick={() => setOpenBlock(true)}><Ban /></button>
        <button onClick={() => {setOpenClearChat(true)}}><Trash /></button>
        <button onClick={() => dispatch(setReceiver(null))}><X /></button>
      </div>
    </div>
  );
};

export default CurrentUserChat;