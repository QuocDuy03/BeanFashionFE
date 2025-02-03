import { instance as axiosClient } from '@/configs'

export const categoryApi = {
    findAll: async () => {
        return axiosClient.get('/category/all')
    },
    findOne: async (id: string) => {
        return axiosClient.get(`/category/${id}`)
    },
}