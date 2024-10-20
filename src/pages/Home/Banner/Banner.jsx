import { useState } from "react";
import Button from "../../../shared/Button";
import useAxios from "../../../hooks/useAxios";

const Banner = () => {
    const [email, setEmail] = useState("");
    const axiosPublic = useAxios();

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPublic.post("/subscribe", {
                email,
            });

            if (response.status === 200) {
                console.log("Subscription successful");
                setEmail("")
            } else {
                console.error("Subscription failed");
            }
        } catch (error) {
            console.error("Error sending data to backend:", error);
        }
    };

    return (
        <div className="flex justify-center flex-col text-center mt-10 text-white mb-16">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">
                The Ultimate Collection of Websites by Category
            </h1>
            <p>Explore the Best Websites Across All Categories – The Ultimate Collection</p>
            <form onSubmit={formSubmit} className="mt-8 space-x-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="bg-transparent input input-bordered border border-gray-500 w-full max-w-xs hover:bg-[#434346]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" text="Subscribe"></Button>
            </form>
        </div>
    );
};

export default Banner;
