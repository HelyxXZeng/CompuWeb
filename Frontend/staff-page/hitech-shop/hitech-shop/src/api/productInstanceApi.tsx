import axiosClient from "./axiosClient";

export interface ProductInstance {
    id: number,
    productVariantId: number,
    serialNumber: string,
    status: string,
    available: boolean
}

const productInstanceApi = {
    getAll: (params: any) => {
        const url = '/productInstances/GetProductInstances';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/productInstances/GetProductInstanceById?id=' + id;
        return axiosClient.get(url);
    },

    add: async (productInstance: ProductInstance) => {
        try {
            const response = await axiosClient.post('/productInstances/Insert', productInstance);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedProductInstance: ProductInstance) => {
        try {
            const response = await axiosClient.put(`/productInstances/Update?id=${id}`, updatedProductInstance);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/productInstances/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default productInstanceApi;