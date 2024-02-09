import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import UpdateUserNameInputModel from "./update-username-input-model";

interface ChatModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileModel = ({  open, setOpen }: ChatModelProps) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Update Your username</DialogTitle>
          <DialogDescription className="space-y-2 text-lightGray text-md">
            <UpdateUserNameInputModel />
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModel;
