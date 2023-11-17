// orderItemApi.tsx
import axiosClient from "./axiosClient";

interface OrderItem {
    Id: number,
    ProductInstanceId: number,
    OrderId: number
}

const orderItemApi = {
    getAll: (params: any) => {
        const url = '/orderItems';
        return axiosClient.get(url);
    },

    get: (id: any) => {
        const url = `/orderItems/${id}`;
        return axiosClient.get(url);
    },

    add: async (orderItem: OrderItem) => {
        try {
            const response = await axiosClient.post('/orderItems', orderItem);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedOrderItem: OrderItem) => {
        try {
            const response = await axiosClient.put(`/orderItems/${id}`, updatedOrderItem);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/orderItems/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default orderItemApi;
