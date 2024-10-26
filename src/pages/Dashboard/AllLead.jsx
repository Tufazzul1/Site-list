import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FiCopy } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import * as XLSX from 'xlsx';

const AllLead = () => {
    const [users, setUsers] = useState([]);
    const axiosPublic = useAxios();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/users`);
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosPublic]);

    const handleDeleteUser = (user) => {
        axiosPublic.delete(`/users/${user._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    console.log(res.data);
                }
            });
    };

    const handleCopy = (email) => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(email);
            setTimeout(() => setCopied(null), 2000);
        });
    };


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users"); 
        XLSX.writeFile(workbook, "UsersData.xlsx");
    };

    return (
        <section className="my-10">

            <div className="flex justify-between">
                <h2 className="text-xl font-semibold">All Lead</h2>
                <button onClick={exportToExcel} className="text-md font-bold">Export</button>
            </div>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table">
                    <thead className="text-white rounded-t-xl">
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Join Date & Time</th>
                            <th>Job Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} alt={user?.name} />
                                            </div>
                                        </div>
                                        <h3>{user?.name}</h3>
                                    </div>
                                </td>
                                <td>{user?.email}</td>
                                <td>{new Date(user?.date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'UTC'
                                })}</td>
                                <td>{user?.role}</td>
                                <td>
                                    <button className="flex gap-2 items-center relative" onClick={() => handleDeleteUser(user)}>
                                        <FiCopy onClick={() => handleCopy(user.email)} />
                                        <FaTrashAlt />
                                        {copied === user.email && <span className="text-gray-200 mb-10 absolute">Copied!</span>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllLead;
