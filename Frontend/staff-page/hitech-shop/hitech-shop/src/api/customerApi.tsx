import axiosClient from "./axiosClient";

interface Customer {
    Id: number,
    Name: string,
    Birthdate: string,
    JoinDate: string,
    PhoneNumber: string
}


const customerApi = {
    getAll: (params: any) => {
        const url = '/customers';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/customers/' + id;
        return axiosClient.get(url);
    },

    add: async (customer: Customer) => {
        try {
            const response = await axiosClient.post('/customers', customer);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedCustomer: Customer) => {
        try {
            const response = await axiosClient.put(`/customers/${id}`, updatedCustomer);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/customers/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default customerApi;