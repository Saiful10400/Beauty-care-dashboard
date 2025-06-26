import type { TtableData } from "../../../types";
import DashboardTable from "../../../ui/DashboardTable";





const Combo = () => {


    const tableData: TtableData = {
        name: "Combo-offer",
        tittle: "Manage Combo",
        createRoute: "/offer/combo/create",
        keyValue: { Image: "imagesArr", "Combo Name": "name", "Short Description": "shortDescription", "Price (tk)": "price", "Discount Price (tk)": "discountPrice", Edit: "edit" },
        // keyValue: { Logo: "logoUrl", Name: "name",Description: "description","Products status":"isFeatured",Edit:"edit" },

    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Combo;