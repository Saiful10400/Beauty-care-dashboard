import type { TtableData } from "../../types";
import DashboardTable from "../../ui/DashboardTable";



const Brands = () => {


    const tableData: TtableData = {
        name: "brand",
        tittle: "Manage Brands",
        createRoute: "/brand/create",
        keyValue: { Logo: "logoUrl", Name: "name", Description: "description", Edit: "edit" },
        // keyValue: { Logo: "logoUrl", Name: "name",Description: "description","Products status":"isFeatured",Edit:"edit" },

    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Brands;