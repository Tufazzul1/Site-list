import Button from "../Button";

const Footer = () => {

    return (

        <footer className="text-center px-10 space-y-4  bg-[#1E1F21] text-white p-10 mt-16" style={{ backgroundImage: "url('./light_06 1.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}} >
            <h2 className="text-3xl md:text-4xl font-semibold">See More Website List by Category</h2>
            <p>Explore our comprehensive collection of websites categorized for easy browsing. <br /> Discover top websites in design, tech, e-commerce and more </p>

            <Button to={'/category'} text="Browse by Caregory"></Button>

        </footer>

    );
};

export default Footer;