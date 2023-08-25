import { useState } from "react";

const useGetMessages = () => {
  const [errors, setErros] = useState<unknown>(null);

    
      const fetchMessages = async () => {
        try {
          const response = await fetch("http://localhost:8080/messages");
          
          if (!response.ok) throw new Error("failed get messages");
          
          const result = await response.json();
          
          return result;
        } catch (error) {
          console.log(error);
          setErros(error);
          return null;
      };}

  return {fetchMessages, errors}
};

export default useGetMessages