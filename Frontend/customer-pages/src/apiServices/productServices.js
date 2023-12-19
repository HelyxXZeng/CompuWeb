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

export const getSpecList = async () => {
    try {
        const res = await request.get('DTOController/GetSpecificationList');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getBrands = async () => {
    try {
        const res = await request.get('brands/GetBrandTable');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async () => {
    try {
        const res = await request.get('categories/GetCategories');

        return res;
    } catch (error) {
        console.log(error);
    }
};