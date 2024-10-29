import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Card from "../../../components/Card";
import Button from "../../../shared/Button";


const Featured = () => {

    const [featuredSites, setFeaturedSites] = useState([]);
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/featured-sites`);
                setFeaturedSites(response.data);

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [axiosPublic]);

    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-5 px-3 text-white">
                <h3 className="text-xl">Featured List</h3>
                <Button to={'/category'} text="View All" />
            </div>
            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {featuredSites.slice(0, 4).map(website => (
                    <Card
                        key={website?._id}
                        website={website}
                        showHeartIcon={true}
                        className="card bg-[#1E1F21]"
                    >
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Featured;