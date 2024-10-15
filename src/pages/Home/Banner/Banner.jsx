import Button from "../../../shared/Button";


const Banner = () => {
    return (
        <div className="flex justify-center flex-col text-center mt-10 text-white mb-16">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">The Ultimate Collection of Websites by Category</h1>
            <p>Explore the Best Websites Across All Categories – The Ultimate Collection</p>
            <form className="mt-8 space-x-3">
                <input type="text" placeholder="Enter your email" className="bg-transparent input input-bordered border border-gray-500 w-full max-w-xs hover:bg-[#434346]" />
                <Button text="Subscribe"></Button>
            </form>
        </div>
    );
};

export default Banner;