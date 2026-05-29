import { fetchApi } from "../utils/api";

export const register = async (userData) => {
    return await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

export const login = async (email, password) => {
    return await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
};

export const logout = async () => {
    return await fetchApi("/auth/logout", {
        method: "POST",
    });
};
