import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

type NotificationParamsDataType = {
  receiver: string;
  sender: string;
};

const useDeleteNotification = () => {
  const query = useMutation<boolean, Error, NotificationParamsDataType>(
    async ({receiver, sender}) => {
    
      try {
        const {data} = await axios.delete(`http://localhost:8080/notifications/${receiver}?sender=${sender}`)
        return data.deleteNotify;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(`failed fetching notifications: ${axiosError?.message}.`);
      }
    }
  );

  return query;
};

export default useDeleteNotification;
