import axiosClient from "./axiosClient";

export interface Staff {
    Id: number,
    Img:ImageBitmap,
    Name: string,
    Birthday: Date,
    Gender: string,
    IdCardNumber: number,
    Address: string,
    JoinDate: Date,
    PhoneNumber: string,
    Position: string,
    Other: string, //Status: ACTIVE, NONACTIVE, FIRED
}

const staffApi = {
    getAll: (params: any) => {
        const url = '/staffs/GetStaffs';
        return axiosClient.get(url, {params});
    },
    getID: (id: any) => {
        const url = `/staffs/GetStaffById?id=${id}`;
        return axiosClient.get(url);
    },

    getName: (Name:string) => {
        const url = `/staffs/GetStaffByName?id=${Name}`;
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

    /* updateStatus:async (id :number, status: string) => {
        //làm sau
    } */

    remove: async (id: number) => { //hạn chế dùng remove
        try {
            const response = await axiosClient.delete(`/staffs/Delete?id=/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default staffApi