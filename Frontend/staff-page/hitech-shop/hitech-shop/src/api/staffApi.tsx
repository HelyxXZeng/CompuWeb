import axiosClient from "./axiosClient";

interface Staff {
    Id: number,
    Name: string
}

const staffApi = {
    getAll: (params: any) => {
        const url = '/staffs';
        return axiosClient.get(url, { params });
    },
    get: (id: any) => {
        const url = '/staffs/' + id;
        return axiosClient.get(url);
    },

    add: async (staff: Staff) => {
        try {
            const response = await axiosClient.post('/staffs', staff);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedStaff: Staff) => {
        try {
            const response = await axiosClient.put(`/staffs/${id}`, updatedStaff);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/staffs/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default staffApi;