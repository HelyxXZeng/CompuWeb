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
        const url = '/Prices/GetPrices';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/Prices/GetPriceById?id=' + id;
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
            const response = await axiosClient.put(`/Prices/Update?id=${id}`, updatedPrice);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/Prices/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default PriceApi;