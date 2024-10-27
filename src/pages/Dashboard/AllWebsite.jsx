import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useAxios from "../../hooks/useAxios";
import FeaturedCard from "../../components/FeaturedCard";

const AllWebsite = () => {
    const [websites, setWebsites] = useState([]);
    const [allWebsites, setAllWebsites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites`);
                setWebsites(response.data);
                setAllWebsites(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic]);

    const handleDelete = async (websiteId) => {
        try {
            const res = await axiosPublic.delete(`/deleteSite/${websiteId}`);
            console.log('Delete successful:', res);
            setWebsites((prevWebsites) => prevWebsites.filter(website => website._id !== websiteId));
            setAllWebsites((prevWebsites) => prevWebsites.filter(website => website._id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error);
        }
    };

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchValue(search);

        if (!search) {
            setWebsites(allWebsites);
        } else {
            const filterByTitle = allWebsites.filter((website) =>
                website.name.toLowerCase().includes(search)
            );
            const filterByURL = allWebsites.filter((website) =>
                website.link.toLowerCase().includes(search)
            );

            // Combine both filtered results, removing duplicates
            const combinedResults = Array.from(new Set([...filterByTitle, ...filterByURL]));
            setWebsites(combinedResults);
        }
    };

    return (
        <div>
            <div className="flex justify-between my-10">
                <h3 className="text-xl font-semibold">All Website</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Name or URL"
                        value={searchValue}
                        onChange={handleSearch}
                        className="bg-[#292929] outline-none text-white placeholder:text-[#434346] px-3 h-[44px] rounded-lg border py-2 w-[318px] pr-10  border-[#434346]"
                    />
                    <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                </div>
            </div>
            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {websites.map((website) => (
                    <FeaturedCard
                        key={website._id}
                        website={website}
                        showHeartIcon={true}
                        handleDelete={handleDelete}
                        className="card bg-[#1E1F21]"
                    />
                ))}
            </div>
        </div>
    );
};

export default AllWebsite;