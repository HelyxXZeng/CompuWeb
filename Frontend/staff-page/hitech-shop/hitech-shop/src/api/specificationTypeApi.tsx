import axiosClient from "./axiosClient";

export interface SpecificationType {
    id: number,
    name: string
}

const specificationTypeApi = {
    getAll: (params: any) => {
        const url = '/specificationTypes/GetSpecificationTypes';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/specificationTypes/GetSpecificationTypeById?id=' + id;
        return axiosClient.get(url);
    },

    add: async (specificationType: SpecificationType) => {
        try {
            const response = await axiosClient.post('/specificationTypes/Insert', specificationType);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedSpecificationType: SpecificationType) => {
        try {
            const response = await axiosClient.put(`/specificationTypes/Update?id=${id}`, updatedSpecificationType);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/specificationTypes/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default specificationTypeApi;