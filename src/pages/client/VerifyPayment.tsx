import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { message, Spin } from 'antd'
import Lottie from 'react-lottie'

import { useApi } from '@/hooks'
import { checkoutApi } from '@/apis'
import successAnimationData from '@/animation/Success.json'
import failAnimationData from '@/animation/Fail.json'

import { PATH, VerifyPaymentStatus } from '@/utils'

export const VerifyPayment = () => {
  const { loading: callOrderApiLoading, callApi: callOrderApi } = useApi<void>()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<{ status: VerifyPaymentStatus; message: string }>()
  const navigate = useNavigate()
  const orderId = searchParams.get('orderId')
  const sessionId = searchParams.get('sessionId')
  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      if (orderId && sessionId) {
        callOrderApi(async () => {
          const data = await checkoutApi.verifyPayment(orderId)
          if (data) {
            setStatus(data.data)
            if (data.data.status === VerifyPaymentStatus.Success) {
              message.success(data.data.message)
            } else {
              message.error(data.data.message)
            }
            setTimeout(() => {
              navigate(PATH.orders)
            }, 3000)
          } else {
            message.error('Đã xãy ra lỗi khi xác nhận thanh toán cho đơn hàng!')
            setStatus({ status: VerifyPaymentStatus.Failed, message: 'Thanh toán không thành công' })
          }
        })
      }
    }
  }, [])

  const getLottieAnimation = (status: VerifyPaymentStatus) => {
    return {
      loop: false,
      autoplay: true,
      animationData: status === VerifyPaymentStatus.Failed ? failAnimationData : successAnimationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
  }
  return !callOrderApiLoading ? (
    <div>
      {status?.status && (
        <Lottie options={getLottieAnimation(status?.status)} height={400} width={400} isStopped={false} />
      )}
      {status?.status === VerifyPaymentStatus.Failed && (
        <div className='mb-10 delay-75'>
          <div className='text-3xl text-red-600 font-bold uppercase'>{status.message}</div>
          <div className='text-slate-700 text-base'>Xin kiểm tra lại đơn hàng!</div>
        </div>
      )}

      {status?.status === VerifyPaymentStatus.Success && (
        <div className='mb-10 delay-75'>
          <div className='text-3xl text-green-600 font-bold uppercase'>{status.message}</div>
          <div className='text-slate-700 text-base'>FashionUIT xin chân thành cám ơn!</div>
        </div>
      )}
    </div>
  ) : (
    <Spin />
  )
}
