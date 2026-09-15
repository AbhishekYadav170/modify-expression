import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    async function handleRegister({ username, email, password }) {
        try {
            setLoading(true);

            const data = await register({
                username,
                email,
                password,
            });

            setUser(data.user);
            return data;
        } catch (error) {
            console.error(
                "Register Error:",
                error.response?.data?.message || error.message
            );
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin({ username, email, password }) {
        try {
            setLoading(true);

            const data = await login({
                username,
                email,
                password,
            });

            setUser(data.user);
            return data;
        } catch (error) {
            console.error(
                "Login Error:",
                error.response?.data?.message || error.message
            );
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleGetMe() {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            // User logged in nahi hai to 401 normal hai
            if (error.response?.status === 401) {
                setUser(null);
            } else {
                console.error(
                    "Get Me Error:",
                    error.response?.data?.message || error.message
                );
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            setLoading(true);

            await logout();
            setUser(null);
        } catch (error) {
            console.error(
                "Logout Error:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetMe();
    }, []);

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe,
    };
};