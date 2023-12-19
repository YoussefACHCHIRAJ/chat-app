import axios from "axios";
import { useQuery } from "react-query";

const useGetNotification = (userId: string) => {
  const query = useQuery({
    queryKey: ["notifications", { userId }],
    queryFn: async () => {
      try {
        const {data} = await axios(`http://localhost:8080/notifications/${userId}`);

        return data.notifications;
      } catch (error) {
        throw new Error("failed fetching notifications.");
      }
    },
  });
  return query;
};

export default useGetNotification;
