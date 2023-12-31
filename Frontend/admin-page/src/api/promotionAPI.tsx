import axiosClient from "./axiosClient"

export interface PromotionDef{
  id: number,
  name: string,
  productVariantIdPurchase: number,
  productVariantIdPromotion: number,
  startDate: Date,
  endDate: Date,
  content: string,
  value: number,
  status: string
}
export interface PromotionHaveNameDef{
  id: number,
  name: string,
  productVariantIdPurchase: number,
  productVariantIdPromotion: number,
  productVariantPurchaseName: number,
  productVariantPromotionName: number,
  startDate: Date,
  endDate: Date,
  content: string,
  value: number,
  status: string
}

const promotionAPI = {
  getAll: (params: any) => {
    const url = `AdminDTOController/GetPromotionTableWithName`;
    return axiosClient.get(url, {params});
  },
  
  getID: (id: any) => {
    const url = `AdminDTOController/GetPromotionWithNameById/${id}`;
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
        const response = await axiosClient.put(`/AdminDTOController/SetDeletePromotion/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
  }
}

export default promotionAPI