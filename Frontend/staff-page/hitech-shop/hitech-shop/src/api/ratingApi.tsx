import axiosClient from "./axiosClient";

export interface Rate {
    id: number,
    orderItemId: number,
    date: string,
    rating: number,
    comment: string,
    status: string
}


const ratingApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetRatingTable';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/ratings/GetRatingById/' + id;
        return axiosClient.get(url);
    },

    add: async (rating: Rate) => {
        try {
            const response = await axiosClient.post('/ratings/Insert', rating);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedRating: Rate) => {
        try {
            const response = await axiosClient.put(`/ratings/Update?id=${id}`, updatedRating);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/ratings/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ratingApi;