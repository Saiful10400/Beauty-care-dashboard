import { useNavigate, useParams } from "react-router";
import {
    useDeleteAOrderMutation,
    useGetAorderByIdQuery,
    useUpdateAOrderMutation,
} from "../../redux/api";
import type { TorderProduct } from "../../types";

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAorderByIdQuery(id);
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteAOrderMutation();
    const [updateOrder, { isLoading: isUpdating }] = useUpdateAOrderMutation();
    const move = useNavigate()
    const order = data?.data;

    const handleToggleConfirmed = () => {
        if (!order) return;
        updateOrder({ id: order._id, payload: { isConfirmed: !order.isConfirmed } });
    };

    const handleToggleShipped = () => {
        if (!order) return;
        updateOrder({ id: order._id, payload: { isShipped: !order.isShipped } });
    };

    const handleDelete = async () => {
        if (order && confirm("Are you sure you want to delete this order?")) {
            const response = await deleteOrder(order._id);

            if (response?.data?.statusCode === 200) {
                alert("Order deleted")
                move("/order")
            } else {
                alert("Failed to delete order.")
            }
        }
    };

    if (isLoading)
        return <p className="text-white p-4">Loading order details...</p>;

    if (!order)
        return <p className="text-white p-4">Order not found.</p>;

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Order Details</h2>

            <div className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-300">Customer Name</p>
                        <p className="font-semibold">{order.customerName}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Phone Number</p>
                        <a href={`tel:${order.customerPhone}`} className="text-blue-400 underline">
                            {order.customerPhone}
                        </a>
                    </div>
                    <div>
                        <p className="text-gray-300">Address</p>
                        <p>{order.customerAddress}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Payment Method</p>
                        <p>{order.paymentMethod}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Total Amount</p>
                        <p>৳ {order.totalAmount}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Delivery Charge</p>
                        <p>৳ {order.deliveryCharge}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Confirmed</p>
                        <p>{order.isConfirmed ? "✅ Yes" : "❌ No"}</p>
                    </div>
                    <div>
                        <p className="text-gray-300">Shipped</p>
                        <p>{order.isShipped ? "✅ Yes" : "❌ No"}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-300">Order Date</p>
                        <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Products</h3>
                    <div className="space-y-4">
                        {order.products.map((product: TorderProduct) => (
                            <div
                                key={product.productId}
                                className="flex items-center bg-[#3b3f47] border border-gray-600 rounded-md p-3"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-16 w-16 object-cover rounded mr-4"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-300">
                                        Quantity: {product.quantity} | Price: ৳ {product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Free Gift */}
                {order.freeGiftEligible && order.giftProduct?.name && (
                    <div>
                        <h3 className="text-xl font-semibold mt-6 mb-2">Free Gift</h3>
                        <div className="flex items-center bg-[#3b3f47] border border-gray-600 rounded-md p-3">
                            {order.giftProduct.imageUrl && (
                                <img
                                    src={order.giftProduct.imageUrl}
                                    alt={order.giftProduct.name}
                                    className="h-16 w-16 object-cover rounded mr-4"
                                />
                            )}
                            <div>
                                <p className="font-semibold">{order.giftProduct.name}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mt-4">
                    <button
                        onClick={handleToggleConfirmed}
                        disabled={isUpdating}
                        className="w-full cursor-pointer md:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {order.isConfirmed ? "Mark as Unconfirmed" : "Mark as Confirmed"}
                    </button>

                    <button
                        onClick={handleToggleShipped}
                        disabled={isUpdating}
                        className="w-full cursor-pointer md:w-auto bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {order.isShipped ? "Mark as Unshipped" : "Mark as Shipped"}
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full md:w-auto cursor-pointer bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        Delete Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
