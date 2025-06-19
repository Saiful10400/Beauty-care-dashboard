import { useEffect, useState } from "react";
import { useGetBannerQuery, useUpdateBannerMutation } from "../../redux/api"; // Adjust your hooks import

export default function BannerManage() {
    const { data: banners, isLoading, isError } = useGetBannerQuery(null);
    const [updateBanner, { isLoading: updating }] = useUpdateBannerMutation();

    const [localBanners, setLocalBanners] = useState(banners ?? []);

    // Sync local state when banners from API change
    useEffect(() => {
        if (banners) setLocalBanners(banners?.data);
    }, [banners]);

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await updateBanner({ id, data: { isActive: !currentStatus } }).unwrap();
            setLocalBanners((prev) =>
                prev.map((banner) =>
                    banner._id === id ? { ...banner, isActive: !currentStatus } : banner
                )
            );
        } catch {
            alert("Failed to update banner status.");
        }
    };

    if (isLoading) {
        return <p className="text-white p-4">Loading banners...</p>;
    }

    if (isError) {
        return <p className="text-red-500 p-4">Failed to load banners.</p>;
    }

    if (!localBanners.length) {
        return <p className="text-gray-400 p-4">No banners found.</p>;
    }

    return (
        <div className="p-6 md:p-12">
            <h1 className="text-3xl font-bold text-white mb-8">Manage Banners</h1>

            <div className="space-y-6">
                {localBanners.map((banner) => (
                    <div
                        key={banner._id}
                        className="bg-[#2f3640] rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
                    >
                        {/* Image Preview */}
                        <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-40 h-20 object-cover rounded-md flex-shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1 text-white space-y-1">
                            <h2 className="text-xl font-semibold">{banner.title}</h2>
                            <p className="text-gray-300">
                                <span className="font-semibold">Type:</span> {banner.type}
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold">{banner.type==="offer"?"Offer":"Url"}:</span> {banner.asset}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Created: {new Date(banner.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                disabled={updating}
                                onClick={() => toggleActive(banner._id, banner.isActive)}
                                className={`px-4 py-2 rounded-md font-semibold transition ${banner.isActive
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-600 hover:bg-red-700"
                                    } disabled:opacity-50`}
                            >
                                {banner.isActive ? "Active" : "Inactive"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
