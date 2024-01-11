import axiosClient from "./axiosClient"

const DTOAPI = {
  getAll: (params: any) => {
    const url = `/users/GetUsers`;
    return axiosClient.get(url, {params});
  },
  getTDU: () => {
    const url = `/AdminDTOController/CustomerSpentStatitics`
    return axiosClient.get(url);
  },
  getCS: (date:string) => {
    const url = `/AdminDTOController/CustomerStatitics/${date}`
    return axiosClient.get(url);
  },
  getRS: (date:string) => {
    const url = `/AdminDTOController/RatingStatitics/${date}`
    return axiosClient.get(url);
  },
  getOS: (date:string) => {
    const url = `/AdminDTOController/OrderStatitics/${date}`
    return axiosClient.get(url);
  },
  getReSM: (date:string) => {
    const url = `/AdminDTOController/RevenueStatiticsByMonth/${date}`
    return axiosClient.get(url);
  },
  getFO: (date:string) => {
    const url = `/AdminDTOController/FailedOrderStatitics/${date}`
    return axiosClient.get(url);
  },
  getRO: (date:string) => {
    const url = `/AdminDTOController/ReturnOrderStatitics/${date}`
    return axiosClient.get(url);
  },
}

export default DTOAPI