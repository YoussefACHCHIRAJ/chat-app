
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import useUpdateUser from "@/Hooks/useUpdateUser";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const UpdateUserNameInputModel = () => {
    const authUser = useSelector((state: RootState) => state.authUser.value)
    const {mutate: updateUsername} = useUpdateUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: authUser?.username,
        },
      });

      function onSubmit(values: z.infer<typeof formSchema>) {
        const { username } = values;
        if(!username) return;

        updateUsername(username);


      }
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username..." {...field} className="bg-gray-800 border-gray-900 focus:border-gray-900 ring-0"/>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="message-sender text-white">Update</Button>
            <Button >Cancel</Button>
          </form>
        </Form>
      )
};

export default UpdateUserNameInputModel;
