import axiosClient from "./axiosClient"

const usersAPI = {
  getAll: (params: any) => {
    const url = `/users/GetUsers`;
    return axiosClient.get(url, {params});
  },
  getTTU: (params: any) => {
    const url = `/users/GetMostBuyUsers`
    return axiosClient.get(url, {params});
  }
}

export default usersAPI