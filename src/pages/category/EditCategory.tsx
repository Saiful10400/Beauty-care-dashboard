import { useState, useEffect } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import { useParams } from "react-router";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../redux/api";


type CategoryFormData = {
    name: string;
    slug: string;
    description: string;
    isFeatured: boolean;
    imageFile: File | null;
};

export default function EditCategory() {
    const { id } = useParams();
    const { data: category, isLoading } = useGetCategoryByIdQuery(id);
    const [updateCategory] = useUpdateCategoryMutation();

    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        slug: "",
        description: "",
        isFeatured: false,
        imageFile: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const categoryData = category?.data;
        if (categoryData) {
            setFormData({
                name: categoryData.name,
                slug: categoryData.slug,
                description: categoryData.description,
                isFeatured: categoryData.isFeatured,
                imageFile: null,
            });
            setPreviewUrl(categoryData.imageUrl);
        }
    }, [category]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files?.length) {
            const file = e.target.files[0];
            setFormData({ ...formData, imageFile: file });
            setPreviewUrl(URL.createObjectURL(file));
        } else if (type === "checkbox" && e.target instanceof HTMLInputElement) {
            setFormData({ ...formData, [name]: e.target.checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage(null);

        let imageUrl = previewUrl || "";

        if (formData.imageFile) {
            const uploadedUrl = await uploadToImgbb(formData.imageFile);
            if (!uploadedUrl) {
                alert("Image upload failed.");
                setUploading(false);
                return;
            }
            imageUrl = uploadedUrl;
        }

        const payload = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            isFeatured: formData.isFeatured,
            imageUrl,
        };

        try {
            await updateCategory({ id: category?.data?._id, data: payload }).unwrap();
            setSuccessMessage("Category updated successfully!");
        } catch {
            alert("Failed to update category.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Edit Category</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Category Name</label>
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
                        <label className="block text-sm mb-1 text-gray-300">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
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
                        <label className="block text-sm mb-1 text-gray-300">Image Upload</label>
                        <input
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            onChange={handleChange}
                            disabled={uploading}
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                        />
                    </div>

                    {previewUrl && (
                        <div>
                            <p className="text-sm text-gray-300 mb-1">Current Image:</p>
                            <img
                                src={previewUrl}
                                alt="Preview"
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
                        <label className="text-sm text-gray-300">Featured Category</label>
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
                            "Update Category"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
