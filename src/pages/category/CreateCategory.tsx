import { useState } from "react";
import { uploadToImgbb } from "../../utils/uploadToImgbb";
import { useCreateCategoryMutation } from "../../redux/api";
import generateSlug from "../../utils/generateSlug";

type CategoryFormData = {
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  imageFile: File | null;
};

export default function CreateCategory() {
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
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

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

  const clearForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      isFeatured: false,
      imageFile: null,
    });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMessage(null);

    let imageUrl = "";

    if (formData.imageFile) {
      const uploaded = await uploadToImgbb(formData.imageFile);
      if (!uploaded) {
        alert("Image upload failed");
        setUploading(false);
        return;
      }
      imageUrl = uploaded;
    }

    const payload = {
      name: formData.name,
      slug: generateSlug(formData.name),
      description: formData.description,
      isFeatured: formData.isFeatured,
      imageUrl,
    };

    try {
      await createCategory(payload).unwrap();
      setSuccessMessage("Category created successfully!");
      clearForm();
    } catch {
      alert("Failed to create category.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 py-6 md:px-16">
      <h2 className="text-3xl font-semibold text-white mb-6">Create Category</h2>
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
              className="w-full bg-[#3b3f47] border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Slug</label>
            <input
              type="text"
              name="slug"
              value={generateSlug(formData.name)}
              required
              disabled={true}
              className="w-full bg-[#3b3f47] border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
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
              className="w-full bg-[#3b3f47] border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Image</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              disabled={uploading}
              className="w-full bg-[#3b3f47] border border-gray-600 rounded-md text-sm text-white file:bg-blue-700 file:text-white file:px-3 file:py-1 file:border-none file:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          {previewUrl && (
            <div>
              <p className="text-sm text-gray-300 mb-1">Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-auto border border-gray-500 rounded shadow"
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
              className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 disabled:opacity-50"
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
            {(isLoading || uploading) ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
