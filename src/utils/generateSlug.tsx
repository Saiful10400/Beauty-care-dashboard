const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special chars
        .replace(/\s+/g, "-")     // Replace spaces with hyphens
        .replace(/--+/g, "-");    // Remove duplicate hyphens
}

export default generateSlug;