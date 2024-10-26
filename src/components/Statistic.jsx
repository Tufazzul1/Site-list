import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";


const Statistic = () => {

    const axiosPublic = useAxios();
    const [users , setUsers] = useState([]);
    const [totalWebsites , setTotalWebsites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/users`);
                setUsers(response.data);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [axiosPublic]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites`);
                setTotalWebsites(response.data);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [axiosPublic]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">

            <div className="flex justify-between bg-[#292929] py-7 px-5 rounded-md">
                <div className="flex items-center gap-3">
                    <img src="/3 User.png" alt="" />
                    <p>Total Lead</p>
                </div>
                <h2 className="text-4xl font-bold">{users.length}</h2>
            </div>

            <div className="flex justify-between bg-[#292929] py-7 px-5 rounded-md">
                <div className="flex items-center gap-3">
                    <img src="/websites.png" alt="" />
                    <p>Total Websites</p>
                </div>
                <h2 className="text-4xl font-bold">{totalWebsites.length}</h2>
            </div>

            <div  className="flex justify-between bg-[#292929] py-7 px-5 rounded-md">
                <div className="flex items-center gap-3">
                    <img src="/featured.png" alt="" />
                    <p>Total Featured</p>
                </div>
                <h2 className="text-4xl font-bold">100k</h2>
            </div>
        </section>
    );
};

export default Statistic;