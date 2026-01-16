import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../config/api";

const useAuthUser = () => {

  const authUser = useQuery({   // data, isLoading, error

    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  //const isAuthenticated = authUser.data?.success;

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user,
  }
}

export default useAuthUser