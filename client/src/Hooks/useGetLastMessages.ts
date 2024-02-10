import { RootState } from '@/Redux/store';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const useGetLastMessages = () => {
    const authUser = useSelector((state: RootState) => state.authUser.value);
    const results = useQuery({
        queryKey: ["getLastMessages", authUser?._id],
        queryFn: async () => {
            try {
                const { data } = await axios(`http://localhost:8080/messages/lastMessage/${authUser?._id}`);
                return data.lastMessages
            } catch (error) {
                const axiosError = error as AxiosError;
                throw new Error(`failed to get the last messages: ${axiosError?.message}`);
            }
        },
        enabled: authUser?._id !== undefined
    });

    return results;
}

export default useGetLastMessages;