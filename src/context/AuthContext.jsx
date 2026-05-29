/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { login, logout } from "../services/auth";
import { getMe } from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getMe();
                setUser(userData);
            } catch {
                setUser(null); // not login || cookie expired
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const handleLogin = async (email, password) => {
        await login(email, password);

        const userData = await getMe();
        setUser(userData);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, handleLogin, handleLogout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
