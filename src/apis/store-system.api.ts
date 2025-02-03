import { instance as axiosClient } from '@/configs'

export const storeSystemApi = {
  getStore: async () => {
    return await axiosClient.get('/store-system')
  }
}
