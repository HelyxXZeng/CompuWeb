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
        const url = '/promotions/GetPromotion';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/promotions/GetPromotionById?id=' + id;
        return axiosClient.get(url);
    },
    add: async (promotion: Promotion) => {
        try {
            const response = await axiosClient.post('/promotions/Insert', promotion);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedPromotion: Promotion) => {
        try {
            const response = await axiosClient.put(`/promotions/Update?id=${id}`, updatedPromotion);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/promotions/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default promotionApi;