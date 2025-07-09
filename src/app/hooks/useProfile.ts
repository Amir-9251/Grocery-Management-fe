import { useEffect, useState } from "react"
import type { AxiosError } from "axios";
import getProfile from "../components/Pages/DashBoard/api/profile";
import type { User } from "../types/Types";
export const useProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = async () => {
        setLoading(true);
        try {
            const data = await getProfile();
            if (data) {

                setUser(data);
                setLoading(false);
            }
        } catch (error) {
            setError(error as AxiosError);
        }
    }

    return { user, loading, error };
}
