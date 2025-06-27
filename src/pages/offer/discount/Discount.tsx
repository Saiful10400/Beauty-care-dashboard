import type { TtableData } from "../../../types";
import DashboardTable from "../../../ui/DashboardTable";





const Discount = () => {


    const tableData: TtableData = {
        name: "percentageOfferProducts",
        tittle: "Manage Percentage Offer",
        createRoute: "/offer/discount/create",
        keyValue: { Image: "imagesArr", Name: "name", "Short-Description": "shortDescription", Price: "price", "Discount Price": "discountPrice", "Discount Amount": "discountAmount", Edit: "edit" },
  

    };


    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Discount;