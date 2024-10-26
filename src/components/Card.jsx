import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from "../shared/Button";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Card = ({ website, showHeartIcon, handleDelete, favourite, handleDeleteFavourite }) => {

    const { _id, image, logo, name, link, category, description } = website;

    const [isFavorite, setIsFavorite] = useState(website.isFavorite);
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const email = user ? user.email : null;

    const handleFavourite = async () => {
        if (!email) {
            console.error("User is not logged in");
            return;
        }
        try {
            const response = await axiosInstance.post('/favourite', {
                email,
                websiteId: _id,
                name,
                link,
                logo,
                image,
                category,
                description,
            });

            if (response.status === 200) {
                setIsFavorite(true);
                console.log(response.data.message);
            } else {
                console.error("Failed to add favorite:", response.data.message);
                alert("this website already in your favourite")
            }
        } catch (error) {
            console.error("Error adding to favorites:", error.response ? error.response.data : error.message);
            alert("this website already in your favourite")
        }
    };


    return (
        <div>
            <figure className="bg-[#292929]">
                <img className="w-full pt-4 pl-4 object-fill h-[170px]" src={image} alt="website-image" />
            </figure>
            <div className="p-4 text-white space-y-3 ">
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
                        {showHeartIcon ? (
                            <button onClick={favourite ? handleDeleteFavourite : handleFavourite}>
                                <img src={isFavorite || favourite ? "/heart2.png" : "/heart.png"} alt="heart" />
                            </button>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div>
                                        <img alt="3-dot-icon" src="/More Square.png" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm w-[214px] dropdown-content rounded-md mt-3 z-[100] p-2 shadow bg-[#434346] gap-1">
                                    <li>
                                        <Button to={`/update/${_id}`} text="Update Website" className='btn-sm' />
                                    </li>
                                    <li>
                                        <Button text="Delete Website" onClick={() => handleDelete(_id)} className='btn-sm' />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <p className="badge border-none p-3 text-white bg-[#292929]">{category}</p>
                <p>{description}</p>
            </div>
        </div>

    );
};


Card.propTypes = {
    website: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired
    }).isRequired,
    showHeartIcon: PropTypes.bool,
    favourite: PropTypes.bool,
    handleDelete: PropTypes.func.isRequired,
    handleDeleteFavourite: PropTypes.func.isRequired,
};

export default Card;
