import axiosClient from "./axiosClient";
const brandApi = {
    getAll: (params: any) => {
        const url = '/brands';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/brands/' + id;
        return axiosClient.get(url);
    },
}

export default brandApi;