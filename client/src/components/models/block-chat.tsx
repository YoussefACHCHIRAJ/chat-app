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

interface BlockChatProps {
  receiver: userType;
  openBlock: boolean;
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockChat = ({ receiver, openBlock, setOpenBlock }: BlockChatProps) => {
  return (
    <Dialog open={openBlock} onOpenChange={() => setOpenBlock(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Block</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            Are you sure you want block{" "}
            <span className="text-white font-semibold">
              {receiver.fullName}
            </span>{" "}
            ? <br />
            <span className="text-white font-semibold">
              {receiver.fullName}
            </span>{" "}
            can not be able to send you a messages.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => setOpenBlock(false)}>
            Cancel
          </Button>
          <Button
            className="font-semibold tracking-wider text-md"
            variant="destructive"
          >
            Block
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockChat;
