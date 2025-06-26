import { useState, useEffect } from "react";
import { useCreateComboOfferMutation, useGetProductQuery } from "../../../redux/api";
import { MultiSelect, type MultiSelectChangeEvent } from "primereact/multiselect";
import type { TProduct } from "../../../types";
import { Editor, type EditorTextChangeEvent } from "primereact/editor";
import { uploadToImgbb } from "../../../utils/uploadToImgbb";
import generateSlug from "../../../utils/generateSlug";




export default function CreateCombo() {
    const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([])
    const [formData, setFormData] = useState<{ imageFiles: File[], selectedProductIds: string[], images: string[], inStock: boolean, discountPrice: number, categoryIds: string[], price: number, brandsId: string[], name: string, slug: string, description: string, shortDescription: string }>({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        brandsId: [],
        categoryIds: [],
        price: 0,
        discountPrice: 0,
        inStock: true,
        images: [],
        selectedProductIds: [],
        imageFiles: []

    });
    useEffect(() => {
        if (selectedProduct.length === 0) return
        setFormData(p => ({
            ...p,
            name: selectedProduct.length === 0 ? "" : `${selectedProduct.map(item => item.name).join('+')} - ${selectedProduct.length} in 1 combo.`,
            slug: `${selectedProduct.map(item => item.slug).join('+')} - ${selectedProduct.length} in 1 combo`,
            description: `${selectedProduct.map(item => item.description).join('')}`,
            price: selectedProduct.map(item => item.price).reduce((sum, current) => sum + current, 0),
            brandsId: selectedProduct.map(item => item.brandId._id),
            categoryIds: selectedProduct.map(item => item.categoryIds._id),
        }))
    }, [selectedProduct])

    const [createComboOffer, { isLoading }] = useCreateComboOfferMutation();
    const { data: products = [] } = useGetProductQuery({ offset: 0, limit: 2000 });
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [previewUrl, setPreviewUrls] = useState<string[] | null>(null);


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
            // if (name === "name") {
            //     updatedFormData.slug = generateSlug(value);
            // }


            setFormData(updatedFormData);
        }

    };
    const clearForm = () => {
        setFormData({
            name: "",
            slug: "",
            description: "",
            shortDescription: "",
            brandsId: [],
            categoryIds: [],
            price: 0,
            discountPrice: 0,
            inStock: true,
            images: [],
            selectedProductIds: [],
            imageFiles: []
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
            slug: generateSlug(formData.slug),
            description: formData.description,
            shortDescription: formData.shortDescription,
            brandsId: formData.brandsId,
            categoryIds: formData.categoryIds,
            price: formData.price,
            discountPrice: formData.discountPrice,
            inStock: formData.inStock,
            images: imageUrls,
        };
        console.log(payload)


        try {
            await createComboOffer(payload).unwrap();
            setSuccessMessage("Product created successfully!");
            clearForm();
        } catch {
            alert("Failed to create product.");
        } finally {
            setUploading(false);
        }
    };


    // onselect product.
    const productSelectHandle = (e: MultiSelectChangeEvent) => {
        setSelectedProduct(e.value)
        console.log(e.value)
    }

    //
    const hadleTextEditor = (e: EditorTextChangeEvent) => {
        setFormData(p => ({ ...p, description: e.htmlValue || "" }))

    }

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Create Combo Offer</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-4xl"
            >
                <div className="space-y-4">
                    <div  >
                        <label className="block text-sm text-gray-300 mb-1">Select Products</label>


                        <MultiSelect value={selectedProduct} onChange={productSelectHandle} options={products?.data?.result} optionLabel="name"
                            filter placeholder="Select Products" maxSelectedLabels={3} className="w-full text-black md:w-20rem bg-gray-400" />


                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Combo Name</label>
                        <input
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            type="text"
                            value={formData.name}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Short Description</label>
                        <input
                            type="text"
                            value={formData.shortDescription}
                            onChange={e => setFormData(p => ({ ...p, shortDescription: e.target.value }))}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Full Description</label>


                        <div className="bg-gray-500"><Editor value={formData.description} onTextChange={hadleTextEditor} style={{ height: '320px' }} /></div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Total Price</label>
                            <input
                                type="number"
                                value={formData.price}
                                disabled
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Discount Price</label>
                            <input
                                type="number"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                            />
                        </div>
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
                        <label className="block text-sm text-gray-300 mb-1">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            required
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700"
                        />
                    </div>

                    {/* Image Preview */}
                    {previewUrl && (
                        <div>
                            <p className="text-sm text-gray-300 mb-1">Preview:</p>
                            {previewUrl?.map(item => <img
                                src={item}
                                alt="Preview"
                                className="h-20 w-auto border rounded shadow"
                            />)}
                        </div>
                    )}

                    {successMessage && <p className="text-green-400 font-semibold">{successMessage}</p>}

                    <button
                        type="submit"
                        disabled={isLoading || uploading}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        {(isLoading || uploading) ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
