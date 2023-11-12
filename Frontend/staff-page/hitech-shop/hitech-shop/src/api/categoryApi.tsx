import axiosClient from "./axiosClient";

interface Category {
    Id: number,
    Name: string
}

const categoryApi = {
    getAll: (params: any) => {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/categories/' + id;
        return axiosClient.get(url);
    },

    add: async (category: Category) => {
        try {
            const response = await axiosClient.post('/categories', category);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedCategory: Category) => {
        try {
            const response = await axiosClient.put(`/categories/${id}`, updatedCategory);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default categoryApi;