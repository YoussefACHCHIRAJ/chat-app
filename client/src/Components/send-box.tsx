import { formSchema } from "@/lib/validations/send-box-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/Components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Send, Smile } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { socket } from "@/Pages";
import { MessageTypes, UserType } from "@/Types";

const SendBox = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes<UserType | null>[]>>;
}) => {
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const authUser = useSelector((state: RootState) => state.authUser.value);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.message === "") return;

    const chat = [authUser?._id, receiver?._id].sort().join("");
    const newMessage: MessageTypes<UserType | null> = {
      sender: authUser,
      receiver,
      content: values.message,
      time: new Date().toISOString(),
      chat
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("send-message", newMessage);
    form.reset();
  }

  return (
    <div className="px-3 py-4 bg-primary flex items-center">
      <Button className="text-RcMsgBg3">
        <Smile width={30} height={30} />
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center w-full"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Write a message here..."
                    className="bg-black border-0 md:p-4 text-white md:h-14"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="flex items-center justify-center md:gap-2 bg-black text-white md:h-12"
            type="submit"
          >
            <span className="hidden md:block">Send</span>{" "}
            <Send width={18} height={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendBox;
