import { useState } from "react";
import { useCreateBannerMutation, } from "../../redux/api";
import { uploadToImgbb } from "../../utils/uploadToImgbb";

type BannerFormData = {
    title: string;
    imageFile: File | null;
    isActive: boolean;
    type: "offer" | "page";
    asset: string;
};

export default function CreateBanner() {
    const [formData, setFormData] = useState<BannerFormData>({
        title: "",
        imageFile: null,
        isActive: true,
        type: "page",
        asset: "",
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [createBanner, { isLoading }] = useCreateBannerMutation();


    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target;

        if (
            target instanceof HTMLInputElement &&
            target.type === "file" &&
            target.files?.length
        ) {
            const file = target.files[0];
            setFormData((prev) => ({ ...prev, imageFile: file }));
            setPreviewUrl(URL.createObjectURL(file));
        } else if (
            target instanceof HTMLInputElement &&
            target.type === "checkbox"
        ) {
            setFormData((prev) => ({ ...prev, [target.name]: target.checked }));
        } else {
            console.log({ [target.name]: target.value })
            setFormData((prev) => ({ ...prev, [target.name]: target.value }));
        }
    };

    const clearForm = () => {
        setFormData({
            title: "",
            imageFile: null,
            isActive: true,
            type: "page",
            asset: "",
        });
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage(null);

        if (!formData.imageFile) {
            alert("Please upload an image.");
            setUploading(false);
            return;
        }

        const imageUrl = await uploadToImgbb(formData.imageFile);
        if (!imageUrl) {
            alert("Image upload failed. Try again.");
            setUploading(false);
            return;
        }

        const payload = {
            title: formData.title,
            imageUrl,
            isActive: formData.isActive,
            type: formData.type,
            asset: formData.asset,
        };



        try {
            await createBanner(payload).unwrap();
            setSuccessMessage("Banner created successfully!");
            clearForm();
        } catch {
            alert("Failed to create banner. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Create Banner</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">
                            Upload banner <span className="text-gray-400">(Recommended: 1200×400 px)</span>
                        </label>
                        <input
                            required
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            onChange={handleChange}
                            disabled={uploading}
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                        />
                    </div>

                    {/* Image Preview */}
                    {previewUrl && (
                        <div>
                            <p className="text-sm text-gray-300 mb-1">Preview:</p>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-20 w-auto border rounded shadow"
                            />
                        </div>
                    )}

                    {/* Active Checkbox */}
                    <div className="flex items-center space-x-2 md:col-span-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            disabled={uploading}
                            className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 disabled:opacity-50"
                        />
                        <label className="text-sm text-gray-300">Is Active</label>
                    </div>

                    {/* Type Dropdown */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option hidden value="">Select one</option>
                            <option value="offer">Offer</option>
                            <option value="page">Page</option>
                        </select>
                    </div>

                    {/* Conditional Asset Field */}
                    {formData.type === "offer" ? (
                        <div>
                            <label className="block text-sm mb-1 text-gray-300">Select Offer</label>
                            <select
                                name="asset"

                                value={formData.asset}
                                onChange={handleChange}
                                disabled={uploading}
                                className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                <option hidden value="">Select one</option>
                                <option value="combo">Combo</option>
                                <option value="discount">Discount</option>

                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm mb-1 text-gray-300">URL</label>
                            <input
                                type="text"
                                name="asset"
                                value={formData.asset}
                                onChange={handleChange}
                                disabled={uploading}
                                required
                                className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            />
                        </div>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <p className="mt-4 text-green-400 font-semibold">{successMessage}</p>
                )}

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={uploading || isLoading}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {(uploading || isLoading) ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
