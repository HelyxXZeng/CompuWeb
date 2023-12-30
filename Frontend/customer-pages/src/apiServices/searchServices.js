import * as request from '~/utils/request';

export const search = async (keyword, start, count) => {
    try {
        const res = await request.get(`DTOController/Search/${keyword}/${start}-${count}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const filter = async (keyword = '%20', start, count, brandId = 0, categoryId = 0, data = []) => {
    try {
        const res = await request.post(`DTOController/SearchWithFilter/${keyword}/${start}-${count}`, data, {
            params: {
                brandId,
                categoryId,
            },
        });
        console.log('res', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
