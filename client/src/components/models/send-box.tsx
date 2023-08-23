import { formSchema } from "@/lib/validations/send-box-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { MessageTypes } from "@/types";
import { socket } from "@/pages/ChatPage";

interface sendBoxProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  chatId:string;
  receiver: string;
}
const SendBox = ({ setMessages, chatId, receiver}: sendBoxProps) => {
  const { user } = useClerk();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.message === "") return;

    const messageData: MessageTypes = {
      chatId: chatId,
      sender: user?.id as string,
      receiver: receiver,
      content: values.message,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
    };
    socket.emit('send-message', messageData);
    setMessages(messages => [...messages, messageData]);
    form.reset();
  }
  
  
  return (
    <div className="px-3 mb-4">
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
                  <Input placeholder="Write a message here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="flex items-center justify-center md:gap-2 bg-[#6588DE]"
            type="submit"
          >
            <span className='hidden md:block'>Send</span> <Send width={15} height={15} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendBox;
