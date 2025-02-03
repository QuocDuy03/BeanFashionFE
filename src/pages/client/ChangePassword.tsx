import { Form, message } from 'antd'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { authApi } from '@/apis'

import { useApi } from '@/hooks'

import { useAuthStore } from '@/stores'

import { ChangePassWordData } from '@/interfaces'

import { changePasswordFields } from '@/utils/constants'

import { CustomBtn, CustomInput } from '@/components'

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
    .required('Vui lòng nhập mật khẩu hiện tại của bạn!'),
  newPassword: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.').required('Vui lòng nhập mật khẩu mới của bạn!'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu!')
    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
})

export function ChangePassword() {
  const { setCurrentUser, resetMessage } = useAuthStore()
  const { loading, errorMessage, callApi: callApiLogin } = useApi<void>()
  const { callApi: callApiLogout } = useApi<void>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  })

  const handleChangePassword = (changePasswordData: ChangePassWordData) => {
    resetMessage()
    callApiLogin(async () => {
      const { data } = await authApi.changePassword(changePasswordData)
      if (data) {
        reset()
        callApiLogout(async () => {
          await authApi.logout()
          setCurrentUser(null)
        })
        message.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại')
      }
    })
  }

  return (
    <section className='flex items-center justify-center text-left'>
      <div className='lg:w-[500px] md:w-[450px] h-full mx-auto px-3 bg-white rounded-md overflow-hidden'>
        <h1 className='text-lg text-dark-blue font-semibold uppercase mb-4'>Đổi mật khẩu</h1>

        {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}

        <Form className='mt-6' onFinish={handleSubmit(handleChangePassword)} layout='vertical'>
          {changePasswordFields.map((field) => (
            <CustomInput
              key={field.name}
              name={field.name}
              size='large'
              type={field.type}
              control={control}
              errors={errors}
              placeholder={field.placeholder}
            />
          ))}

          <CustomBtn title='Đặt lại mật khẩu' type='primary' htmlType='submit' disabled={loading} loading={loading} />
        </Form>
      </div>
    </section>
  )
}
