import { useSelector } from "react-redux";
import { SideBar, Chat, TopBar, ReceiverInfo } from "@/Components";
import { RootState } from "@/Redux/store";
import { useEffect, useState } from "react";
import { socket } from ".";
import {
  BlockChatModal,
  ClearChatModal,
  FriendListModal,
} from "@/Components/Modals";

const ChatPage = () => {
  /**States and hooks and variables declaration */
  const [openBlock, setOpenBlock] = useState(false);
  const [openClearChat, setOpenClearChat] = useState(false);

  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  /**End Declaration **/

  useEffect(() => {
    socket.emit("log-in", authUser?.userId);
  }, [authUser?.userId]);

  useEffect(() => {
    socket.on("user-connected", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });
    socket.on("user-disconnected", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socket.off("user-connect");
      socket.off("user-deconnect");
    };
  }, []),
    [];
  return (
    <main className="flex flex-col md:flex-row w-full h-full">
      <TopBar setOpenBlock={setOpenBlock} setOpenClearChat={setOpenClearChat} />
      <SideBar onlineUsers={onlineUsers} />
      {receiver ? (
        <>
          <Chat
            setOpenBlock={setOpenBlock}
            setOpenClearChat={setOpenClearChat}
          />
          <ReceiverInfo
            onlineUsers={onlineUsers}
            setOpenBlock={setOpenBlock}
            setOpenClearChat={setOpenClearChat}
          />
        </>
      ) : (
        <>
          <div className="block md:hidden">
            <FriendListModal authUser={authUser} onlineUsers={onlineUsers} />
          </div>
          <div className="hidden md:block mx-auto mt-10 px-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-36 h-36 mx-auto "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>

            <p className="md:text-3xl text-lg font-bold">
              Select a friend to start chating
            </p>
          </div>
        </>
      )}

      <BlockChatModal openBlock={openBlock} setOpenBlock={setOpenBlock} />
      <ClearChatModal
        openClearChat={openClearChat}
        setOpenClearChat={setOpenClearChat}
      />
    </main>
  );
};

export default ChatPage;
