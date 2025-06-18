export const uploadToImgbb = async (file: File): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    console.error("Missing VITE_IMGBB_API_KEY");
    return null;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.success ? data.data.url : null;
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
};
