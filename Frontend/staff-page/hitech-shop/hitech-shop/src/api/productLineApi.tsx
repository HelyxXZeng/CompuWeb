import axiosClient from "./axiosClient";

export interface ProductLine {
    id: number,
    name: string,
    categoryId: number,
    brandId: number,
    releaseDate: string,
    warranty: number,
    description: string
}

const productLineApi = {
    getAll: (params: any) => {
        const url = '/productLines/GetProductLines';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/productLines/GetProductLineById?id=' + id;
        return axiosClient.get(url);
    },

    add: async (productLine: ProductLine) => {
        try {
            const response = await axiosClient.post('/productLines/Insert', productLine);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedProductLine: ProductLine) => {
        try {
            const response = await axiosClient.put(`/productLines/Update?id=${id}`, updatedProductLine);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/productLines/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default productLineApi;