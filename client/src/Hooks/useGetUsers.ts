import { setAuthUser } from "@/Redux/AuthUser/authUserSlice";
import { UserType } from "@/Types";
import { useClerk } from "@clerk/clerk-react";
import axios, { AxiosError } from "axios";
// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const useGetUsers = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useClerk();

  const query = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/users/list");

        // set auth user globally
        dispatch(
          setAuthUser(
            data.users.find((user: UserType) => user.userId === authUser?.id)
          )
        );
        // exclude the auth user from the list
        const users = data?.users?.filter(
          (user: UserType) => user.userId !== authUser?.id
        );
        return users;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error(`failed get users: ${axiosError?.message}`);
      }
    },
  });

  return query;
};

export default useGetUsers;
