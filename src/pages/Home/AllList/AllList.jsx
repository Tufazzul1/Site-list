import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import useAxios from "../../../hooks/useAxios";
import Button from "../../../shared/Button";
import useAuth from "../../../hooks/useAuth";

const AllList = () => {

    const [websites, setWebsites] = useState([]);
    const axiosPublic = useAxios();
    const{user} = useAuth();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosPublic.get(`/allSites`);
    //             setWebsites(response.data);

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };
    //     fetchData();
    // }, [axiosPublic]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allWebResponse, favResponse] = await Promise.all([
                    axiosPublic.get(`/allSites`),
                    axiosPublic.get(`/getFavourite?email=${user?.email}`)
                ]);

                const favWebsitesSet = new Set(favResponse.data.map(website => website._id));

                const allWebsitesWithFavStatus = allWebResponse.data.map(website => ({
                    ...website,
                    isFavorite: favWebsitesSet.has(website._id)
                }));

                setWebsites(allWebsitesWithFavStatus);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic, user]);




    return (
        <section>
            <div className="flex justify-between items-center mb-5 px-3 text-white">
                <h3 className="text-xl">Featured List</h3>
                <Button to={'/category'} text="View All" />
            </div>
            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {websites.map(website => (
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

export default AllList;
