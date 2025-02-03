import React, { useRef } from 'react'

import { Button, Input, Row, Col } from 'antd'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { CustomBtn } from '@/components'
import { validationRegex } from '@/utils'

type VerifyOtpProps = {
  loading: boolean
  errorMessage?: string
  onVerifyOtp: (otp: string) => void
}
type FormData = {
  otp: string[]
}

const otpSchema = yup.object().shape({
  otp: yup.array().required().length(6).of(yup.string().required('Vui lòng nhập đầy đủ 6 chữ số'))
})
export const VerifyOtp: React.FC<VerifyOtpProps> = ({ loading, errorMessage, onVerifyOtp }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputs = useRef<any[]>([])

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: Array(6).fill('')
    }
  })

  const otpValue = watch('otp') || []

  const handleChange = (otpValue: string, index: number) => {
    if (validationRegex.NUMBER_REGEX.test(otpValue)) {
      const otp = getValues('otp') || []
      otp[index] = otpValue
      setValue('otp', otp)
      if (otpValue && index < otp.length - 1) {
        inputs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      !validationRegex.NUMBER_REGEX.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      !e.metaKey
    ) {
      e.preventDefault()
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (index > 0) {
        inputs.current[index - 1].focus()
      }
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const onSubmit = (data: FormData) => {
    const otpValue = data.otp.join('')
    onVerifyOtp(otpValue)
  }

  return (
    <div className='flex flex-1 bg-white'>
      <div className='max-w-md mx-auto text-center bg-white rounded-xl'>
        <header className='mb-5'>
          <h1 className='text-3xl text-dark-blue font-semibold mb-4'>Xác thực OTP</h1>
          <span className='text-lg text-slate-700'>
            Một mã 6 chữ số đã được gửi đến email của bạn
            <br />
            Vui lòng nhập vào ô bên dưới
          </span>
          <br />
          {errorMessage && <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>}
        </header>
        <form id='otp-form' onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={0} justify='space-between'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Col key={`otp.${index}`}>
                  <Controller
                    name={`otp.${index}`}
                    control={control}
                    render={() => (
                      <Input
                        type='text'
                        value={otpValue[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={handleFocus}
                        ref={(el) => (inputs.current[index] = el)}
                        maxLength={1}
                        className='lg:w-[60px] lg:h-[60px] text-center w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] text-2xl hover:border-dark-blue focus-within:border-dark-blue focus-within:shadow-dark-blue'
                      />
                    )}
                  />
                </Col>
              ))}
          </Row>

          {errors.otp && Array.isArray(errors.otp) && errors.otp.length > 0 && (
            <span className='block text-left text-base  font-normal text-red-500 mt-2'>
              {errors.otp[errors.otp.length - 1].message}
            </span>
          )}

          <CustomBtn title='Xác nhận' type='primary' htmlType='submit' disabled={loading} />
        </form>

        <div className='text-lg text-slate-700 mt-4'>
          Chưa nhận được OTP?
          <Button type='link' className='font-medium text-lg hover:underline text-dark-blue mx-0 px-0'>
            Gửi lại
          </Button>
        </div>
      </div>
    </div>
  )
}
