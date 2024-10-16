import PropTypes from 'prop-types';

const FilterBtn = ({ text, onClick, className, isActive }) => {
    return (
        <button
            type="button"
            className={`badge p-3 border-none ${
                isActive ? 'bg-white text-black' : 'bg-[#151518] text-white hover:bg-[#434346]'
            } ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

// Define prop types
FilterBtn.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    isActive: PropTypes.bool,
};

// Default props
FilterBtn.defaultProps = {
    onClick: null,
    className: '',
    isActive: false,
};

export default FilterBtn;
