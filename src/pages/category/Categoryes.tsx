import type { TtableData } from "../../types";
import DashboardTable from "../../ui/DashboardTable";



const Categoryes = () => {


    const tableData: TtableData = {
        name: "category",
        tittle: "Manage Categoryes",
        createRoute: "/category/create",
        keyValue: { Logo: "imageUrl", Name: "name", Description: "description", Edit: "edit" },
        // keyValue: { Logo: "logoUrl", Name: "name",Description: "description","Products status":"isFeatured",Edit:"edit" },

    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Categoryes;