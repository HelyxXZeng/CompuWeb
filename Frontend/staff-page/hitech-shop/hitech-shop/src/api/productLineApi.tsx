import axiosClient from "./axiosClient";

export interface ProductLine {
    id: number,
    name: string,
    categoryId: number,
    brandId: number,
    releaseDate: string,
    warranty: number,
    description: string,
    images: any
}

export interface ProductImage {
    id: number,
    name: string,
    productLineId: number,
    image: string
}

const productLineApi = {
    getAll: (params: any) => {
        const url = '/productLines/GetProductLines';
        return axiosClient.get(url);
    },
    getTable: (params: any) => {
        const url = '/DTOController/GetProductLineTable';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/productLines/GetProductLineById/' + id;
        return axiosClient.get(url);
    },

    add: async (productLine: ProductLine) => {
        try {
            const response = await axiosClient.post('/DTOController/CreateProductLine', productLine);
            console.log('Response.data', response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addProductImages: async (productImage: ProductImage) => {
        try {
            const response = await axiosClient.post('/productimages/Insert', productImage);
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

    updateImages: async (imageList: ProductImage[]) => {
        try {
            const response = await axiosClient.put(`...........`, imageList);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/productLines/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default productLineApi;