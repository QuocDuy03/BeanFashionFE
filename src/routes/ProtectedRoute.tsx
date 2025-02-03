import { ReactNode, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { Result, Spin } from 'antd'

import { userApi } from '@/apis'

import { useAuthStore } from '@/stores'

import { useApi, useBoolean } from '@/hooks'

type ProtectedRouteProps = {
  role: string
  children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { currentUser, setCurrentUser } = useAuthStore()

  const { callApi: callApiGetCurrentUser, loading, errorMessage } = useApi()

  const { value: isFetched, toggle: setIsFetched } = useBoolean(false)

  const handleGetCurrentUser = async () => {
    await callApiGetCurrentUser(async () => {
      const { data: currentUser } = await userApi.getCurrentUser()
      setCurrentUser(currentUser)
      setIsFetched()
    })
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  if (loading && !isFetched) return <Spin size='large' />

  if (isFetched && !currentUser) return <Navigate to='/login' replace />

  if (isFetched && role !== currentUser?.role) {
    return <Result status='403' title='403' subTitle='Bạn không có quyền truy cập trang này' />
  }
  if (errorMessage) {
    return <span className='text-red-500 mb-2 text-lg'>{errorMessage}</span>
  }

  return <>{children}</>
}
