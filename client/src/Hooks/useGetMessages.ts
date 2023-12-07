import { useState } from "react";

const useGetMessages = () => {
  const [errors, setErros] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<unknown>(false);

  const fetchMessages = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/messages/${id}`);

      if (!response.ok) throw new Error("failed to get messages");

      const result = await response.json();

      return result;
    } catch (error) {
      console.log(error);
      setErros(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchMessages, errors, isLoading };
};

export default useGetMessages;
