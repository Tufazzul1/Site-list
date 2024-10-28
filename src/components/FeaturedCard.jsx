import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from "../shared/Button";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const FeaturedCard = ({ website, handleDelete }) => {
    const { _id, image, logo, name, link, category, description } = website;

    const axiosPublic = useAxios();
    const { user } = useAuth();
    const email = user ? user.email : null;

    // State to track if the website is featured
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        const checkFeaturedStatus = async () => {
            try {
                const response = await axiosPublic.get(`/is-featured?email=${email}&websiteId=${_id}`);
                setIsFeatured(response.data.isFeatured);
            } catch (error) {
                console.error("Error checking featured status:", error);
            }
        };
        if (email) checkFeaturedStatus();
    }, [email, _id, axiosPublic]);

    // Function to handle adding/removing featured
    const toggleFeatured = async () => {
        if (isFeatured) {
            try {
                const response = await axiosPublic.delete('/remove-featured', {
                    data: { email, websiteId: _id }
                });
                if (response.status === 200) {
                    console.log(response.data.message);
                    setIsFeatured(false);
                }
            } catch (error) {
                console.error("Error removing from featured:", error.response ? error.response.data : error.message);
            }
        } else {
            try {
                const response = await axiosPublic.post('/add-featured', {
                    email,
                    websiteId: _id,
                    name,
                    link,
                    logo,
                    image,
                    category,
                    description,
                });

                if (response.status === 201) {
                    console.log(response.data.message);
                    setIsFeatured(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert("This website is already in your featured.");
                } else {
                    console.error("Error adding to featured:", error.response ? error.response.data : error.message);
                }
            }
        }
    };

    return (
        <div className="bg-[#1E1F21] rounded-lg flex-grow flex flex-col">
            <figure className="bg-[#292929] rounded-lg">
                <img className="w-full pt-4 pl-4 object-fill h-[170px]" src={image} alt="website-image" />
            </figure>
            <div className="p-4 text-white space-y-3 flex-grow">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div>
                            <img className="w-[50px] h-[50px] rounded-full" src={logo} alt="logo" />
                        </div>
                        <div>
                            <h2 className="text-mdl font-semibold">{name}</h2>
                            <p className="text-xs truncate max-w-[150px]">
                                <Link to={link} target="_blank" className="break-all">{link}</Link>
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link to={`/update/${_id}`}>
                            <img src="/edit.png" alt="edit" />
                        </Link>
                    </div>
                </div>
                <p className="badge border-none py-4 text-white bg-[#292929]">{category}</p>
                <p>{description}</p>
            </div>

            <div className="flex justify-around my-3">
                <button onClick={toggleFeatured} className={`px-8 btn border-none ${isFeatured ? "bg-[#292929] text-white hover:bg-white hover:text-black" : ""}`} >
                    {isFeatured ? "Unfeatured" : "Featured"}
                </button>
                <Button onClick={() => handleDelete(_id)} className={'px-8'} text="Delete" />
            </div>
        </div>
    );
};

FeaturedCard.propTypes = {
    website: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default FeaturedCard;