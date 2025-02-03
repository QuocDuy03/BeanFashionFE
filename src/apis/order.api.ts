import { instance as axiosClient } from '@/configs'
import { IOrderQuery } from '@/interfaces'

export const orderApi = {
  getAllOrders: async () => {
    return await axiosClient.get('/order/all')
  },
  getOrders: async (query: IOrderQuery) => {
    return await axiosClient.get(`/order/user/`, { params: query })
  },
  getOrder: async (id: string) => {
    return await axiosClient.get(`/order/${id}`)
  },
  cancelOrder: async (id: string) => {
    return await axiosClient.patch(`/order/cancel/${id}`)
  }
}
