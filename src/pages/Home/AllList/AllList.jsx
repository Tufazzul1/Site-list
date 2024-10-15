import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllList = () => {

    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setWebsites(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section>
            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {websites.map(website => (
                    <div key={website?.id} className="card bg-[#1E1F21]">
                        <figure className="bg-[#292929]">
                            <img
                                className="w-full pt-4 pl-4"
                                src={website?.image}
                                alt="website-image" />
                        </figure>
                        <div className="p-4 text-white space-y-3">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <img className="w-[50px] rounded-full" src={website.logo} alt="logo" />
                                    </div>
                                    <div>
                                        <h2 className="text-mdl font-semibold">{website?.title}</h2>
                                        <Link className="text-xs">{website?.websiteURL}</Link>
                                    </div>
                                </div>
                                <div>
                                    <img src="/heart.png" alt="heart" />
                                </div>
                            </div>

                            <p className="badge border-none p-3 text-white bg-[#292929]">{website.websiteCategory}</p>
                            <p>{website.shortDescription}</p>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllList;
