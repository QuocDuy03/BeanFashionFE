export interface ICurrentUser {
  id: string
  fullName: string
  role: string
  email: string
  avatar?: string
  phoneNumber?: string
}

export interface IRegisterData {
  fullName: string
  email: string
  password: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IVerifyOTPData {
  email: string
  otp: string
}

export interface IResetPasswordData {
  email: string
  password: string
}

export interface IChangePassWordData {
  currentPassword: string
  newPassword: string
}

export interface IForgotPasswordData {
  email: string
}

export interface ChangePassWordData {
  currentPassword: string
  newPassword: string
}

