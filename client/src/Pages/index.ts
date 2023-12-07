import ChatPage from "./ChatPage";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

export {
    ChatPage,
    socket
}