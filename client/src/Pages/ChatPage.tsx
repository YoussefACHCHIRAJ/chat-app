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
          <Chat setOpenBlock={setOpenBlock} setOpenClearChat={setOpenClearChat}/>
          <ReceiverInfo onlineUsers={onlineUsers} setOpenBlock={setOpenBlock} setOpenClearChat={setOpenClearChat}/>
        </>
      ) : (
        <>
          <div className="block md:hidden">
            <FriendListModal authUser={authUser} onlineUsers={onlineUsers} />
          </div>
          <div className="hidden md:block mx-auto mt-10 px-4 text-white">
            <img
              className="w-80 h-80 mx-auto mt-4"
              src="/chat.svg"
              alt="chatting"
            />
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
