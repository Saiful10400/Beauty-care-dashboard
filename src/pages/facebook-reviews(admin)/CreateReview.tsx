import { useState } from "react";
import { useCreateFacebookReviewMutation } from "../../redux/api";
import { uploadToImgbb } from "../../utils/uploadToImgbb";

export default function CreateReview() {
  const [formData, setFormData] = useState({
    customerName: "",
    profileImageFile: null as File | null,
    message: "",
    reviewDate: "",
    isVisible: true,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [createReview] = useCreateFacebookReviewMutation();
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement && e.target.files?.length) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);

    let profileImageUrl = "";
    if (formData.profileImageFile) {
      const uploadedUrl = await uploadToImgbb(formData.profileImageFile);
      if (!uploadedUrl) {
        alert("Image upload failed.");
        setSubmitting(false);
        return;
      }
      profileImageUrl = uploadedUrl;
    }

    const payload = {
      customerName: formData.customerName,
      profileImageUrl,
      message: formData.message,
      reviewDate: formData.reviewDate,
      isVisible: formData.isVisible,
    };

    try {
      await createReview(payload).unwrap();

      setSuccessMessage("Review successfully submitted!");
      setFormData({
        customerName: "",
        profileImageFile: null,
        message: "",
        reviewDate: "",
        isVisible: true,
      });
      setPreviewUrl(null);

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit the review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-6 md:px-16">
      <h2 className="text-3xl font-semibold text-white mb-6">Create Facebook Review</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#2f3640] text-white rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Review Date</label>
            <input 
              type="date"
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-300">Message</label>
            <textarea required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-[#3b3f47] border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Profile Image</label>
            <input required
              type="file"
              name="profileImageFile"
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
                alt="Profile Preview"
                className="h-20 w-auto border rounded shadow"
              />
            </div>
          )}

          <div className="flex items-center space-x-2 md:col-span-2">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
              className="h-4 w-4 bg-gray-700 border-gray-600 rounded"
            />
            <label className="text-sm text-gray-300">Visible on Site</label>
          </div>
        </div>

        {successMessage && (
          <p className="mt-4 text-green-400 font-semibold">{successMessage}</p>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block text-white"
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
