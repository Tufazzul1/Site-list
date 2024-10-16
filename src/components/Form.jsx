import PropTypes from "prop-types";
import Button from "../shared/Button";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Form = ({ data, isUpdate }) => {

    const [copied, setCopied] = useState(false);
    const {user} = useAuth();

    const handleCopy = () => {
        navigator.clipboard.writeText("hellosalehahmed01@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const formHeader = isUpdate ? "Edit Your Website for Fixing Error" : "Submit Your Website for Listing";

    const formSubHeader = isUpdate
        ? <>Edit and Submit your website to be featured in our curated collection of top websites by category. <br /> Increase your visibility and reach a broader audience.</>
        : <> Submit your website to be featured in our curated collection of top websites by category. <br /> Increase your visibility and reach a broader audience.</>;

    const [formData, setFormData] = useState({
        name: data ? data.name : "",
        link: data ? data.link : "",
        category: data ? data.category : "",
        subCategory: data ? data.subCategory : "",
        description: data ? data.description : "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString(); 

        const formDataWithDate = {
            ...formData,
            date: currentDate, 
            email: user?.email
        };

        console.log(formDataWithDate)

        if (isUpdate) {
            console.log("Updating website:", formDataWithDate);
            // Add the update logic here
        } else {
            console.log("Adding new website:", formDataWithDate);
            // Add the logic for adding new data here
        }
    };

    return (
        <>
            <div className="mb-10 text-center mt-5 md:mt-10 text-white space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold">{formHeader}</h2>
                <h2 className="font-light">{formSubHeader}</h2>
            </div>
            <div className="bg-gradient-to-b from-[#292929] to-[#29292900] p-4 md:p-6 rounded-lg shadow-sm max-w-md mx-auto">
                <form onSubmit={formSubmit} className="w-full space-y-4">
                    <div className="w-full">
                        <label className="block mb-1 text-white">Website Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-none bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400"
                            placeholder="Enter the name of your website"
                            
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-white">Website Link (URL)</label>
                        <input
                            type="text"
                            name="link"
                            required
                            value={formData.link}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-none bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400"
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-white">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            required
                            onChange={handleInputChange}
                            className="border-none bg-[#161619] h-[38px] w-full px-2 py-1 md:px-4 rounded-lg"
                        >
                            <option value="Design">Design</option>
                            <option value="Technology">Technology</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Travel">Travel</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-white">Sub Category</label>
                        <select
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleInputChange}
                            required
                            className="border-none bg-[#161619] h-[38px] w-full px-2 py-1 md:px-4 rounded-lg"
                        >
                            <option value="Design Tools">Design Tools</option>
                            <option value="Icons">Icons</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Templates">Templates</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-white">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-none bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400 h-[100px]"
                            placeholder="Briefly describe your website, its purpose, and the target audience."
                        />
                    </div>

                    <Button type="submit" text={isUpdate ? "Update Website" : "Submit Website"} className="w-full"></Button>
                </form>
            </div>
            <div className="flex items-center text-white justify-center text-center gap-2 py-8">
                Contact for Featured:
                <span className="text-gray-500">hellosalehahmed01@gmail.com</span>
                <img
                    src="/copy.png"
                    alt="copy"
                    className="cursor-pointer"
                    onClick={handleCopy}
                />
            </div>

            {copied && <span className="text-green-200 flex justify-center ml-2">Copied!</span>}
        </>
    );
};

// PropTypes validation
Form.propTypes = {
    data: PropTypes.object,
    header: PropTypes.string,
    subHeader: PropTypes.string,
    isUpdate: PropTypes.bool,
};

export default Form;
