// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here 'https://github.com/axios/axios#request-config' for the full list of configs

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,

    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})

axiosClient.interceptors.response.use((response) => {
    // console.log('Here in response: ', response)
    // if (response && response.data) {
    //     return response.data;
    // }

    // If there is no response data, you can just return the response
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;