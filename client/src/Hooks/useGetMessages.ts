import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios, { AxiosError } from "axios";

import { RootState } from "@/Redux/store";

const useGetMessages = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const receiver = useSelector((state: RootState) => state.receiver.value);
  const results = useQuery({
    queryKey: ["messages", authUser?._id, receiver?._id],
    queryFn: async () => {
      try {
        const { data } = await axios(
          `http://localhost:8080/messages/${authUser?._id}`,
          {
            params: {
              receiver: receiver?._id,
            },
          }
        );
        return data.messages;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(`failed to get messages: ${axiosError?.message}`);
      }
    },
    enabled: authUser?._id !== undefined
  });

  return results;
};

export default useGetMessages;
