import axiosClient from "./axiosClient";

export interface Rating {
    id: number,
    orderItemId: number,
    date: string,
    rating: number,
    comment: string
}


const ratingApi = {
    getAll: (params: any) => {
        const url = '/ratings/GetRatings';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/ratings/GetRatingById/' + id;
        return axiosClient.get(url);
    },

    add: async (rating: Rating) => {
        try {
            const response = await axiosClient.post('/ratings/Insert', rating);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedRating: Rating) => {
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