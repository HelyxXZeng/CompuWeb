import axiosClient from "./axiosClient";
const orderApi = {
    getAll: (params: any) => {
        const url = '/orders';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/orders/' + id;
        return axiosClient.get(url);
    },
}

export default orderApi;