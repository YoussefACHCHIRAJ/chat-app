import axios from 'axios';
import { useQuery } from 'react-query';

const useGetLastMessages = (authUser: string) => {
    const results = useQuery({
        queryKey: "getLastMessages",
        queryFn: async () => {
            try {
                const { data } = await axios(`http://localhost:8080/messages/lastMessage/${authUser}`);
                return data.messages
            } catch (error) {
                throw new Error("failed to get the last messages");
            }
        }
    });

    return results;
}

export default useGetLastMessages;