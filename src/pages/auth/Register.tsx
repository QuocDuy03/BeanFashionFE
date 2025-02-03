import { Link } from 'react-router-dom'

import { Form, Result } from 'antd'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { authApi } from '@/apis'

import { useApi } from '@/hooks'

import { IRegisterData } from '@/interfaces'

import { authFields } from '@/utils/constants'

import { CustomBtn, CustomInput } from '@/components'

const registerSchema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  email: yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
  password: yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu!'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu!')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp!')
})

export function Register() {
  const { loading, errorMessage, showSuccess, callApi: callApiRegister } = useApi<void>()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const handleRegister = (registerData: IRegisterData) => {
    callApiRegister(async () => {
      const { data } = await authApi.register(registerData)
      if (data) {
        reset()
      }
    })
  }

  return (
    <section className='flex items-center justify-center my-8'>
      <div className='lg:w-[500px] md:w-[450px] h-full mx-auto p-10 bg-white shadow-dark-blue rounded-md overflow-hidden '>
        {showSuccess ? (
          <Result
            className='flex-1 animate-fadeIn'
            status='success'
            title='Đăng ký thành công. Vui lòng kiểm tra email của bạn'
            extra={[
              <Link
                key='login'
                to='/login'
                className='bg-green-success px-4 py-3 font-bold rounded-md text-white hover:text-white hover:opacity-80'
              >
                Đăng nhập
              </Link>
            ]}
          />
        ) : (
          <div>
            <h1 className='text-3xl text-dark-blue font-semibold mb-4'>Đăng ký</h1>
            <span className='text-lg'>Đã có tài khoản, đăng nhập </span>

            <Link to='/login' className='text-lg text-dark-blue font-normal hover:underline'>
              tại đây
            </Link>
            <br />
            {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}

            <Form className='mt-6' onFinish={handleSubmit(handleRegister)} layout='vertical'>
              {authFields.map((field) => (
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

              <CustomBtn title='Đăng ký' type='primary' htmlType='submit' disabled={loading} loading={loading} />
            </Form>
          </div>
        )}
      </div>
    </section>
  )
}
