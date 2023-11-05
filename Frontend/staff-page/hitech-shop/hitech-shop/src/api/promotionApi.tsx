import axiosClient from "./axiosClient";
const promotionApi = {
    getAll: (params: any) => {
        const url = '/promotions';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/promotions/' + id;
        return axiosClient.get(url);
    },
}

export default promotionApi;