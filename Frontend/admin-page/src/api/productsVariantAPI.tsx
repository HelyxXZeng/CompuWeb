import axiosClient from "./axiosClient";

const productsVariantAPI = {
    getAll: (params: any) =>{
        const url = '/productVariants/GetProductVariants';
        return axiosClient.get(url, {params});
    },
    getID: (id: any) => {
        const url = `/productVariants/GetProductVariantById?id=${id}`;
        return axiosClient.get(url);
    },
    getName: (name: string) =>{
        const url = `/productVariants/GetProductVariantByName?id=${name}`;
        return axiosClient.get(url);
    }
}

export default productsVariantAPI