import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form } from 'antd'

import { CustomBtn, CustomInput } from '@/components'

import { authFields } from '@/utils/constants'

type ResetPasswordData = {
  password: string
  confirmPassword: string
}
type NewPasswordProps = {
  loading: boolean
  errorMessage?: string
  handleResetPassword: (data: ResetPasswordData) => Promise<void>
}

const passwordSchema = yup.object().shape({
  password: yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu!'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu!')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp!')
})

export const Newpassword: React.FC<NewPasswordProps> = ({ loading, errorMessage, handleResetPassword }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  return (
    <section className='xs:px-4 md:px-0'>
      <h1 className='text-3xl text-dark-blue font-semibold mb-4'>Mật khẩu mới</h1>
      {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}
      <Form className='mt-6' onFinish={handleSubmit(handleResetPassword)} layout='vertical'>
        {authFields.map((field) => {
          if (field.name === 'password' || field.name === 'confirmPassword')
            return (
              <CustomInput
                name={field.name}
                size='large'
                type={field.type}
                control={control}
                errors={errors}
                placeholder={field.placeholder}
              />
            )
        })}

        <CustomBtn title='Tạo mật khẩu mới' type='primary' htmlType='submit' disabled={loading} loading={loading} />
      </Form>
    </section>
  )
}
