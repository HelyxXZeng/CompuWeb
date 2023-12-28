import * as request from './request';

export const getProvinces = async () => {
    try {
        const res = await request.get('p');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getDistricts = async (provinceCode, depth = 2) => {
    try {
        const res = await request.get(`p/${provinceCode}`, {
            params: {
                depth,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getWards = async (districtCode, depth = 2) => {
    try {
        const res = await request.get(`d/${districtCode}`, {
            params: {
                depth,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
