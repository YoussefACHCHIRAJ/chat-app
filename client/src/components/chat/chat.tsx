import { useEffect, useRef, useState } from "react";
import { useClerk } from "@clerk/clerk-react";

import { MessageTypes, userType } from "@/types";
import {
  CurrentUserChat,
  SendBox,
  Message,
  BlockChat,
  ClearChat,
} from "@/components/models";
import { messageShouldDisplay } from "@/lib/utils";

interface chatProps {
  chatId: string;
  messages: MessageTypes[];
  receiver: userType;
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  removeReceiver: React.Dispatch<React.SetStateAction<userType | null>>;
}

// interface AllMessagesType {
//   messages: MessageTypes[];
//   currentReceiverId: string | undefined;
//   chatRef: React.MutableRefObject<HTMLDivElement | null>;
//   currentUserId: string | undefined;
// }

// const AllMessages = ({ messages, chatRef }: {
//   messages: MessageTypes[];
//   currentReceiverId: string | undefined;
//   chatRef: React.MutableRefObject<HTMLDivElement | null>;
//   currentUserId: string | undefined;
// }) => {
//   return (
//     <div
//       className="space-y-3 flex-1 relative py-4 px-4   overflow-y-auto scrollbar"
//       ref={chatRef}
//     >
//       {messages && messages.length > 0 ? (
//         messages.map((message) => {
//           const { receiverId, senderId } = message;
//           if (receiverId === currentReceiverId && senderId === currentUserId)
//             return (
//               <Message key={message.id || Math.random()} message={message} />
//             );
//         })
//       ) : (
//         <h1 className="text-center font-medium tracking-wider leading-9 text-3xl mt-10 text-lightGray px-4">
//           There is no messages.
//           <br /> Start chating now
//         </h1>
//       )}
//     </div>
//   );
// };

const Chat = ({
  chatId,
  messages,
  setMessages,
  receiver,
  removeReceiver,
}: chatProps) => {
  const { user } = useClerk();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [openBlock, setOpenBlock] = useState(false);
  const [openClearChat, setOpenClearChat] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      const chatSpace = chatRef.current;
      chatSpace.scrollTop = chatSpace.scrollHeight - chatSpace.clientHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 w-full flex-1 overflow-auto">
      <BlockChat
        receiver={receiver}
        openBlock={openBlock}
        setOpenBlock={setOpenBlock}
      />
      <ClearChat
        receiver={receiver}
        openClearChat={openClearChat}
        setOpenClearChat={setOpenClearChat}
      />
      <CurrentUserChat
        receiver={receiver}
        setOpenBlock={setOpenBlock}
        setOpenClearChat={setOpenClearChat}
        removeReceiver={removeReceiver}
      />
      <div
        className="space-y-3 flex-1 relative py-4 px-4   overflow-y-auto scrollbar"
        ref={chatRef}
      >
        {messages && messages.length > 0 ? (
          messages.map((message) => {
            if (messageShouldDisplay(message, receiver.id, user?.id as string))
              return (
                <Message key={message.id || Math.random()} message={message} />
              );
          })
        ) : (
          <h1 className="text-center font-medium tracking-wider leading-9 text-3xl mt-10 text-lightGray px-4">
            There is no messages.
            <br /> Start chating now
          </h1>
        )}
      </div>

      <SendBox
        setMessages={setMessages}
        chatId={chatId}
        receiver={receiver?.id}
      />
    </div>
  );
};

export default Chat;
