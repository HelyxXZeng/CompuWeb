import * as request from '~/utils/request';

export const createOrder = async (data) => {
    try {
        const res = await request.post('DTOController/CreateOrder', data);
        console.log('res', res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createCustomer = async (data) => {
    try {
        const res = await request.post('customers/Insert', data);
        console.log('res', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const checkCustomerTel = async (telephoneNumber) => {
    try {
        const res = await request.get(`DTOController/AuthenticateCustomer/${telephoneNumber}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersByPhoneNumber = async (phoneNumber) => {
    try {
        const res = await request.get('DTOController/GetOrdersByPhoneNumber', {
            params: {
                phoneNumber,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postRating = async (data) => {
    try {
        const res = await request.post('ratings/Insert', data);
        console.log('res', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getOrderDetail = async (OrderId) => {
    try {
        const res = await request.get('DTOController/GetCustomerOrderDetail', {
            params: {
                OrderId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
