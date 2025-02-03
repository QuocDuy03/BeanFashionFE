import { instance as axiosClient } from '@/configs'

import { ICurrentUser } from '@/interfaces'

export const userApi = {
  getCurrentUser: async () => {
    return await axiosClient.get('/users/currentUser')
  },
  updateProfile: async (profileData: Omit<ICurrentUser, 'id' | 'role' | 'email'>) => {
    return await axiosClient.patch('users/update-profile', profileData)
  },
  getDefaultAddress: async () => {
    return await axiosClient.get('users/default-address')
  },
  setDefaultAddress: async (addressId: string) => {
    return await axiosClient.patch(`users/default-address/${addressId}`)
  }
}
