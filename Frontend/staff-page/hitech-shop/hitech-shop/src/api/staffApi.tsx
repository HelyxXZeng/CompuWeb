import axiosClient from "./axiosClient";

interface Staff {
    Id: number,
    Name: string
}

const staffApi = {
    getAll: (params: any) => {
        const url = '/staffs/GetStaff';
        return axiosClient.get(url);
    },
    get: (id: any) => {
        const url = '/staffs/GetStaff' + id;
        return axiosClient.get(url);
    },

    add: async (staff: Staff) => {
        try {
            const response = await axiosClient.post('/staffs/Insert', staff);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedStaff: Staff) => {
        try {
            const response = await axiosClient.put(`/staffs/Update/${id}`, updatedStaff);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    remove: async (id: number) => {
        try {
            const response = await axiosClient.delete(`/staffs/Delete?id=/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default staffApi;