import { useState } from "react";
import { loginUser, registerUser } from "../api";
import type { AxiosError } from "axios";
import { setToken } from "../../../utils/AppToken";
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const navigate = useNavigate();

    const login = async (data: { email: string; password: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(data);
            if (response) {
                setToken(response.token);
                navigate('/'); // Redirect to home page after successful login
                setLoading(false);
            }

        } catch (error) {
            setError(error as AxiosError);
            setLoading(false);
        }
    }

    const register = async (data: { email: string; password: string, username: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerUser(data);
            if (response) {
                setToken(response.token);
                navigate('/'); // Redirect to home page after successful login
                setLoading(false);
            }

        } catch (error) {
            setError(error as AxiosError);
            setLoading(false);
        }
    }
    return { loading, error, login, register };
}