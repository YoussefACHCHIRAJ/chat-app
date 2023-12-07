import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import UserChat from "./user-chat";
import useGetUsers from "@/Hooks/useGetUsers";
import { UserListSkeleton } from ".";

interface FriendModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendListModal = ({
  isOpen,
  setIsOpen,
}: FriendModalProps) => {
  const {
    users,
    isLoading: isUsersLoading,
    errors: usersErrors,
  } = useGetUsers();
  if (usersErrors) console.log({ usersErrors });
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Friends :</DialogTitle>
          <DialogDescription className="space-y-2">
            {isUsersLoading ? (
              <UserListSkeleton />
            ) : users?.length > 0 && !usersErrors ? (
              users?.map((user) => (
                <UserChat
                  key={user.userId}
                  user={user}
                  closeModal={setIsOpen}
                />
              ))
            ) : (
              <div className="mx-auto text-center first-letter:capitalize mt-5 text-white">
                there is no users. or maybe you're not connecting
              </div>
            )}
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FriendListModal;
