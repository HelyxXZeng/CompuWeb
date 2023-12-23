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
