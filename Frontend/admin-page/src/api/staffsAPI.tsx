import axiosClient from "./axiosClient";

export interface StaffDef {
    id: number,
    avatar: string,
    name: string,
    birthdate: Date,
    gender: string,
    idcardNumber: number,
    address: string,
    joinDate: Date,
    phoneNumber: string,
    position: string,
    salary: number,
    other: string, //Status: ACTIVE, NONACTIVE, FIRED
}

const staffApi = {
    getAll: (params: any) => {
        const url = '/staffs/GetStaffs';
        return axiosClient.get(url, {params});
    },
    getID: (id: any) => {
        const url = `/staffs/GetStaffById/${id}`;
        return axiosClient.get(url);
    },

    getName: (Name:string) => {
        const url = `/staffs/GetStaffByName/${Name}`;
        return axiosClient.get(url);
    },

    add: async (staff: StaffDef) => {
        try {
            const response = await axiosClient.post('/staffs/Insert', staff);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, updatedStaff: StaffDef) => {
        try {
            const response = await axiosClient.put(`/staffs/Update?id=${id}`, updatedStaff);
            if (response.data) {
                console.log('Updated staff member:', response.data);
                // Process the data
              } else {
                console.log('No data returned in the response.');
                // Handle the case where no data is returned
              }
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
            const response = await axiosClient.put(`AdminDTOController/SetDeleteStaff/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default staffApi