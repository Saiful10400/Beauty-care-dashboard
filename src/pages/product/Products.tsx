import type { TtableData } from "../../types";
import DashboardTable from "../../ui/DashboardTable";



const Products = () => {


    const tableData: TtableData = {
        name: "product",
        tittle: "Manage Products",
        createRoute: "/product/create",
        keyValue: { Image: "imagesArr", Name: "name", Description: "shortDescription",Price:"price","Discount Price":"discountPrice", Edit: "edit" },
    

    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Products;