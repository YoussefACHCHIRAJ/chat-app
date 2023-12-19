import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import useClearConversation from "@/Hooks/useClearConversation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { setReceiver } from "@/Redux/Receiver/receiverSlice";
// import { QueryClient } from "react-query";

interface ClearChatModalProps {
  openClearChat: boolean;
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearChatModal = ({
  openClearChat,
  setOpenClearChat,
}: ClearChatModalProps) => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const { mutate: clearConversation } = useClearConversation();
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const dispatch = useDispatch();

  const clearChatConversation = () => {
    clearConversation(authUser?._id as string);
      setOpenClearChat(false);
      dispatch(setReceiver(null));
    
  }
  return (
    <Dialog open={openClearChat} onOpenChange={() => setOpenClearChat(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Clear Chat</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            Are you sure you want clear the conversation with{" "}
            <span className="text-white font-semibold">
             {receiver?.username}
            </span>{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => setOpenClearChat(false)}>
            Cancel
          </Button>
          <Button
            className="font-semibold tracking-wider text-md"
            variant="destructive"
            onClick={clearChatConversation}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearChatModal;
