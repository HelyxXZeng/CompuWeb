import axiosClient from "./axiosClient";

interface Customer {
    id: number,
    name: string,
    birthdate: string,
    joinDate: string,
    phoneNumber: string
}


const customerApi = {
    getAll: (params: any) => {
        const url = '/customers/GetCustomers';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/customers/GetCustomerById?id=' + id;
        return axiosClient.get(url);
    },

    add: async (customer: Customer) => {
        try {
            const response = await axiosClient.post('/customers/Insert', customer);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedCustomer: Customer) => {
        try {
            const response = await axiosClient.put(`/customers/Update?id=${id}`, updatedCustomer);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/customers/Delete?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default customerApi;