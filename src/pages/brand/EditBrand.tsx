import { useState, useEffect } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import { useGetBrandByIdQuery, useUpdateBrandMutation } from "../../redux/api";
import { useParams } from "react-router";

type BrandFormData = {
    name: string;
    description: string;
    logoFile: File | null;
    websiteUrl: string;
    isFeatured: boolean;
};



export default function EditBrand() {

    const { id } = useParams();

    const { data: brand, isLoading } = useGetBrandByIdQuery(id);
    const [updateBrand] = useUpdateBrandMutation();


    const [formData, setFormData] = useState<BrandFormData>({
        name: "",
        description: "",
        logoFile: null,
        websiteUrl: "",
        isFeatured: false,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    useEffect(() => {
        const brandData = brand?.data
        if (brandData) {
            setFormData({
                name: brandData.name,
                description: brandData.description,
                logoFile: null,
                websiteUrl: brandData.websiteUrl,
                isFeatured: brandData.isFeatured,
            });
            setPreviewUrl(brandData.logoUrl);
        }
    }, [brand]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;

        const { name, value, type } = target;

        if (type === "file" && target instanceof HTMLInputElement && target.files?.length) {
            const file = target.files[0];
            setFormData({ ...formData, logoFile: file });
            setPreviewUrl(URL.createObjectURL(file));
        } else if (type === "checkbox" && target instanceof HTMLInputElement) {
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setUploading(true);
        setSuccessMessage(null);

        let logoUrl = previewUrl || "";

        if (formData.logoFile) {
            const uploadedUrl = await uploadToImgbb(formData.logoFile);
            if (!uploadedUrl) {
                alert("Image upload failed.");
                setUploading(false);
                return;
            }
            logoUrl = uploadedUrl;
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            websiteUrl: formData.websiteUrl,
            isFeatured: formData.isFeatured,
            logoUrl,
        };

        try {
            await updateBrand({ id: brand?.data?._id, data: payload }).unwrap();
            setSuccessMessage("Brand updated successfully!");
        } catch {
            alert("Failed to update brand.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Edit Brand</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Brand Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Website URL</label>
                        <input
                            type="url"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            required
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Logo Upload</label>
                        <input
                            type="file"
                            name="logoFile"
                            accept="image/*"
                            onChange={handleChange}
                            disabled={uploading}
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                        />
                    </div>

                    {previewUrl && (
                        <div>
                            <p className="text-sm text-gray-300 mb-1">Current Logo:</p>
                            <img
                                src={previewUrl}
                                alt="Logo Preview"
                                className="h-20 w-auto border rounded shadow"
                            />
                        </div>
                    )}

                    <div className="flex items-center space-x-2 md:col-span-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            disabled={uploading}
                            className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 disabled:opacity-50"
                        />
                        <label className="text-sm text-gray-300">Featured Brand</label>
                    </div>
                </div>

                {successMessage && (
                    <p className="mt-4 text-green-400 font-semibold">{successMessage}</p>
                )}

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isLoading || uploading}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {(isLoading || uploading) ? (
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
                                Updating...
                            </>
                        ) : (
                            "Update Brand"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
