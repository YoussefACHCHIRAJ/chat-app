import { userType } from "@/types";

const CurrentUserChat = ({receiver}:{receiver:userType}) => {
  return (
    <div className="w-full rounded-lg top-0 left-0 bg-darkBlue px-2 py-1 flex gap-3 items-center">
      <div className="border rounded-full w-10 h-10 md:w-12 md:h-12 bg-black">
        <img
          className="rounded-full w-full h-full object-contain"
          alt="user profile"
          src={receiver.profile}
        />
      </div>
      <div>
        <h2 className="md:text-xl text-sm text-white">{receiver.fullName}</h2>
        <p className='font-light text-xs text-gray-200'>{receiver.email}</p>
      </div>
    </div>
  );
};

export default CurrentUserChat;