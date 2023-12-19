import axios from "axios";
import { useMutation } from "react-query";

const useClearConversation = () => {
  const query = useMutation<boolean, Error,string>(
    async (loggedInUserId) => {
      try {
        const {data} = await axios.delete(`http://localhost:8080/messages/${loggedInUserId}`)
        return data.deleted;
      } catch (error) {
        throw new Error("Failed clear Conversation");
      }
    }
  );

  return query;

};

export default useClearConversation;
