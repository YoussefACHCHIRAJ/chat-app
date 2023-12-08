import { setAuthUser } from "@/Redux/AuthUser/authUserSlice";
import { UserType } from "@/Types";
import { useClerk } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const useGetUsers = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useClerk();

  const results = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:8080/userslist");
        if (!response.ok) throw new Error("failed get users");
        const result = await response.json();

        // set auth user globally
        dispatch(
          setAuthUser(
            result.users.find((user: UserType) => user.userId === authUser?.id)
          )
        );
        return result.users;
      } catch (error) {
        throw new Error("failed get users");
      }
    },
  });

  return results;
};

export default useGetUsers;
