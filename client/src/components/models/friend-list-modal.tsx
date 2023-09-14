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
import { UserListSkeleton } from ".";

interface FriendModalProps {
  isOpen: boolean;
  selectReceiver: (user: userType) => void;
  receiverId: string | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unReadMessage: Map<string, number>;
}

const FriendListModal = ({
  isOpen,
  selectReceiver,
  receiverId,
  setIsOpen,
  unReadMessage,
}: FriendModalProps) => {
  const { user } = useClerk();
  const { users, isLoading, errors } = useGetUsers(user?.id as string);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="bg-primary text-white">
        <DialogHeader>
          <DialogTitle>Friends :</DialogTitle>
          <DialogDescription className="space-y-2">
            {isLoading ? (
              <UserListSkeleton />
            ) : users?.length > 0 && !errors ? (
              users?.map((user) => (
                <UserChat
                  key={user.id}
                  user={user}
                  onClick={selectReceiver}
                  receiverId={receiverId}
                  unReadMessage={unReadMessage}
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
