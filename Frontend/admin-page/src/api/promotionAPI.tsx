import axiosClient from "./axiosClient"

export interface PromotionDef{
  Id: number;
  Name: string,
  ProductVariantIdPurchase: number,
  ProductVariantIdPromotion: number,
  StartDate: Date,
  EndDate: Date,
  Content: string,
  Value: number,
  Status: string
}

const promotionAPI = {
  getAll: (params: any) => {
    const url = `/promotions/GetPromotions`;
    return axiosClient.get(url, {params});
  },
  
  getID: (id: any) => {
    const url = `/promotions/GetPromotionById?id=${id}`;
    return axiosClient.get(url);
  },

  add: async (promotion: PromotionDef) => {
    try {
        const response = await axiosClient.post('/promotions/Insert', promotion);
        return response.data;
    } catch (error) {
        throw error;
    }
  },

  update: async (id: number, updatedPromotion: PromotionDef) => {
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

export default promotionAPI