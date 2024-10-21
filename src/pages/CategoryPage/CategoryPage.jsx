import { useEffect, useState } from "react";
import FilterBtn from "../../shared/FilterBtn";
import Card from "../../components/Card";
import useAxios from "../../hooks/useAxios";

const CategoryPage = () => {
    const [websites, setWebsites] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const axiosPublic = useAxios();

    // Fetching the data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/allSites`);
                setWebsites(response.data);
                setOriginalProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic]);

    // Function to handle category filter
    const handleSearchByCategory = (category) => {
        setActiveCategory(category);
        if (category === "All") {
            setWebsites(originalProducts);
        } else {
            const filteredWebsites = originalProducts.filter(
                (website) => website.category === category
            );
            setWebsites(filteredWebsites);
        }
    };

    return (
        <section className="px-4 mt-8">
            <h3 className="text-xl text-white mb-4">Category</h3>

            <div className="flex">
                <div className="flex gap-2 items-center">
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'All' ? 'bg-white  text-[#151518]' : 'bg-[#292929] text-white'}`}
                        text="All"
                        onClick={() => handleSearchByCategory("All")}
                    />
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'Featured' ? 'bg-white text-[#151518]' : 'bg-[#292929] text-white'}`}
                        text="Featured"
                        onClick={() => handleSearchByCategory("Featured")}
                    />
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'New' ? 'bg-white  text-[#151518]' : 'bg-[#292929] text-white'}`}
                        text="New"
                        onClick={() => handleSearchByCategory("New")}
                    />
                </div>

                <div className="divider divider-horizontal divider-warning"></div>

                <div className="flex gap-2 items-center">
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'Technology' ? 'bg-white  text-[#151518]' : 'bg-[#151518] text-white'}`}
                        text="Technology"
                        onClick={() => handleSearchByCategory("Technology")}
                    />
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'E-commerce' ? 'bg-white  text-[#151518]' : 'bg-[#151518] text-white'}`}
                        text="E-commerce"
                        onClick={() => handleSearchByCategory("E-commerce")}
                    />
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'Travel' ? 'bg-white  text-[#151518]' : 'bg-[#151518] text-white'}`}
                        text="Travel"
                        onClick={() => handleSearchByCategory("Travel")}
                    />
                    <FilterBtn
                        className={`hover:bg-[#151518] ${activeCategory === 'Education' ? 'bg-white  text-[#151518]' : 'bg-[#151518] text-white'}`}
                        text="Education"
                        onClick={() => handleSearchByCategory("Education")}
                    />
                </div>
            </div>

            <div>
                <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                    {websites.map(website => (
                        <Card
                            key={website?._id}
                            website={website}
                            showHeartIcon={true}
                            className="card bg-[#1E1F21]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;
