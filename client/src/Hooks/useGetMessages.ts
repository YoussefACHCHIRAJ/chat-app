import { useQuery } from "react-query";

const useGetMessages = (loggedInUser: string, recipient: string) => {
  const results = useQuery({
    queryKey: ["messages", { loggedInUser }, { recipient }],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/messages/${loggedInUser}?recipient=${recipient}`
        );

        if (!response.ok) throw new Error("failed to get messages");

        const result = await response.json();

        return result.messages;
      } catch (error) {
        throw new Error("failed to get messages");
      }
    },
  });

  return results;
};

export default useGetMessages;
