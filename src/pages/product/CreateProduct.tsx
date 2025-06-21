import { useState } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import { useCreateProductMutation, useGetBrandsQuery, useGetCategoriesQuery } from "../../redux/api";
import generateSlug from "../../utils/generateSlug";
import { Editor, type EditorTextChangeEvent } from "primereact/editor";

type ProductFormData = {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    brandId: string;
    categoryId: string;
    price: number;
    inStock: boolean;
    imageFiles: File[];
    tags: string;
    gender: "male" | "female" | "";
};

export default function CreateProduct() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        brandId: "",
        categoryId: "",
        price: 0,
        inStock: false,
        imageFiles: [],
        tags: "",
        gender: "",
    });

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const { data: brandData } = useGetBrandsQuery({ offset: 0, limit: 1000 });
    const { data: categoryData } = useGetCategoriesQuery({ offset: 0, limit: 1000 });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {

        const { name, value, type } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files?.length) {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, imageFiles: files });
            setPreviewUrls(files.map(file => URL.createObjectURL(file)));
        } else if (type === "checkbox" && e.target instanceof HTMLInputElement) {
            setFormData({ ...formData, [name]: e.target.checked });
        } else {
            const updatedFormData = { ...formData, [name]: value };
            if (name === "name") {
                updatedFormData.slug = generateSlug(value);
            }


            setFormData(updatedFormData);
        }

    };

    // handle text editor.
    const hadleTextEditor = (e: EditorTextChangeEvent) => {
        setFormData({ ...formData, description: e.htmlValue || "" })
    }

    const clearForm = () => {
        setFormData({
            name: "",
            slug: "",
            description: "",
            shortDescription: "",
            brandId: "",
            categoryId: "",
            price: 0,
            inStock: true,
            imageFiles: [],
            tags: "",
            gender: "male",
        });
        setPreviewUrls([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage(null);

        const imageUploadPromises = formData.imageFiles.map(file => uploadToImgbb(file));
        const imageUrls = await Promise.all(imageUploadPromises);

        if (imageUrls.includes(null)) {
            alert("One or more images failed to upload.");
            setUploading(false);
            return;
        }

        const payload = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            shortDescription: formData.shortDescription,
            brandId: formData.brandId,
            categoryIds: [formData.categoryId],
            price: Number(formData.price),
            inStock: formData.inStock,
            images: imageUrls,
            tags: formData.tags.split(",").map(tag => tag.trim()),
            gender: formData.gender,
        };

        try {
            await createProduct(payload).unwrap();
            setSuccessMessage("Product created successfully!");
            clearForm();
        } catch {
            alert("Failed to create product.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Create Product</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            disabled
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md opacity-50 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Brand</label>
                        <select
                            name="brandId"
                            value={formData.brandId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        >
                            <option value="">Select Brand</option>
                            {brandData?.data?.result?.map((brand: any) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Category</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        >
                            <option value="">Select Category</option>
                            {categoryData?.data?.result?.map((category: any) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Price (bdt)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                            className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
                        />
                        <label className="text-sm text-gray-300">In Stock</label>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Short Description</label>
                        <input
                            type="text"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2 ">
                        <label className="block text-sm mb-1 text-gray-300">Full Description</label>
                        <div className="bg-gray-500"><Editor value={formData.description} onTextChange={hadleTextEditor} style={{ height: '320px' }} /></div>
                    </div>




                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Product Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700"
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {previewUrls.map((url, index) => (
                                <img key={index} src={url} className="h-20 w-auto rounded border" />
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g. shoes, nike, airmax"
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
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
