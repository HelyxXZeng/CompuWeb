import axiosClient from "./axiosClient";

interface Category {
    id: number,
    name: string
}

const categoryApi = {
    getAll: (params: any) => {
        const url = '/categories/GetCategories';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/categories/GetCategoryById?id=' + id;
        return axiosClient.get(url);
    },

    add: async (category: Category) => {
        try {
            const response = await axiosClient.post('/categories/Insert', category);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedCategory: Category) => {
        try {
            const response = await axiosClient.put(`/categories/Update?id=${id}`, updatedCategory);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/categories/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default categoryApi;