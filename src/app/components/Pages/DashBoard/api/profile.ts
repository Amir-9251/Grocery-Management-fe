import apiClient from "../../../../services/apiClient";
import { getToken } from "../../../../utils/AppToken";


const getProfile = async () => {
    const baseUrl = 'profile';
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data;
}
export default getProfile;