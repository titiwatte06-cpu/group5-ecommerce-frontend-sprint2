import { fetchApi } from "../utils/api";

export const getCart = async () => {
    return await fetchApi("/cart");
};

export const addCart = async (productId, quantity = 1) => {
    return await fetchApi("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
    });
};

export const UpdateCart = async (productId, quantity = 1) => {
    return await fetchApi("/cart/items", {
        method: "PUT",
        body: JSON.stringify({ productId, quantity }),
    });
};

export const updateCartItemQty = async (productId, quantity) => {
    return await fetchApi(`/cart/items/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
    });
};

export const removeCartItem = async (productId) => {
    return await fetchApi(`/cart/items/${productId}`, {
        method: "DELETE",
    });
};

export const clearCart = async () => {
    return await fetchApi("/cart", {
        method: "DELETE",
    });
};
