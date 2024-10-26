import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Card from "../../components/Card";

const Profile = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);
    const [websites, setWebsites] = useState([]);
    const [favWebsites, setFavWebsites] = useState([]);

    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allWebResponse, favResponse] = await Promise.all([
                    axiosPublic.get(`/personalSites?email=${user?.email}`),
                    axiosPublic.get(`/getFavourite?email=${user?.email}`)
                ]);

                const favWebsitesSet = new Set(favResponse.data.map(website => website._id));

                const allWebsitesWithFavStatus = allWebResponse.data.map(website => ({
                    ...website,
                    isFavorite: favWebsitesSet.has(website._id)
                }));

                setWebsites(allWebsitesWithFavStatus);
                setFavWebsites(favResponse.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic, user]);

    const handleCopy = () => {
        navigator.clipboard.writeText('hellosalehahmed01@gmail.com').then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDelete = async (websiteId) => {
        try {
            const res = await axiosPublic.delete(`/deleteSite/${websiteId}`);
            console.log('Delete successful:', res);
            setWebsites((prevWebsites) => prevWebsites.filter(website => website._id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error);
        }
    };

    const handleDeleteFavourite = async (websiteId) => {
        try {
            const res = await axiosPublic.delete(`/deleteFavourite/${websiteId}`);

            if (res.status === 200) {
                console.log('Delete successful:', res.data.message);

                // Update the state to reflect the removal from favourites
                setWebsites((prevWebsites) =>
                    prevWebsites.map(website => website._id === websiteId ? { ...website, isFavorite: false } : website)
                );
                setFavWebsites((prevFavWebsites) =>
                    prevFavWebsites.filter(favWebsite => favWebsite._id !== websiteId)
                );
            } else {
                console.error('Failed to delete favourite:', res.data.message);
            }
        } catch (error) {
            console.error('Error deleting favourite:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="p-4 text-white">
            <div>
                <h4 className="text-xl font-semibold">Profile</h4>
                <div className="flex items-center gap-3 mt-4">
                    <div>
                        <img className="w-[80px] rounded-lg" src={user.photoURL} alt="user-profile" />
                    </div>
                    <div>
                        <h3 className="text-xl">{user.displayName}</h3>
                        <h3 className="text-xs">{user.email}</h3>
                    </div>
                </div>
                <p className="flex items-center gap-2 mt-4">
                    Contact for Featured :
                    <span className="text-gray-500">hellosalehahmed01@gmail.com</span>
                    <img
                        src="/copy.png"
                        alt="copy"
                        className="cursor-pointer"
                        onClick={handleCopy}
                    />
                </p>
                {copied && <span className="text-green-200 ml-2">Copied!</span>}
            </div>

            <div className="mt-10">
                <h3 className="text-xl mb-5 font-semibold">Submitted by You</h3>
                <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                    {websites.map(website => (
                        <Card
                            key={website?._id}
                            website={website}
                            showHeartIcon={false}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl mb-5 font-semibold">Favourite List</h3>
                <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                    {favWebsites.map(website => (
                        <Card
                            key={website?._id}
                            website={website}
                            favourite={true}
                            showHeartIcon={true}
                            handleDeleteFavourite={handleDeleteFavourite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;

