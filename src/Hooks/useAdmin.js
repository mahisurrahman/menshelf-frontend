import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  return user?.userType === 3;
};

export default useAdmin;
