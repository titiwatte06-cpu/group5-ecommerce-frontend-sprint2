import { fetchApi } from "../utils/api";

export const getAdminStats = async () => {
    return await fetchApi("/admin/stats");
};

export const getAdminOrders = async () => {
    return await fetchApi("/admin/orders");
};

export const getAllUsers = async () => {
    return await fetchApi("/users");
};
