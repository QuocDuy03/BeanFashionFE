import { instance as axiosClient } from '@/configs'

import { IAddress, IAddressReturn } from '@/interfaces'

export const addressApi = {
  addAddress: async (addressData: IAddress) => {
    return await axiosClient.post('/addresses', addressData)
  },
  getAddresses: async () => {
    return await axiosClient.get('/addresses')
  },
  updateAddress: async (addressData: IAddressReturn) => {
    return await axiosClient.put('/addresses', addressData)
  },
  deleteAddress: async (id: string) => {
    return await axiosClient.delete(`/addresses/${id}`)
  }
}
