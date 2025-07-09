import apiClient from "../../../services/apiClient";

const loginUser = async (data: { email: string; password: string }) => {
    const baseURL = `login`;
    const response = await apiClient({
        method: "POST",
        url: baseURL,
        data: data,
    });
    return response.data;
}

const registerUser = async (data: { email: string; password: string, username: string }) => {
    const baseURL = `register`;
    const response = await apiClient({
        method: "POST",
        url: baseURL,
        data: data,
    })
    return response.data;
}
export { loginUser, registerUser };