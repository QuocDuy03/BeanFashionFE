import { instance as axiosClient } from '@/configs'
import {
  IChangePassWordData,
  IForgotPasswordData,
  ILoginData,
  IRegisterData,
  IResetPasswordData,
  IVerifyOTPData
} from '@/interfaces'

export const authApi = {
  register: async (userData: IRegisterData) => {
    return axiosClient.post('/auth/register', userData)
  },

  login: async (userData: ILoginData) => {
    return axiosClient.post('/auth/login', userData)
  },

  logout: async () => {
    return axiosClient.delete('/auth/logout')
  },

  verifyEmail: async (userId: string) => {
    return axiosClient.post('auth/verify-email', { userId })
  },

  forgotPassword: async (forgotPasswordData: IForgotPasswordData) => {
    return axiosClient.post('/auth/forgot-password', forgotPasswordData)
  },

  verifyOtp: async (verifyOtpData: IVerifyOTPData) => {
    return axiosClient.post('/auth/verify-otp', verifyOtpData)
  },

  resetPassword: async (resetPasswordData: IResetPasswordData) => {
    return axiosClient.post('/auth/reset-password', resetPasswordData)
  },

  changePassword: async (changePassWordData: IChangePassWordData) => {
    return axiosClient.patch('auth/change-password', changePassWordData)
  }
}
