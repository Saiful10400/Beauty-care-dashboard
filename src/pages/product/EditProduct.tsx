import { useEffect, useState } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import generateSlug from "../../utils/generateSlug";
import {
    useGetBrandsQuery,
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,

} from "../../redux/api";
import { useParams } from "react-router";

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
    imageUrls: string[];
    tags: string;
};

export default function EditProduct() {
    const { id } = useParams();
    const { data: productData, isLoading: loadingProduct } = useGetProductByIdQuery(id);
    const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
    const { data: brandsData } = useGetBrandsQuery({ offset: 0, limit: 1000 });
    const { data: categoriesData } = useGetCategoriesQuery({ offset: 0, limit: 1000 });

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        brandId: "",
        categoryId: "",
        price: 0,
        inStock: true,
        imageFiles: [],
        imageUrls: [],
        tags: "",
    });

    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const data = productData?.data;
        if (data) {
            setFormData({
                name: data.name,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,
                brandId: data.brandId._id,
                categoryId: data.categoryIds._id,
                price: data.price,
                inStock: data.inStock,
                imageFiles: [],
                imageUrls: data.images,
                tags: data.tags?.join(", ") || "",
            });
        }
    }, [productData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files?.length) {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, imageFiles: files });
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

    const handleRemoveExistingImage = (index: number) => {
        const updated = [...formData.imageUrls];
        updated.splice(index, 1);
        setFormData({ ...formData, imageUrls: updated });
    };

    const handleRemoveNewImage = (index: number) => {
        const updated = [...formData.imageFiles];
        updated.splice(index, 1);
        setFormData({ ...formData, imageFiles: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage(null);

        let finalImageUrls: (string | null)[] = formData.imageUrls;

        if (formData.imageFiles.length) {
            const uploads = await Promise.all(formData.imageFiles.map(file => uploadToImgbb(file)));
            if (uploads.includes(null)) {
                alert("One or more images failed to upload.");
                setUploading(false);
                return;
            }
            finalImageUrls = [...finalImageUrls, ...uploads];
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
            images: finalImageUrls,
            tags: formData.tags.split(",").map(tag => tag.trim()),
        };

        try {
            await updateProduct({ id, data: payload }).unwrap();
            setSuccessMessage("Product updated successfully!");
        } catch {
            alert("Failed to update product.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Edit Product</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="slug" type="hidden" value={formData.slug} />

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            disabled
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Brand</label>
                        <select
                            name="brandId"
                            value={formData.brandId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        >
                           
                            {brandsData?.data?.result?.map((brand: any) => (
                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Category</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        >
                           
                            {categoriesData?.data?.result?.map((cat: any) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
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

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Short Description</label>
                        <input
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Full Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Upload Images</label>
                        <input
                            type="file"
                            name="imageFiles"
                            accept="image/*"
                            multiple
                            onChange={handleChange}
                            className="w-full file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-800 file:text-white file:font-semibold"
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {formData.imageUrls.map((url, i) => (
                                <div key={`existing-${i}`} className="relative group">
                                    <img src={url} className="h-20 w-auto rounded border" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExistingImage(i)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-[20px] w-[20px] mr-1 cursor-pointer mt-1 text-xs lg:opacity-0 group-hover:opacity-100 transition"
                                    >✕</button>
                                </div>
                            ))}
                            {formData.imageFiles.map((file, i) => (
                                <div key={`new-${i}`} className="relative group">
                                    <img src={URL.createObjectURL(file)} className="h-20 w-auto rounded border" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(i)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-[20px] w-[20px] mr-1 cursor-pointer mt-1 text-xs lg:opacity-0 group-hover:opacity-100 transition"
                                    >✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Tags (comma-separated)</label>
                        <input
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
                        disabled={loadingProduct || updating || uploading}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                    >
                        {(loadingProduct || updating || uploading) ? "Updating..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
