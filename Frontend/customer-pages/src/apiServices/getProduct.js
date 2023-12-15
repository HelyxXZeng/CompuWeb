import * as request from '~/utils/request';

export const getProduct = async (q, type = 'less') => {
    try {
        const res = await request.get('product', {
            params: {
                q,
                type,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
