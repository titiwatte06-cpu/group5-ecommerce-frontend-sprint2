import { fetchApi } from "../utils/api";

export const getCategories = async () => {
    return await fetchApi("/categories");
};

// Admin Only
export const createCategory = async (categoryData) => {
    return await fetchApi("/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
    });
};
