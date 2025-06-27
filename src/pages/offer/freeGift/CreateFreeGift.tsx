import { useState } from "react";
import { useCreteFreeOfferGiftMutation, useGetProductQuery } from "../../../redux/api";
import { type MultiSelectChangeEvent } from "primereact/multiselect";
import type { TProduct } from "../../../types";
import { Dropdown } from "primereact/dropdown";







export default function CreateFreeGift() {

    const [formData, setFormData] = useState<{
        product?: TProduct;
        buyAbove: number | string;
        applicable?: boolean;
    }>({
        buyAbove: "",
    });


    const [createFreeOfferGift, { isLoading }] = useCreteFreeOfferGiftMutation();
    const { data: products = [] } = useGetProductQuery({ offset: 0, limit: 2000 });
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);




    const clearForm = () => {
        setFormData({
            buyAbove: "",
        });

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.buyAbove === 0) {
            alert("You can't set 0tk range for free gift.");
            return
        }
        setUploading(true);
        setSuccessMessage(null);



        const payload = {

            product: formData.product?._id,
            buyAbove: formData.buyAbove,
            applicable: true
        };




        try {
            await createFreeOfferGift(payload).unwrap();
            setSuccessMessage("Free Gift Offer created successfully!");
            clearForm();
        } catch {
            alert("Failed to create Free Gift Offer.");
        } finally {
            setUploading(false);
        }
    };


    // onselect product.
    const productSelectHandle = (e: MultiSelectChangeEvent) => {

        setFormData(p => ({ ...p, product: e.value }))

    }



    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Create Free Gift Offer</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-4xl"
            >
                <div className="space-y-4">
                    <div  >
                        <label className="block text-sm text-gray-300 mb-1">Select Products</label>



                        <Dropdown value={formData.product} onChange={productSelectHandle} options={products?.data?.result} optionLabel="name" placeholder="Select Product"
                            filter className="w-full text-black md:w-20rem bg-gray-400" />


                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">{"Shoping Amount (>=tk)"}</label>
                        <input
                            onChange={e => setFormData(p => ({ ...p, buyAbove: Number(e.target.value) }))}
                            type="number"
                            value={formData.buyAbove}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                    </div>





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
