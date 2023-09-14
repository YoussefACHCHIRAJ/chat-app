import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userType } from "@/types";
import { Button } from "@/components/ui/button";

import useDeleteConversationMsgs from "@/hooks/useDeleteConversationMsgs";
import { useClerk } from "@clerk/clerk-react";

interface ClearChatProps {
  receiver: userType;
  openClearChat: boolean;
  setOpenClearChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearChat = ({
  receiver,
  openClearChat,
  setOpenClearChat,
}: ClearChatProps) => {
  const { user } = useClerk();
  const { deleteConversationMsgs, errors } = useDeleteConversationMsgs();

  const handleClearChat = async () => {
    const chatId = [receiver.id, user?.id].sort().join("-");
    const isDeleted = await deleteConversationMsgs(user?.id as string, chatId);
    console.log(`is deleted: ${isDeleted}`);
    location.reload();
  };
  return (
    <Dialog open={openClearChat} onOpenChange={() => setOpenClearChat(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Clear Chat</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            Are you sure you want clear the conversation with{" "}
            <span className="text-white font-semibold">
              {receiver.fullName}
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
            onClick={handleClearChat}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearChat;
