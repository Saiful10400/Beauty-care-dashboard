import { useState } from "react";
import { useCreatePercentageOfferMutation, useGetProductQuery } from "../../../redux/api";
import { MultiSelect, type MultiSelectChangeEvent } from "primereact/multiselect";
import type { TProduct } from "../../../types";
import PercentToNumber from "../../../ui/PercentToNumber";







export default function CreateDiscount() {

    const [formData, setFormData] = useState<{ percentage: number | string, products: TProduct[] }>({
        percentage: "",
        products: []

    });


    const [createPercentageOffer, { isLoading }] = useCreatePercentageOfferMutation();
    const { data: products = [] } = useGetProductQuery({ offset: 0, limit: 2000 });
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);




    const clearForm = () => {
        setFormData({
            percentage: "",
            products: []
        });

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.percentage === 0) {
            alert("You can't set 0% offer.");
            return
        }
        setUploading(true);
        setSuccessMessage(null);



        const payload = {
            percentage: formData.percentage,
            products: formData.products.map(item => item._id)
        };




        try {
            await createPercentageOffer(payload).unwrap();
            setSuccessMessage("percentage offer created successfully!");
            clearForm();
        } catch {
            alert("Failed to create percentage offer.");
        } finally {
            setUploading(false);
        }
    };


    // onselect product.
    const productSelectHandle = (e: MultiSelectChangeEvent) => {
        setFormData(p => ({ ...p, products: e.value }))

    }



    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Create Discount Offer</h2>
            <div className="flex lg:flex-row flex-col gap-5">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-4xl"
                >
                    <div className="space-y-4">
                        <div  >
                            <label className="block text-sm text-gray-300 mb-1">Select Products</label>


                            <MultiSelect value={formData.products} onChange={productSelectHandle} options={products?.data?.result} optionLabel="name"
                                filter placeholder="Select Products" maxSelectedLabels={3} className="w-full text-black md:w-20rem bg-gray-400" />


                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Discount Percentage (%)</label>
                            <input
                                onChange={e => setFormData(p => ({ ...p, percentage: Number(e.target.value) }))}
                                type="number"
                                value={formData.percentage}
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
                <PercentToNumber />
            </div>
        </div>
    );
}
