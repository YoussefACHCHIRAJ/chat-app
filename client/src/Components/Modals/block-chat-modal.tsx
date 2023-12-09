import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

interface BlockChatModalProps {
  openBlock: boolean;
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockChatModal = ({  openBlock, setOpenBlock }: BlockChatModalProps) => {
  const receiver = useSelector((state: RootState) => state.receiver.value);
  return (
    <Dialog open={openBlock} onOpenChange={() => setOpenBlock(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Block</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            Are you sure you want block{" "}
            <span className="text-white font-semibold">
              {receiver?.username}
            </span>{" "}
            ? <br />
            <span className="text-white font-semibold">
            {receiver?.username}
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

export default BlockChatModal;
