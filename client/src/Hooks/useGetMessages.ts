import axios from "axios";
import { useQuery } from "react-query";

const useGetMessages = (loggedInUser: string, recipient: string) => {
  const results = useQuery({
    queryKey: ["messages", { loggedInUser }, { recipient }],
    queryFn: async () => {
      try {
        const {data} = await axios(`http://localhost:8080/messages/${loggedInUser}?receiver=${recipient}`)
        return data.messages;
      } catch (error) {
        throw new Error("failed to get messages");
      }
    },
  });

  return results;
};

export default useGetMessages;
