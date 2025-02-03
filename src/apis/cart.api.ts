import { instance as axiosClient } from '@/configs'
import { IAddToCartData } from '@/interfaces'

export const cartApi = {
  getCart: async () => {
    return axiosClient.get('/cart')
  },

  addToCart: async (addToCartData: IAddToCartData) => {
    return axiosClient.post('/cart', {
      cartProduct: addToCartData
    })
  },

  updateCartItem: async (
    cartProductId: string,
    updateCartData: Omit<IAddToCartData, 'productDetailId' | 'categoryId'>
  ) => {
    return axiosClient.patch(`/cart/${cartProductId}`, {
      cartProduct: updateCartData
    })
  },

  deleteCartItem: async (cartProductId: string) => {
    return axiosClient.delete(`/cart/delete/${cartProductId}`)
  },

  deleteMultipleCartItems: async (cartProductIds: string[]) => {
    return axiosClient.delete('/cart/bulk-delete', {
      data: { ids: cartProductIds }
    })
  }
}
