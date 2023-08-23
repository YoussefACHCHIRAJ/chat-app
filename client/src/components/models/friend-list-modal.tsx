import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetUsers from "@/hooks/useGetUsers";
import { useClerk } from "@clerk/clerk-react";
import UserChat from "./user-chat";
import { userType } from "@/types";

interface FriendModalProps {
  isOpen: boolean;
  selectReceiver: (user: userType) => void;
  receiverId: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FriendListModal = ({
  isOpen,
  selectReceiver,
  receiverId,
  setIsOpen
}: FriendModalProps) => {
  const { user } = useClerk();
  const { users, isLoading, errors } = useGetUsers(user?.id as string);

  if (!user || isLoading) {
    console.log("loading...");
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>invite to join a chat</DialogTitle>
          <DialogDescription>
            {users?.length > 0 && !errors ? (
              users?.map((user) => (
                <UserChat
                  key={user.id}
                  user={user}
                  onClick={selectReceiver}
                  receiverId={receiverId}
                />
              ))
            ) : (
              <div className="mx-auto text-center first-letter:capitalize mt-5">
                there is no users.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FriendListModal;
