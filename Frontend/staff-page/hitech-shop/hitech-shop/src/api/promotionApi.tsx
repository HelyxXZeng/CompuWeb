import axiosClient from "./axiosClient";
interface Promotion {
    Id: number,
    Name: string,
    ProductVariantIdPurchase: number,
    ProductVariantIdPromotion: number,
    StartDate: Date,
    EndDate: Date,
    Content: string,
    Value: number,
    Status: string
}

const promotionApi = {
    getAll: (params: any) => {
        const url = '/promotions';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/promotions/' + id;
        return axiosClient.get(url);
    },
    add: async (promotion: Promotion) => {
        try {
            const response = await axiosClient.post('/promotions', promotion);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedPromotion: Promotion) => {
        try {
            const response = await axiosClient.put(`/promotions/${id}`, updatedPromotion);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/promotions/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default promotionApi;