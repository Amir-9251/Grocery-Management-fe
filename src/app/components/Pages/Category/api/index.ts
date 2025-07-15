import apiClient from "../../../../services/apiClient";
import { getToken } from "../../../../utils/AppToken";

const GetCategoriesApi = async (page: number, pageSize: number) => {
    const token = getToken()
    const baseUrl = 'categories';
    const response = await apiClient({
        method: "GET",
        url: baseUrl,
        params: {
            page,
            limit: pageSize, // Use pageSize for pagination
        },
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
    return response.data;
};


const CreateCategoryApi = async (data: { name: string, status: boolean }) => {
    const token = getToken()
    const baseUrl = 'category';
    const response = await apiClient({
        method: "POST",
        url: baseUrl,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
    return response.data;
};

const UpdateCategoryApi = async (id: string, data: { name: string, status: boolean }) => {
    const token = getToken()
    const baseUrl = `category/${id}`;
    const response = await apiClient({
        method: "PUT",
        url: baseUrl,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
    return response.data;
};

const DeleteCategoryApi = async (id: string) => {
    const token = getToken()
    const baseUrl = `category/${id}`;
    const response = await apiClient({
        method: "DELETE",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
    return response.data;
};

const searchCategoriesApi = async (query: string) => {
    const baseUrl = `categories/search`;
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: baseUrl,
        params: { search: query },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export { GetCategoriesApi, CreateCategoryApi, UpdateCategoryApi, DeleteCategoryApi, searchCategoriesApi };