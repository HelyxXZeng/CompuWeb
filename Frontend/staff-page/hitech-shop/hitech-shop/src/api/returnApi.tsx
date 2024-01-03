import axiosClient from "./axiosClient";

export interface Return {
    id: number,
    orderItemId: number,
    date: string,
    returnOrder: number,
    comment: string
}


const returnOrderApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetReturnTable';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/returns/GetReturnById/' + id;
        return axiosClient.get(url);
    },

    add: async (returnOrder: Return) => {
        try {
            const response = await axiosClient.post('/returns/Insert', returnOrder);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedReturn: Return) => {
        try {
            const response = await axiosClient.put(`/returns/Update?id=${id}`, updatedReturn);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/returns/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default returnOrderApi;