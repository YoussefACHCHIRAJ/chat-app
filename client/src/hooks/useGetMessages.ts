import { MessageTypes } from "@/types";
import { useEffect, useState } from "react";

const useGetMessages = () => {
  const [fetchedMessages, setFetchedMessages] = useState<MessageTypes[]>([]);
  const [errors, setErros] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      const fetchMessages = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:8080/messages");
          
          if (!response.ok) throw new Error("failed get messages");
          
          const result = await response.json();
          
          setFetchedMessages(result);
        } catch (error) {
          console.log(error);
          setErros(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMessages();
    }, []);

  return {fetchedMessages, isLoading, errors}
};

export default useGetMessages