import { Outlet } from "react-router-dom";
import AdminNavbar from "../../shared/Navbar/AdminNavbar";

const AdminDashboard = () => {
    return (
        <div className="mx-auto min-h-screen bg-[#151518] px-10 text-white" style={{ backgroundImage: "url('./light_06 1.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <AdminNavbar></AdminNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;