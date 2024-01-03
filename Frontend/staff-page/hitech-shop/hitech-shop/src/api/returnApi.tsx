import axiosClient from "./axiosClient";

export interface Return {
    id: number,
    orderItemId: number,
    date: string,
    issues: string,
    price: number,
    comment: string,
    status: string
}


const returnOrderApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetReturnTable';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/returnorderitems/GetReturnOrderItemById/' + id;
        return axiosClient.get(url);
    },

    add: async (returnOrder: Return) => {
        try {
            const response = await axiosClient.post('/returnorderitems/Insert', returnOrder);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedReturn: Return) => {
        try {
            const response = await axiosClient.put(`/returnorderitems/Update?id=${id}`, updatedReturn);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/returnorderitems/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default returnOrderApi;