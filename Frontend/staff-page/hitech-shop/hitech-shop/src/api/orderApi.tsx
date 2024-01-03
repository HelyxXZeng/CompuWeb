//orderApi.tsx
import axiosClient from "./axiosClient";
export interface Order {
    id: number,
    customerId: number,
    staffId: number,
    promotionId: number
    date: string,
    note: string,
    status: string,
    address: string
}

export interface OrderDetail {
    id: number,
    customerName: string,
    customerPhoneNumber: string,
    address: string,
    total: number,
    status: string,
    date: string,
    note: string,
    variantByOrderItems: any

}


const orderApi = {
    getAll: (params: any) => {
        const url = '/DTOController/GetOrderTable';
        return axiosClient.get(url);
    },
    getDetail: (id: any) => {
        const url = '/DTOController/GetCustomerOrderDetail?OrderId=' + id;
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/orders/GetOrderById/' + id;
        return axiosClient.get(url);
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/orders/Delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, updatedOrder: Order) => {
        try {
            console.log('This is uploadOrder', updatedOrder)
            const response = await axiosClient.put(`/orders/Update?id=${id}`, updatedOrder);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default orderApi;