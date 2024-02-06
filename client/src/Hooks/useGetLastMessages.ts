import { RootState } from '@/Redux/store';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetLastMessages = () => {
    const authUser = useSelector((state: RootState) => state.authUser.value);
    const results = useQuery({
        queryKey: ["getLastMessages", authUser],
        queryFn: async () => {
            try {
                const { data } = await axios(`http://localhost:8080/messages/lastMessage/${authUser?._id}`);
                return data.lastMessages
            } catch (error) {
                throw new Error("failed to get the last messages");
            }
        }
    });

    return results;
}

export default useGetLastMessages;