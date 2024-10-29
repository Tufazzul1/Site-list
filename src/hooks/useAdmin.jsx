import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";


const useAdmin = () => {
    const { user } = useAuth();
    console.log(user?.email)
    const axiosPublic = useAxios();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user?.email) {
                setIsAdminLoading(true);
                try {
                    const response = await axiosPublic.get(`users/admin/${user.email}`);
                    setIsAdmin(response.data?.admin || false);
                } catch (error) {
                    console.error("Failed to fetch admin status:", error);
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [user, axiosPublic]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
