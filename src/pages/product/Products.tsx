import type { TtableData } from "../../types";
import DashboardTable from "../../ui/DashboardTable";



const Products = () => {


    const tableData: TtableData = {
        name: "product",
        tittle: "Manage Products",
        createRoute: "/product/create",
        keyValue: { Image: "imagesArr", Name: "name", "Short Description": "shortDescription", "Price (Tk)": "price", "Discount Price  (Tk)": "discountPrice", "Ratings  (0-5)": "rating", Edit: "edit" },


    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Products;