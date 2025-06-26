import { useState } from "react";
import {
    useDeleteFacebookReviewMutation,
    useGetFacebookReviewsQuery,

} from "../../redux/api";
import { format } from "date-fns";

export default function Review() {
    const { data, isLoading, refetch } = useGetFacebookReviewsQuery(null);
    const [deleteReview] = useDeleteFacebookReviewMutation();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this review?");
        if (!confirm) return;

        try {
            setDeletingId(id);
            await deleteReview({ id }).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to delete review", error);
            alert("Error deleting review.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Manage Facebook Reviews</h2>

            {isLoading ? (
                <p className="text-white">Loading reviews...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data?.data?.map((review: { _id: string, profileImageUrl: string, customerName: string, reviewDate: string, isVisible: boolean, message: string }) => (
                        <div
                            key={review._id}
                            className="bg-[#2f3640] text-white rounded-lg shadow p-4 flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={review.profileImageUrl || "/placeholder.jpg"}
                                    alt={review.customerName}
                                    className="h-12 w-12 rounded-full border object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{review.customerName}</h3>
                                    <p className="text-sm text-gray-400">
                                        {format(new Date(review.reviewDate), "PPP")}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-200">{review.message}</p>

                            <div className="flex justify-between items-center mt-2">
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded ${review.isVisible
                                        ? "bg-green-700 text-green-100"
                                        : "bg-gray-600 text-gray-300"
                                        }`}
                                >
                                    {review.isVisible ? "Visible" : "Hidden"}
                                </span>

                                <button
                                    onClick={() => handleDelete(review._id)}
                                    disabled={deletingId === review._id}
                                    className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
                                >
                                    {deletingId === review._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
