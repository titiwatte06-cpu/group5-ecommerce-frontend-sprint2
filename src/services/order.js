import { fetchApi } from "../utils/api";

export const createOrder = async (orderData) => {
    return await fetchApi("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });
};

export const getMyOrders = async () => {
    return await fetchApi("/orders");
};

export const getOrderById = async (id) => {
    return await fetchApi(`/orders/${id}`);
};

// Admin Only
export const updateOrderStatus = async (id, status) => {
    return await fetchApi(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
};
