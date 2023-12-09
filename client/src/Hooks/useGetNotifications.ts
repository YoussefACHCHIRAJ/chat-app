import { useQuery } from "react-query";

const useGetNotification = (userId: string) => {
  const query = useQuery({
    queryKey: ["notifications", { userId }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/notifications/${userId}`
        );

        if (!response.ok) throw new Error("failed fetching notifications.");

        const result = await response.json();
        return result.notifications;
      } catch (error) {
        throw new Error("failed fetching notifications.");
      }
    },
  });
  return query;
};

export default useGetNotification;
