import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'

import { cartApi, userApi } from '@/apis'

import { useApi } from '@/hooks'

import { useAuthStore } from '@/stores'

import { Header, Footer } from './partials'
import { useCartStore } from '@/stores'

const { Content } = Layout

export const DefaultLayout = () => {
  const { currentUser, setCurrentUser } = useAuthStore()
  const { callApi: callApiGetCurrentUser } = useApi<void>()

  const { setQuantity, resetCart } = useCartStore()
  const { callApi: callApiGetQuantityInCart } = useApi<void>()

  const handleGetCurrentUser = () => {
    callApiGetCurrentUser(async () => {
      const { data } = await userApi.getCurrentUser()
      if (data) {
        setCurrentUser(data)
      }
    })
  }

  const handleGetQuantityInCart = () => {
    callApiGetQuantityInCart(async () => {
      const { data } = await cartApi.getCart()
      if (data) {
        setQuantity(data.cartProducts?.length)
      }
    })
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser)
      handleGetQuantityInCart()
    else 
      resetCart()
  }, [currentUser])
  return (
    <Layout className='w-full max-w-full min-h-screen overflow-hidden bg-white'>
      <Header />
      <Content className='text-center min-h-[400px] text-black'>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}
