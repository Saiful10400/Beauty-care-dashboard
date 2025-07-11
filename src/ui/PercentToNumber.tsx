import { useState, type FormEvent } from "react";


const PercentToNumber = () => {

    const [currentPrice, setCurrentPrice] = useState<number | string>("")
    const [wanttoSell, setWantToSell] = useState<number | string>("")
    const [percentage, setPercentage] = useState<number | string>("")

    const formSubmitHandle = (e: FormEvent) => {
        e.preventDefault()
        if (typeof currentPrice !== "number" || typeof wanttoSell !== "number") return


        const disCountPercentage = ((currentPrice - wanttoSell) / currentPrice) * 100
        setPercentage(disCountPercentage.toFixed(2))


    }



    return (
        <div className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
            <h1 className="text-center font-semibold">Number to Percentage Calculator</h1>
            <form onSubmit={formSubmitHandle} className="mt-4">


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Current Price (number)</label>
                        <input

                            onChange={e => setCurrentPrice(Number(e.target.value) || "")}
                            type="number"
                            value={currentPrice}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Want to Sell (number)</label>
                        <input

                            onChange={e => setWantToSell(Number(e.target.value) || "")}
                            type="number"
                            value={wanttoSell}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        />
                    </div>
                </div>



                <div className="mt-2 mb-4">
                    <label className="block text-sm text-gray-300 mb-1">Percentage (%)</label>
                    <input disabled
                        // onChange={e => setFormData(p => ({ ...p, percentage: Number(e.target.value) }))}
                        type="number"
                        value={percentage}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                    />
                </div>
                <button
                    type="submit"

                    className="w-full cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default PercentToNumber;