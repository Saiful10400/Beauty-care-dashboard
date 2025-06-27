import { useDeleteFreeOfferGiftMutation, useGetGeneralQuery } from "../../../redux/api";
import type { TGeneral } from "../../../types";

export default function FreeGift() {
    const { data, isLoading } = useGetGeneralQuery(null);
    const general: TGeneral = data?.data;
    const [deleteOffer] = useDeleteFreeOfferGiftMutation();

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this offer?");
        if (!confirmDelete) return;

        deleteOffer(null)
            .unwrap()
            .then(() => {
                alert("Offer deleted successfully");
            })
            .catch(() => {
                alert("Failed to delete Offer. Please try again.");
            });
    };

    if (isLoading) return <div className="px-4 py-6 md:px-16">
        <h2 className="text-3xl font-semibold text-white mb-6">Free Gift Offer</h2>

        <p className="text-lg text-white font-normal">Loading...</p>
    </div>
    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Free Gift Offer</h2>

            {general?.freeGift?.applicable ? (
                <div className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <div className="flex items-center gap-4">
                        {/* Image Section */}
                        <img
                            src={general?.freeGift?.product?.images?.[0]}
                            alt={general?.freeGift?.product?.name || "Product Image"}
                            className="w-20 h-20 object-cover rounded-md border border-gray-600"
                        />

                        {/* Product Info */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{general?.freeGift?.product?.name}</h3>
                            <p className="text-sm text-gray-300 mt-1">
                                Shopping Amount ≥ <span className="font-medium">{general.freeGift.buyAbove}tk</span>
                            </p>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-white font-normal">No Free Gift Offer Available.</p>
            )}
        </div>
    );
}
