import axios from 'axios';

const request = axios.create({
    baseURL: 'https://provinces.open-api.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
};

export default request;
