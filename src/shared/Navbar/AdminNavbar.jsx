import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button";
import useAuth from "../../hooks/useAuth";

const AdminNavbar = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch(error => console.log("Error during logout:", error));
    };

    return (
        <div className="navbar text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={location.pathname === "/dashboard" ? "font-bold border-b" : ""}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/all-website"
                                className={location.pathname.includes("/dashboard/all-website") ? "font-bold border-b" : ""}
                            >
                                All Website
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/all-lead"
                                className={location.pathname.includes("/dashboard/all-lead") ? "font-bold border-b" : ""}
                            >
                                All Lead
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <NavLink to="/" className="flex items-center gap-2">
                    <img src="/Frame 13.png" alt="Logo" />
                    <h2 className="hidden md:block text-3xl font-semibold text-white">SiteListMyWebsite</h2>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-4">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={location.pathname === "/dashboard" ? "font-bold border-b" : ""}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/all-website"
                            className={location.pathname.includes("/dashboard/all-website") ? "font-bold border-b" : ""}
                        >
                            All Website
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/all-lead"
                            className={location.pathname.includes("/dashboard/all-lead") ? "font-bold border-b" : ""}
                        >
                            All Lead
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <Button to="/submit" text="Submit Website" />

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-md">
                                <img alt="User-avatar" src={user?.photoURL || ""} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-md mt-3 z-[100] p-2 shadow bg-[#434346] gap-1"
                        >
                            <li>
                                <NavLink
                                    to="/profile"
                                    className="btn btn-sm px-4 bg-white text-black hover:bg-[#434346] hover:border-none hover:text-white"
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <Button
                                    text="Log Out"
                                    onClick={handleLogOut}
                                    className="btn-sm w-24"
                                />
                            </li>
                        </ul>
                    </div>
                ) : (
                    <NavLink
                        to="/signup"
                        className="btn-sm md:btn border-none bg-[#434346] hover:bg-[#151518] text-white"
                    >
                        Sign Up
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default AdminNavbar;
