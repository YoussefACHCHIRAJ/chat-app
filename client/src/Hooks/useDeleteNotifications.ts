import { useMutation } from "react-query";

type NotificationParamsDataType = {
  receiver: string;
  sender: string;
};

const useDeleteNotification = () => {
  const query = useMutation<boolean, Error, NotificationParamsDataType>(
    async ({receiver, sender}) => {
    
      try {
        const response = await fetch(
          `http://localhost:8080/notifications/${receiver}?sender=${sender}`,
          { method: "DELETE" }
        );

        if (!response.ok) throw new Error("failed fetching notifications.");

        const result = await response.json();
        return result.deleteNotify;
      } catch (error) {
        throw new Error("failed fetching notifications.");
      }
    }
  );

  return query;
};

export default useDeleteNotification;
