import { fetchApi } from "../utils/api";

export const getCart = async () => {
    return await fetchApi("/carts");
};

export const addCart = async (productId, quantity = 1) => {
    return await fetchApi("/carts", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
    });
};

// quantity=0 → removes item from cart
export const updateCartItem = async (productId, quantity) => {
    return await fetchApi("/carts", {
        method: "PUT",
        body: JSON.stringify({ productId, quantity }),
    });
};

export const clearCart = async () => {
    return await fetchApi("/carts", {
        method: "DELETE",
    });
};
