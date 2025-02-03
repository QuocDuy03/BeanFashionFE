import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form, Result, message } from 'antd'

import { authApi } from '@/apis'

import { useAuthStore } from '@/stores'

import { useApi, useBoolean } from '@/hooks'

import { CustomBtn, CustomInput } from '@/components'

import { localStorageKeys, PATH } from '@/utils/constants'

import { VerifyOtp } from './VerifyOtp'
import { Newpassword } from './NewPassword'

type ResetPasswordData = {
  password: string
  confirmPassword: string
}
type ForgotPasswordData = {
  email: string
}
const emailSchema = yup.object().shape({
  email: yup.string().trim().email('Email không hợp lệ!').required('Vui lòng nhập email!')
})

export function ForgotPassword() {
  const navigate = useNavigate()

  const { currentUser, resetMessage } = useAuthStore()
  const { loading, errorMessage, callApi: callApiFlowForgotPassword } = useApi<void>()

  const { value: showOtp, setTrue: setShowOtp } = useBoolean(false)
  const { value: showResult, setTrue: setShowResult } = useBoolean(false)
  const { value: showNewPasswordForm, setTrue: setShowNewPasswordForm } = useBoolean(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })

  const handleForgotPassword = async (forgotPasswordData: ForgotPasswordData) => {
    resetMessage()
    callApiFlowForgotPassword(async () => {
      const { data } = await authApi.forgotPassword(forgotPasswordData)
      if (data) {
        localStorage.setItem(localStorageKeys.currentEmail, forgotPasswordData.email)
        setShowOtp()
        reset()
        message.success('Gừi yêu cầu thành công, vui lòng nhập OTP')
      } else {
        message.error('Gừi yêu cầu thất bại, vui lòng kiểm tra lại!')
      }
    })
  }

  const handleVerifyOtp = async (otp: string) => {
    const verifyOtpData = { email: localStorage.getItem(localStorageKeys.currentEmail) || '', otp }

    if (!verifyOtpData.email) {
      message.error('Email không tồn tại')
      return
    }

    resetMessage()
    callApiFlowForgotPassword(async () => {
      const { data } = await authApi.verifyOtp(verifyOtpData)
      if (data) {
        setShowNewPasswordForm()
        reset()
        message.success('Xác thực OTP thành công, vui lòng nhập mật khẩu mới')
      } else {
        message.error('Xác thực OTP thất bại, vui lòng kiểm tra lại!')
      }
    })
  }

  const handleResetPassword = async (resetPasswordData: ResetPasswordData) => {
    const resetPasswordPayload = {
      email: localStorage.getItem(localStorageKeys.currentEmail) || '',
      password: resetPasswordData.password
    }
    if (!resetPasswordPayload.email) {
      message.error('Not found email')
      return
    }

    resetMessage()
    callApiFlowForgotPassword(async () => {
      const { data } = await authApi.resetPassword(resetPasswordPayload)
      if (data) {
        setShowResult()
        reset()
        navigate(PATH.login)
        message.success('Tạo mật khẩu mới thành công, vui lòng đăng nhập lại!')
      } else {
        message.error('Tạo mật khẩu mới thất bại, vui lòng kiểm tra lại!')
      }
    })
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') navigate('/admin')
      else navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <section className='flex items-center justify-center my-8'>
      <div
        className={`lg:w-[500px] md:w-[450px] h-full mx-auto p-8 bg-white shadow-dark-blue rounded-md  overflow-hidden ${showOtp && showResult && !showNewPasswordForm ? 'w-full' : 'xs:w-full'}`}
      >
        {!showOtp && !showNewPasswordForm && (
          <>
            <h1 className='text-3xl text-dark-blue font-semibold mb-4'>Quên mật khẩu</h1>
            {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}
            <Form className='mt-6' onFinish={handleSubmit(handleForgotPassword)} layout='vertical'>
              <CustomInput
                name='email'
                label='Email'
                size='large'
                control={control}
                errors={errors}
                placeholder='Nhập email của bạn'
              />
              <CustomBtn
                title='Lấy lại mật khẩu'
                type='primary'
                htmlType='submit'
                disabled={loading}
                loading={loading}
              />
            </Form>
          </>
        )}

        {showOtp && !showNewPasswordForm && (
          <VerifyOtp loading={loading} errorMessage={errorMessage} onVerifyOtp={handleVerifyOtp} />
        )}
        {showNewPasswordForm && !showResult && (
          <Newpassword loading={loading} errorMessage={errorMessage} handleResetPassword={handleResetPassword} />
        )}
        {showResult && (
          <Result
            className='flex-1 p-0 animate-fadeIn'
            status='success'
            title='Reset password successfully. Please login again!!'
            extra={[
              <Link
                to='/login'
                className='bg-[#52c41a] px-4 py-3 font-bold rounded-md text-white hover:text-white hover:opacity-80'
              >
                Login
              </Link>
            ]}
          />
        )}
      </div>
    </section>
  )
}
