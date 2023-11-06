import axiosClient from "./axiosClient";
const customerApi = {
    getAll: (params: any) => {
        const url = '/customers';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/customers/' + id;
        return axiosClient.get(url);
    },
}

export default customerApi;