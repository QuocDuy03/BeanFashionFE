import { instance as axiosClient } from '@/configs'
import { IContact } from '@/interfaces'

export const contactApi = {
    sendContact: async (contactData: IContact) => {
        return axiosClient.post('/contact', contactData)
    }
}