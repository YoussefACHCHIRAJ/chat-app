import { useState } from "react";

const useClearConversation = () => {
  const [errors, setErros] = useState<unknown>(null);
  const [isLoading, setIsLoading ] = useState<boolean>(false);


  const clearConversation = async (loggedInUserId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/messages/${loggedInUserId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("failed get messages");

      const result = await response.json();

      return result.deleted;
    } catch (error) {
      console.log(error);
      setErros(error);
      return false;
    } finally{
      setIsLoading(false);
    }
  };

  return { clearConversation, errors, isLoading };
};

export default useClearConversation;
