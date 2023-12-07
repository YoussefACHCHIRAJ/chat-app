import { Ban, Trash, X } from "lucide-react";
import { ShareMedia } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";

interface CurrentUserChatProps {
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrentUserChat = ({setOpenBlock, setOpenClearChat}:CurrentUserChatProps) => {
  
  const receiver = useSelector((state: RootState) => state.receiver.value)
  const dispatch = useDispatch();
  return (
    <div className="w-full  bg-primary px-4 md:py-4 py-2 flex gap-3 items-center">
      <div className="border rounded-full w-10 h-10 md:w-12 md:h-12 bg-black">
        <img
          className="rounded-full w-full h-full object-contain"
          alt={receiver?.username}
          src={receiver?.profile}
        />
      </div>
      <div>
        <h2 className="md:text-xl text-sm text-white">{receiver?.username}</h2>
        <p className='font-light text-xs text-gray-200'>{receiver?.email}</p>
      </div>
      <div className="ml-auto text-white pr-4 flex items-center gap-6">
        <ShareMedia />
        <button onClick={() => setOpenBlock(true)}><Ban /></button>
        <button onClick={() => {setOpenClearChat(true)}}><Trash /></button>
        <button onClick={() => dispatch(setReceiver(null))}><X /></button>
      </div>
    </div>
  );
};

export default CurrentUserChat;