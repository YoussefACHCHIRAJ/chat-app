import { setAuthUser } from "@/Redux/AuthUser/authUserSlice";
import { UserType } from "@/Types";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
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
        return data.users;
      } catch (error) {
        throw new Error("failed get users");
      }
    },
  });

  return query;
};

export default useGetUsers;
