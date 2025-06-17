import { useState } from "react";

type BrandFormData = {
  name: string;
  description: string;
  logoFile: File | null;
  websiteUrl: string;
  isFeatured: boolean;
};

export default function CreateBrand() {
  const [formData, setFormData] = useState<BrandFormData>({
    name: "",
    description: "",
    logoFile: null,
    websiteUrl: "",
    isFeatured: false,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as any;

    if (name === "logoFile" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, logoFile: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("websiteUrl", formData.websiteUrl);
    form.append("isFeatured", String(formData.isFeatured));
    if (formData.logoFile) {
      form.append("logo", formData.logoFile);
    }
    console.log("Submitted:", formData);
  };

  return (
    <div className="p-8 md:pl-16">
      <h2 className="text-3xl font-semibold text-white mb-6">Create Brand</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 max-w-4xl"
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
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Logo Upload</label>
            <input
              type="file"
              name="logoFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {previewUrl && (
            <div>
              <p className="text-sm text-gray-300 mb-1">Preview:</p>
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
              className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
            />
            <label className="text-sm text-gray-300">Featured Brand</label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
