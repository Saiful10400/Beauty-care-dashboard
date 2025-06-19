import { useEffect, useState } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import { useGetGeneralQuery, useUpdateGeneralMutation } from "../../redux/api";


export default function General() {
    const { data: generalData } = useGetGeneralQuery(null);
    const [updateGeneral, { isLoading: updating }] = useUpdateGeneralMutation();

    const [formData, setFormData] = useState({
        siteName: "",
        logoFile: null as File | null,
        logoUrl: "",
        contactEmail: "",
        phone: "",
        address: "",
        aboutUs: "",
        facebook: "",
        instagram: "",
    });

    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const data = generalData?.data;
        if (data) {
            setFormData({
                siteName: data.siteName || "",
                logoFile: null,
                logoUrl: data.logoUrl || "",
                contactEmail: data.contactEmail || "",
                phone: data.phone || "",
                address: data.address || "",
                aboutUs: data.aboutUs || "",
                facebook: data.socialLinks?.facebook || "",
                instagram: data.socialLinks?.instagram || "",
            });
        }
    }, [generalData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files?.length) {
            setFormData({ ...formData, logoFile: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage(null);

        let finalLogoUrl = formData.logoUrl;
        if (formData.logoFile) {
            const uploaded = await uploadToImgbb(formData.logoFile);
            if (!uploaded) {
                alert("Logo upload failed.");
                setUploading(false);
                return;
            }
            finalLogoUrl = uploaded;
        }
 
        const payload = {
            siteName: formData.siteName,
            logoUrl: finalLogoUrl,
            contactEmail: formData.contactEmail,
            phone: formData.phone,
            address: formData.address,
            aboutUs: formData.aboutUs,
            socialLinks: {
                facebook: formData.facebook,
                instagram: formData.instagram,
            },
        };

        try {
            await updateGeneral(payload).unwrap();
            setSuccessMessage("General settings updated successfully.");
        } catch {
            alert("Update failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 py-6 md:px-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Update Site Settings</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Site Name</label>
                        <input
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Contact Email</label>
                        <input
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">About Us</label>
                        <textarea
                            name="aboutUs"
                            value={formData.aboutUs}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Facebook</label>
                        <input
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-300">Instagram</label>
                        <input
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1 text-gray-300">Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700"
                        />
                        {formData.logoUrl && (
                            <img src={formData.logoUrl} alt="Logo" className="mt-2 h-16 w-auto rounded" />
                        )}
                    </div>
                </div>

                {successMessage && <p className="mt-4 text-green-400">{successMessage}</p>}

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={uploading || updating}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                    >
                        {(uploading || updating) ? "Updating..." : "Update Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
