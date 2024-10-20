import PropTypes from "prop-types";
import Button from "../shared/Button";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Form = ({ data, isUpdate }) => {

    const [copied, setCopied] = useState(false);
    const { user } = useAuth();
    const axiosPublic = useAxios();

    const handleCopy = () => {
        navigator.clipboard.writeText("hellosalehahmed01@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file.name);
        } else {
            setSelectedImage(null);
        }
    };

    const handleLogoChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setSelectedLogo(file.name);
        } else {
            setSelectedLogo(null);
        }
    }
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

        if (isUpdate) {
            console.log("Updating website:", formDataWithDate);

        } else {
            axiosPublic.post('/submitedWebsite', formDataWithDate)
                .then(response => {
                    if (response.data.insertedId) {
                        console.log("Website submited successfully", response);
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <>
            <div className="mb-10 text-center mt-5 md:mt-10 text-white space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold">{formHeader}</h2>
                <h2 className="font-light">{formSubHeader}</h2>
            </div>
            <div className="bg-gradient-to-b from-[#292929] to-[#29292900] p-4 md:p-6 rounded-lg shadow-sm  mx-auto max-w-3xl">
                <form onSubmit={formSubmit} className="w-full space-y-4">
                    <div className="flex justify-between gap-3">
                        <div className="w-full">
                            <label className="block mb-1 text-white">Website Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full text-white px-3 py-2 border-none bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400"
                                placeholder="Enter the name of your website"

                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-1 text-white">Website Link (URL)</label>
                            <input
                                type="url"
                                name="link"
                                required
                                value={formData.link}
                                onChange={handleInputChange}
                                className="w-full text-white px-3 py-2 border-none bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="w-full">
                            <label className="block mb-1 text-white">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                required
                                onChange={handleInputChange}
                                className="border-none text-white bg-[#161619] h-[38px] w-full px-2 py-1 md:px-4 rounded-lg hover:bg-[#434346]"
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
                                className="border-none text-white bg-[#161619] h-[38px] w-full px-2 py-1 md:px-4 rounded-lg hover:bg-[#434346]"
                            >
                                <option value="Design Tools">Design Tools</option>
                                <option value="Icons">Icons</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Templates">Templates</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between gap-3">

                        <div className="w-full">
                            <label className="block mb-1 text-white">Website Screenshot (620px - 340px)</label>
                            <input
                                type="file"
                                id="image-input"
                                name="image"
                                required
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="image-input"
                                className={`w-full h-[45px] rounded-md bg-[#161619] flex items-center justify-between cursor-pointer text-white px-4 ${selectedImage ? 'text-white' : 'text-[#434346]'
                                    }`}
                            >
                                {selectedImage ? selectedImage : "Choose a file..."}
                                <span className="bg-[#292929] px-2 py-1 text-white rounded-md">Choose File</span>
                            </label>
                        </div>

                        <div className="w-full">
                            <label className="block mb-1 text-white">Logo (200px - 200px)</label>
                            <input
                                type="file"
                                id="logo-input"
                                name="logo"
                                required
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="logo-input"
                                className={`w-full h-[45px] rounded-md bg-[#161619] flex items-center justify-between cursor-pointer text-white px-4 ${selectedLogo ? 'text-white' : 'text-[#434346]'
                                    }`}
                            >
                                {selectedLogo ? selectedLogo : "Choose a file..."}
                                <span className="bg-[#292929] px-2 py-1 text-white rounded-md">Choose File</span>
                            </label>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block mb-1 text-white">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-none text-white bg-[#161619] placeholder:text-[#434346] rounded-md outline-none hover:bg-[#434346] placeholder:hover:text-gray-400 h-[100px]"
                            placeholder="Briefly describe your website, its purpose, and the target audience."
                        />
                    </div>

                    <Button type="submit" text={isUpdate ? "Update Website" : "Submit Website"} className="w-full btn-sm"></Button>
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
