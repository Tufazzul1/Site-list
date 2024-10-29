import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Profile/Profile";
import SubmitPage from "../pages/Submit/SubmitPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import SubCategory from "../pages/SubCategory/SubCategory";
import PrivateRoute from "./PrivateRoute";
import UpdateWebsite from "../pages/UpdateWebsite/UpdateWebsite";
import AdminDashboard from "../layout/AdminDashboard/AdminDashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AllWebsite from "../pages/Dashboard/AllWebsite";
import AllLead from "../pages/Dashboard/AllLead";
import AdminRoutes from "./AdminRoute";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/submit",
                element: <PrivateRoute><SubmitPage></SubmitPage></PrivateRoute>
            },
            {
                path: "/update/:id",
                element: <PrivateRoute><UpdateWebsite></UpdateWebsite></PrivateRoute>
            },
            {
                path: "/category",
                element: <PrivateRoute><CategoryPage></CategoryPage></PrivateRoute>
            },
            {
                path: "/subCategory",
                element: <SubCategory></SubCategory>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
        ]
    },
    {
        path: "dashboard",
        element: <AdminRoutes><AdminDashboard></AdminDashboard></AdminRoutes>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <AdminRoutes><DashboardHome></DashboardHome></AdminRoutes>
            },
            {
                path: 'all-website',
                element: <AdminRoutes><AllWebsite></AllWebsite></AdminRoutes>
            },
            {
                path: 'all-lead',
                element: <AdminRoutes><AllLead></AllLead></AdminRoutes>
            },
        ]
    }
]);