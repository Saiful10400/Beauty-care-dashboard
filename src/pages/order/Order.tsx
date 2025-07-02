import type { TtableData } from "../../types";
import DashboardTable from "../../ui/DashboardTable";



const Order = () => {

    const tableData: TtableData = {
        name: "order",
        tittle: "Manage order",
        createRoute: "/order",
        keyValue: { "Order Date": "createdAt", "Order Amount (tk)": "totalAmount", "Customer Name": "customerName", "Customer Phone": "customerPhone","Confirmation Status":"isConfirmed","Delivery Status":"isShipped" },


    };



    return (
        <div>
            <DashboardTable data={tableData} />
        </div>
    );
};

export default Order;