import axiosClient from "./axiosClient";
const categoryApi = {
    getAll: (params: any) => {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/categories/' + id;
        return axiosClient.get(url);
    },
}

export default categoryApi;