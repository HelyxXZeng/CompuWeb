import axiosClient from "./axiosClient";

export interface Price {
    id: number,
    productVariantId: number,
    startDate: string,
    endDate: string,
    value: number,
    status: string
}

const PriceApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetPrices';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/Prices/GetPriceById/' + id;
        return axiosClient.get(url);
    },

    getCurrentPrice: (productVariantId: number) => {
        const url = '/DTOController/GetCurrentPrice/' + productVariantId;
        return axiosClient.get(url);
    },

    add: async (Price: Price) => {
        try {
            const response = await axiosClient.post('/Prices/Insert', Price);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedPrice: Price) => {
        try {
            // console.log('this is id from priceApi', id)
            const response = await axiosClient.put(`/prices/Update?id=${id}`, updatedPrice);
            // console.log('this is updatedPrice', updatedPrice)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/Prices/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default PriceApi;