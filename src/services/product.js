import { fetchApi } from "../utils/api";

export const getProducts = async (params = {}) => {
    // กรองเอาเฉพาะข้อมูลที่มีค่าจริงๆ (ตัด undefined, null หรือ ค่าว่าง ทิ้งไป)
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
            (entry) => entry[1] != null && entry[1] !== "",
        ),
    );

    const queryString = new URLSearchParams(cleanParams).toString();
    const endpoint = queryString ? `/products?${queryString}` : "/products";

    return await fetchApi(endpoint);
};

export const getProductById = async (id) => {
    return await fetchApi(`/products/${id}`);
};

export const createProduct = async (productData) => {
    return await fetchApi("/products", {
        method: "POST",
        body: JSON.stringify(productData),
    });
};

export const updateProduct = async (id, productData) => {
    return await fetchApi(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
    });
};

export const deleteProduct = async (id) => {
    return await fetchApi(`/products/${id}`, {
        method: "DELETE",
    });
};
