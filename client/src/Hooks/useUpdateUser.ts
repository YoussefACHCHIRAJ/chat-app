import { RootState } from "@/Redux/store";
import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

const useUpdateUser = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);

  const query = useMutation<void, Error, string>(async (username) => {
    console.log({username});
      await axios.post(
        `http://localhost:8080/users/update/${authUser?._id}`,
        {username}
      );
   
  });
  return query;
};

export default useUpdateUser;
