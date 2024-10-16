import { useEffect, useState } from "react";
import FilterBtn from "../../shared/FilterBtn";
import Card from "../../components/Card";

const CategoryPage = () => {
    const [websites, setWebsites] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                setWebsites(data);
                setOriginalProducts(data); // Save original products for reset on 'All'
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCategorySearch = (selectedCategory) => {
        setActiveCategory(selectedCategory); // Set the active category

        if (selectedCategory === "All") {
            setWebsites(originalProducts); // Show all products
        } else {
            const filteredProducts = originalProducts.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            setWebsites(filteredProducts);
        }
    };

    return (
        <section className="px-4 mt-8">
            <h3 className="text-xl text-white mb-4">Category</h3>

            <div className="flex">
                <div className="flex gap-2 items-center">
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="All" 
                        isActive={activeCategory === "All"}
                        onClick={() => handleCategorySearch("All")} 
                    />
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="Featured" 
                        isActive={activeCategory === "Featured"}
                        onClick={() => handleCategorySearch("Featured")} 
                    />
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="New" 
                        isActive={activeCategory === "New"}
                        onClick={() => handleCategorySearch("New")} 
                    />
                </div>

                <div className="divider divider-horizontal"></div>

                <div className="flex gap-2 items-center">
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="Technology" 
                        isActive={activeCategory === "Technology"}
                        onClick={() => handleCategorySearch("Technology")} 
                    />
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="E-commerce" 
                        isActive={activeCategory === "E-commerce"}
                        onClick={() => handleCategorySearch("E-commerce")} 
                    />
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="Travel" 
                        isActive={activeCategory === "Travel"}
                        onClick={() => handleCategorySearch("Travel")} 
                    />
                    <FilterBtn 
                        className="hover:bg-[#151518]" 
                        text="Education" 
                        isActive={activeCategory === "Education"}
                        onClick={() => handleCategorySearch("Education")} 
                    />
                </div>
            </div>

            <div>
                <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                    {websites.map(website => (
                        <Card
                            key={website?.id}
                            website={website}
                            className="card bg-[#1E1F21]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;
