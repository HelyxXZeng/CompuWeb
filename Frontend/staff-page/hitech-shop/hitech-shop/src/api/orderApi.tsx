//orderApi.tsx
import axiosClient from "./axiosClient";
interface Order {
    Id: number,
    CustomerId: number,
    Date: Date,
    Note: string,
    Status: string,
    Address: string
}

interface OrderItem {
    Id: number,
    ProductInstanceId: number,
    OrderId: number
}

interface PromotionUsage {
    Id: number,
    PromotionId: number,
    OrderId: number
}

const orderApi = {
    getAll: (params: any) => {
        const url = '/orders/GetOrders';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/orders/GetOrderById?id=' + id;
        return axiosClient.get(url);
    },
    // add: async (brand: Brand) => {
    //     try {
    //         const response = await axiosClient.post('/brands', brand);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
}

export default orderApi;