import axiosClient from "./axiosClient"

const DTOAPI = {
  getAll: (params: any) => {
    const url = `/users/GetUsers`;
    return axiosClient.get(url, {params});
  },
  getTDU: () => {
    const url = `/AdminDTOController/CustomerSpentStatitics`
    return axiosClient.get(url);
  }
}

export default DTOAPI