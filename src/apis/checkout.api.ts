import { instance as axiosClient } from '@/configs'

import { IOrder } from '@/interfaces'

export const checkoutApi = {
  createOrder: async (orderData: IOrder) => {
    return await axiosClient.post('/order', orderData)
  },
  createStripeUrl: async (orderData: IOrder) => {
    return await axiosClient.post('/stripe/create-payment-url', orderData)
  },
  verifyPayment: async (orderId: string) => {
    return await axiosClient.patch(`/stripe/verify-payment/${orderId}`)
  },
  createRepayStripeUrl: async (orderId: string) => {
    return await axiosClient.post('/stripe/create-repay-url', { orderId })
  }
}
