import { useSelector } from "react-redux";
import { SideBar, Chat, TopBar } from "@/Components/Chat";
import { RootState } from "@/Redux/store";
import { useEffect } from "react";
import { socket } from ".";

const ChatPage = () => {
  /**States and hooks and variables declaration */
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);
  /**End Declaration **/

  useEffect(() => {
    socket.emit("log-in", authUser?.userId);
  }, [authUser?.userId]);
  return (
    <main className="flex flex-col md:flex-row w-full h-full">
      <TopBar />

      <SideBar />
      {receiver ? (
        <Chat />
      ) : (
        <div className=" mx-auto mt-10 px-4 text-white">
          <img
            className="w-80 h-80 mx-auto mt-4"
            src="/chat.svg"
            alt="chatting"
          />
          <p className="md:text-3xl text-lg font-bold">
            Select a friend to start chating
          </p>
        </div>
      )}
    </main>
  );
};

export default ChatPage;
