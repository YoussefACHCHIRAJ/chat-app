import { setAuthUser } from "@/Redux/AuthUser/authUserSlice";
import { UserType } from "@/Types";
import { useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [errors, setErros] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user: authUser } = useClerk();
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/userslist");
        if (!response.ok) throw new Error("failed get users");
        const result = await response.json();
        setUsers(result.users);
        // set auth user globally
        dispatch(
          setAuthUser(
            result.users.find((user: UserType) => user.userId === authUser?.id)
          )
        );
      } catch (error) {
        console.log(error);
        setErros(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, isLoading, errors };
};

export default useGetUsers;
