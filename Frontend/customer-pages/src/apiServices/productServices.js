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

export const getLaptopTable = async (start, count) => {
    try {
        const res = await request.get(`DTOController/GetLaptopProductTable/${start}-${count}`);

        return res;
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

export const getProductVariantDetail = async (ProductVariantId) => {
    try {
        const res = await request.get('DTOController/GetProductVariantDetail', {
            params: {
                ProductVariantId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getCartItemById = async (PVid) => {
    try {
        const res = await request.get('DTOController/GetProductVariantInCart', {
            params: {
                PVid,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getRatingList = async (PVid) => {
    try {
        const res = await request.get('DTOController/GetRatingList', {
            params: {
                PVid,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getPromotionValue = async (VariantPurchaseId) => {
    try {
        const res = await request.get('DTOController/GetPromotionByVariantPurchaseId', {
            params: {
                VariantPurchaseId,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
