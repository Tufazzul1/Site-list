import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="mx-auto max-w-[1920px] min-h-screen bg-[#151518] px-10" style={{ backgroundImage: "url('./light_06 1.png')", backgroundRepeat : "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;

