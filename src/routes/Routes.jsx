import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Profile/Profile";
import SubmitPage from "../pages/Submit/SubmitPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import SubCategory from "../pages/SubCategory/SubCategory";



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
                element: <SubmitPage></SubmitPage>
            },
            {
                path: "/category",
                element: <CategoryPage></CategoryPage>
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
                element: <Profile></Profile>
            },
        ]
    },
]);