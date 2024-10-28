import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import PendingCard from "./PendingCard";

const Pending = () => {
    const [websites, setWebsites] = useState([]);
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/pending-sites`);
                setWebsites(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic]);


    const approveWebsite = async (id) => {
        try {
            // Call the backend to approve the site
            await axiosPublic.post(`/approve/${id}`);
            // Filter out the approved site from the state
            setWebsites((prevWebsites) => prevWebsites.filter((site) => site._id !== id));
            console.log("Site approved and moved to AllWebsites collection.");
        } catch (error) {
            console.error("Error approving site:", error);
        }
    };

    const handleDelete = async (websiteId) => {
        try {
            const res = await axiosPublic.delete(`/deletePendingSite/${websiteId}`);
            console.log('Delete successful:', res);
            setWebsites((prevWebsites) => prevWebsites.filter(website => website._id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error);
        }
    };

    return (
        <section>
            <h3 className="font-semibold text-xl mb-5">Pending websites</h3>

            <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-5">
                {websites.map((website) => (
                    <PendingCard
                        key={website?._id}
                        website={website}
                        onApprove={approveWebsite}
                        handleDelete={handleDelete}
                        className="card bg-[#1E1F21]"
                    />
                ))}
            </div>
        </section>
    );
};

export default Pending;
