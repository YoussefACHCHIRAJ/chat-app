import { useDispatch, useSelector } from "react-redux";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";
import { RootState } from "@/Redux/store";
import { UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { CurrentUserChat } from ".";
import OptionsModal from "./Models/options-model";
interface CurrentUserChatProps {
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>;
  
}
const TopBar = ({ setOpenBlock, setOpenClearChat, setOpenUpdateProfile }: CurrentUserChatProps) => {
  const dispatch = useDispatch();
  const receiver = useSelector((state: RootState) => state.receiver.value);
  return (
    <div
      className={cn(
        "w-full h-12 md:hidden bg-primary items-center flex px-2 border-b border-black",
        `${!receiver ? "justify-between" : null}`
      )}
    >
      {receiver ? (
        <>
          <button
            onClick={() => dispatch(setReceiver(null))}
            className="px-2 bg-primary my-2 mr-1 rounded-xl hover:bg-secondary"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <CurrentUserChat
            setOpenBlock={setOpenBlock}
            setOpenClearChat={setOpenClearChat}
          />
        </>
      ) : (
        <>
          <UserButton />
          <OptionsModal setOpenUpdateProfile={setOpenUpdateProfile}/>
        </>
      )}
    </div>
  );
};

export default TopBar;
