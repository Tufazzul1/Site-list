import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const AllList = () => {

    const [websites, setWebsites] = useState([]);
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites`);
                setWebsites(response.data);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [axiosPublic]);

    return (
        <section>
            <div className="flex justify-between items-center mb-5 px-3 text-white">
                <h3 className="text-xl">Featured List</h3>
                <Link to={'/category'} className={"btn-sm md:btn border-none bg-[#434346] hover:bg-[#151518] text-white "}>View All</Link>
            </div>
            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {websites.map(website => (
                    <Card
                        key={website?._id}
                        website={website}
                        className="card bg-[#1E1F21]"
                    >
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default AllList;
