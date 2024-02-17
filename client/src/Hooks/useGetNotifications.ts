import { RootState } from "@/Redux/store";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const useGetNotification = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const query = useQuery({
    queryKey: ["notifications", authUser?._id],
    queryFn: async () => {
      try {
        const { data } = await axios(
          `http://localhost:8080/notifications/${authUser?._id}`
        );

        return data.notifications;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(
          `failed fetching notifications: ${axiosError?.message}.`
        );
      }
    },
    enabled: authUser?._id !== undefined,
  });
  return query;
};

export default useGetNotification;
