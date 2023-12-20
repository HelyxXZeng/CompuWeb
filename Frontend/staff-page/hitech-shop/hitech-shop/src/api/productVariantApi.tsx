import axiosClient from "./axiosClient";
import { Specification } from "./specificationApi";
export interface ProductVariant {
    id: number,
    productLineId: number,
    name: string,
    productSpecifications: any
}

export interface ProductVariantWithSpecifications {
    id: number,
    productLineId: number,
    name: string,
    specifications: any
}

export interface ProductSpecification {
    id: number,
    productVariantId: number,
    specificationId: number
}



const productVariantApi = {
    getAll: (params: any) => {
        const url = '/productVariants/GetProductVariants';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/productVariants/GetProductVariantById/' + id;
        return axiosClient.get(url);
    },

    add: async (productVariant: ProductVariant, price: number) => {
        try {
            const response = await axiosClient.post('/DTOController/CreateProductVariant?Price=' + price.toString(), productVariant);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedProductVariant: ProductVariant) => {
        try {
            const response = await axiosClient.put(`/productVariants/Update?id=${id}`, updatedProductVariant);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateSpecifications: async (updatedSpecificationList: ProductSpecification) => {
        try {
            const response = await axiosClient.put(`.....`, updatedSpecificationList);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/productVariants/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default productVariantApi;