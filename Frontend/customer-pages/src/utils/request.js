import axios from 'axios';

const request = axios.create({
    // baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    baseURL: 'https://localhost:44333/api',
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
    },
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await request.post(path, data, options);
    return response;
};

export default request;
