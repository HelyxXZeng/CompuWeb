import * as request from '~/utils/request';

// export const search = async (q, type = 'less') => {
//     try {
//         const res = await request.get('users/search', {
//             params: {
//                 q,
//                 type,
//             },
//         });

//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

export const search = async (keyword, start, count) => {
    try {
        const res = await request.get(`DTOController/Search/${keyword}/${start}-${count}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};
