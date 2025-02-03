import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Checkbox, Form, message } from 'antd'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { authApi } from '@/apis'

import { useApi } from '@/hooks'

import { useAuthStore } from '@/stores'

import { ILoginData } from '@/interfaces'

import { authFields, PATH } from '@/utils/constants'

import { CustomBtn, CustomInput } from '@/components'

const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
  password: yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu!')
})

export function Login() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, resetMessage } = useAuthStore()
  const { loading, errorMessage, callApi: callApiLogin } = useApi<void>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const handleLogin = (loginData: ILoginData) => {
    resetMessage()
    callApiLogin(async () => {
      const { data } = await authApi.login(loginData)
      if (data) {
        setCurrentUser(data.currentUser)
        reset()
        message.success('Đăng nhập thành công')
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
      <div className='lg:w-[500px] md:w-[450px] h-full mx-auto p-10 bg-white shadow-dark-blue rounded-md overflow-hidden'>
        <h1 className='text-3xl text-dark-blue font-semibold mb-4'>Đăng nhập</h1>
        <span className='text-lg'>Chưa có tài khoản, đăng ký </span>

        <Link to='/register' className='text-lg text-dark-blue font-normal hover:underline'>
          tại đây
        </Link>
        <br />
        {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}

        <Form className='mt-6' onFinish={handleSubmit(handleLogin)} layout='vertical'>
          {authFields.map((field) => {
            if (field.name === 'email' || field.name === 'password')
              return (
                <CustomInput
                  key={field.name}
                  name={field.name}
                  size='large'
                  type={field.type}
                  control={control}
                  errors={errors}
                  placeholder={field.placeholder}
                />
              )
          })}
          <div className='flex justify-between items-center'>
            <Checkbox className='min-w-[100px] text-base'>Ghi nhớ</Checkbox>
            <span className='w-full text-right text-base font-normal text-red-500 hover:underline'>
              <Link to={PATH.forgotPassword} className='hover:text-red-500'>
                Quên mật khẩu?
              </Link>
            </span>
          </div>
          <CustomBtn title='Đăng nhập' type='primary' htmlType='submit' disabled={loading} loading={loading} />
        </Form>
      </div>
    </section>
  )
}
