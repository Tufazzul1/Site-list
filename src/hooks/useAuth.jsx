
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";


const useAuth = () => {
    const useAuth = useContext(AuthContext)
    return useAuth;
};

export default useAuth;
