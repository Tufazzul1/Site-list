import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useAxios from "../../hooks/useAxios";


const AllWebsite = () => {

    const [websites, setWebsites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites`);
                setWebsites(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic]);


    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setSearchValue(search);

        const filteredData = websites.filter((product) =>
            product.title.toLowerCase().includes(search)
        );

        setWebsites(filteredData);
    };

    console.log(websites);

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
                        className="bg-[#292929] outline-none text-white placeholder:text-[#434346] px-3 h-[44px] rounded-lg border-none py-2 w-[318px] pr-10"
                    />
                    <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                </div>

            </div>

        </div>
    );
};

export default AllWebsite;