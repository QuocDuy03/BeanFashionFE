import { useEffect, useRef } from 'react'

import { useParams } from 'react-router-dom'

import { Result, Spin } from 'antd'

import { authApi } from '@/apis'

import { useApi } from '@/hooks'

import { CustomBtn } from '@/components'

type ParamsProps = {
  userId: string
}
export function VerifyEmail() {
  const { userId } = useParams<ParamsProps>()

  const initialized = useRef(false)

  const { loading, errorMessage, callApi: callApiVerifyEmail } = useApi<void>()

  const handleVerifyEmail = (userId: string) => {
    callApiVerifyEmail(async () => {
      await authApi.verifyEmail(userId)
    })
  }

  useEffect(() => {
    if (userId && !initialized.current) {
      initialized.current = true
      handleVerifyEmail(userId)
    }
  }, [userId])

  return (
    <div className='flex items-center justify-center bg-white'>
      {loading && <Spin size='large' />}
      {!loading && errorMessage ? (
        <Result
          status='error'
          title='Xác thực email thất bại'
          subTitle={errorMessage}
          extra={[
            <>
              <CustomBtn key='Back home' title='Trang chủ' to='/' className='!w-[120px]' />
              <CustomBtn key='Register' title='Đăng ký' to='/register' type='primary' className='!w-[120px]' />
            </>
          ]}
        />
      ) : (
        <Result
          status='success'
          title='Xác thực email thành công'
          extra={[
            <>
              <CustomBtn key='Back home' title='Trang chủ' to='/' className='!w-[120px]' />
              <CustomBtn key='Login' title='Đăng nhập' to='/login' type='primary' className='!w-[120px]' />
            </>
          ]}
        />
      )}
    </div>
  )
}
