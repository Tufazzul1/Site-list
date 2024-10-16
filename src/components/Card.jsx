import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Card = ({ website }) => {

    const { image, logo, title, websiteURL, category, description } = website;

    return (
        <div>
            <figure className="bg-[#292929]">
                <img
                    className="w-full pt-4 pl-4"
                    src={image}
                    alt="website-image" />
            </figure>
            <div className="p-4 text-white space-y-3">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div>
                            <img className="w-[50px] rounded-full" src={logo} alt="logo" />
                        </div>
                        <div>
                            <h2 className="text-mdl font-semibold">{title}</h2>
                            <Link className="text-xs">{websiteURL}</Link>
                        </div>
                    </div>
                    <div>
                        <img src="/heart.png" alt="heart" />
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
        image: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        websiteURL: PropTypes.string.isRequired,
        websiteCategory: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
    }).isRequired,
};
export default Card;

