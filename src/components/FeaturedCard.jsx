import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from "../shared/Button";

const FeaturedCard = ({ website, onApprove, handleDelete }) => {

    const { _id, image, logo, name, link, category, description } = website;

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
                <Button onClick={() => onApprove(_id)} className={'px-8'} text="Featured" />
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
    onApprove: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default FeaturedCard;
