import api from "./axiosConfig.js";

const login = async (email, password) => {
    try {
        const response = await api.post("/api/session/login", { email, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Login error: ", error.response?.data || error.message);
    }
};

const signup = async (email, password, name) => {
    try {
        const response = await api.post("/api/session/signup", { email, password, name }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("signup error: ", error.response?.data || error.message);
    }
};

const checkSession = async () => {
    try {
        const response = await api.get("/api/session/check", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("checkSession error: ", error.response?.data || error.message);
    }
};

const forgot = async (email, newPassword) => {
    try {
        const response = await api.post("/api/forgot", { email, newPassword }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("forgot error: ", error.response?.data || error.message);
    }
};

export { login, signup, checkSession, forgot };