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
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
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
  const { clearConversation, errors, isLoading } = useClearConversation();
  // const queryClient = new QueryClient()

  const clearChatConversation = () => {
    clearConversation(authUser?._id as string);
    // queryClient.setQueryData('messages', [])
    
    if(!errors) {
      setOpenClearChat(false);
    }
    else console.log("[failed clear chat: ", errors);
    
  }
  return (
    <Dialog open={openClearChat} onOpenChange={() => setOpenClearChat(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Clear Chat</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            Are you sure you want clear the conversation with{" "}
            <span className="text-white font-semibold">
              user name
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
            disabled={isLoading}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearChatModal;
