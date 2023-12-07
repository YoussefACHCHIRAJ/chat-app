import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

interface ClearChatProps {
  openClearChat: boolean;
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearChat = ({
  openClearChat,
  setOpenClearChat,
}: ClearChatProps) => {

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
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearChat;
