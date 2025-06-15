import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import Root from "../pages/Root";
import Brands from "../pages/brand/Brands";
import CreateBrand from "../pages/brand/CreateBrand";
import Categoryes from "../pages/category/Categoryes";
import CreateCategory from "../pages/category/CreateCategory";
import Products from "../pages/product/Products";
import CreateProduct from "../pages/product/CreateProduct";
import General from "../pages/general/General";

const routes = createBrowserRouter([
    {
        path: "/", element: <Root />, children: [
            { index: true, element: <Home /> },
            {
                path: "brand", children: [
                    { index: true, element: <Brands /> },
                    { path: "create", element: <CreateBrand /> },
                ]
            },
            {
                path: "category", children: [
                    { index: true, element: <Categoryes /> },
                    { path: "create", element: <CreateCategory /> },
                ]
            },
            {
                path: "product", children: [
                    { index: true, element: <Products /> },
                    { path: "create", element: <CreateProduct /> },
                ]
            },
            {
                path: "settings", children: [
                    { path: "general", element: <General /> },
                ]
            },
        ]
    },
]);

export default routes;