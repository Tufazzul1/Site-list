import { Link } from "react-router-dom";
import Button from "../Button";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {

        logOut()
            .then(() => {
                console.log('Logged out successfully');
            })
            .catch(error => console.log('Error during logout:', error));
    }


    return (
        <div className="flex justify-between px-4 py-3 md:px-6 md:py-5">
            <Link to={'/'} className="flex items-center gap-2">
                <img src="/Frame 13.png" alt="Logo" />
                <h2 className="hidden md:block text-3xl font-semibold text-white">SiteListMyWebsite</h2>
            </Link>

            <div className="flex gap-3 items-center">

                <Link className="relative" to="/profile">
                    <img  src="/heart.png" alt="favourite-icon" />
                    <span className="font-bold text-white absolute mt-[-60px] ml-[40px]">0</span>
                </Link>

                <Button to={"/submit"} text="Submit Website"></Button>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-md">
                                <img alt="User-avatar" src={user?.photoURL || ""} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content rounded-md mt-3 z-[100] p-2 shadow bg-[#434346] gap-1">
                            <li><Link to={'/profile'} className="btn btn-sm px-4 bg-white text-black hover:bg-[#434346] hover:text-white">Profile</Link></li>
                            <li><Button text="Log Out" onClick={handleLogOut} className='btn-sm w-24'></Button></li>

                        </ul>
                    </div>
                ) : (
                    <Link to={'/signup'} className={"btn-sm md:btn border-none bg-[#434346] hover:bg-[#151518] text-white "}>Sign Up</Link>
                )}

            </div>
        </div >
    );
};

export default Navbar;
