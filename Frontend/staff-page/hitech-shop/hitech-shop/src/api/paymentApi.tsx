import axiosClient from "./axiosClient";

export interface Payment {
    id: number,
    orderId: number,
    paymentMethod: string,
    paymentStatus: string
}


const ratingApi = {
    getPaymentByOrderId: (id: any) => {
        const url = '/payments/GetPaymentByOrderId/' + id;
        return axiosClient.get(url);
    },

    update: async (id: number, updatedPayment: Payment) => {
        try {
            const response = await axiosClient.put(`/payments/Update?id=${id}`, updatedPayment);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ratingApi;