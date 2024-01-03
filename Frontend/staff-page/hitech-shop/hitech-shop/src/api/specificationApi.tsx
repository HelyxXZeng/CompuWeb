import axiosClient from "./axiosClient";

export interface Specification {
    id: number,
    specificationTypeId: number
    value: string
}

const specificationApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetSpecifications';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/specifications/GetSpecificationById/' + id;
        return axiosClient.get(url);
    },

    add: async (specification: Specification) => {
        try {
            console.log('data in spec api', specification)
            const response = await axiosClient.post('/specifications/Insert', specification);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedSpecification: Specification) => {
        try {
            const response = await axiosClient.put(`/specifications/Update?id=${id}`, updatedSpecification);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/specifications/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default specificationApi;