import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import type { MenuProps } from 'antd'
import { Input, Menu, Dropdown, Badge, Spin, Drawer, Button } from 'antd'

import { authApi, productApi } from '@/apis'

import { useApi, useBoolean, useDebouncedCallback } from '@/hooks'

import { useAuthStore, useCartStore } from '@/stores'

import { icons, NAVIGATION_ITEMS, PATH, topSearch } from '@/utils'

import { findActiveKey } from '@/utils'

import logo from '@/assets/images/logo.webp'
import { INavigationItem, IProduct } from '@/interfaces'

export function Header() {
  const { currentUser, setCurrentUser } = useAuthStore()
  const { productCount, setQuantity } = useCartStore()
  const location = useLocation()

  const [navItems, setNavItems] = useState<INavigationItem[]>([])
  const currentKey = findActiveKey(navItems, location.search)

  const { callApi: callApiLogout } = useApi<void>()
  const { loading, callApi: getBySearchQuery } = useApi<void>()
  const [query, setQuery] = useState<string>('')
  const [products, setProducts] = useState<IProduct[]>([])
  const { value: isSearching, setTrue: setTrueSearching, setFalse: setFalseSearching } = useBoolean(false)
  const { value: isFocus, setTrue: setTrueFocus, setFalse: setFalseFocus } = useBoolean(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { debouncedCallback } = useDebouncedCallback(async (searchQuery: string) => {
    await getProducts(searchQuery)
    setFalseSearching()
  }, 500)

  const getProducts = async (searchQuery: string) => {
    getBySearchQuery(async () => {
      const { data } = await productApi.getBySearchQuery({ searchQuery: searchQuery })
      setProducts(data.data)
    })
  }

  useEffect(() => {
    NAVIGATION_ITEMS.then(setNavItems)
  }, [])

  useEffect(() => {
    if (query) {
      setTrueSearching()
      debouncedCallback(query)
    } else {
      setProducts([])
    }
  }, [query])

  useEffect(() => {
    setQuery('')
  }, [location])

  const handleBlur = () => {
    setTimeout(() => {
      if (containerRef.current) {
        const activeElement = document.activeElement
        if (!containerRef.current.contains(activeElement)) {
          setFalseFocus()
        }
      }
    }, 100)
  }

  const handleLogout = () => {
    callApiLogout(async () => {
      await authApi.logout()
      setCurrentUser(null)
      setQuantity(0)
    })
  }

  const [isDrawerVisible, setDrawerVisible] = useState(false)

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible)
  }

  const actionsUser: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <span className='text-base'>
          <Link to={PATH.profile} className='flex justify-between items-center hover:text-white'>
            <span className='text-xl mr-2'>{icons.register}</span>
            Tài khoản
          </Link>
        </span>
      )
    },
    {
      key: 'logout',
      label: (
        <button className='text-base' onClick={handleLogout}>
          <span className='flex justify-between items-center hover:text-white'>
            <span className='text-xl mr-2'>{icons.login}</span>
            Đăng xuất
          </span>
        </button>
      )
    }
  ]
  const actionsAuth: MenuProps['items'] = [
    {
      key: 'register',
      label: (
        <span className='text-base'>
          <Link to={PATH.register} className='flex justify-between items-center hover:text-white'>
            <span className='text-xl mr-2'>{icons.register}</span>
            Đăng ký
          </Link>
        </span>
      )
    },
    {
      key: 'login',
      label: (
        <span className='text-base'>
          <Link to={PATH.login} className='flex justify-between items-center hover:text-white'>
            <span className='text-xl mr-2'>{icons.login}</span>
            Đăng nhập
          </Link>
        </span>
      )
    }
  ]
  return (
    <div className='w-full xl:w-1200 mx-auto'>
      <header className='flex flex-col lg:flex-row lg:gap-0 justify-between items-center py-4 w-full gap-4'>
        <div className='flex items-center'>
          <img className='w-40 h-16' src={logo} alt='logo' />
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-2 md:flex-row justify-between items-center border-b pb-2 mb-2'>
            <div className='flex items-center space-x-2'>
              <span className='text-xl'>{icons.phone}</span>
              <span className='text-base font-semibold uppercase'>
                Hotline:
                <a href='tel:1900 675' className='text-red-600'>
                  1900 6750
                </a>
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='text-xl'>{icons.location}</span>
              <Link to='/store-system' className='font-semibold hover:text-blue-600 uppercase'>
                Hệ thống cửa hàng
              </Link>
            </div>
            <div className='relative flex items-center' ref={containerRef}>
              <Input
                placeholder='Tìm sản phẩm'
                value={query}
                className='rounded-none w-[300px]'
                suffix={<span className='text-xl'>{icons.search}</span>}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={setTrueFocus}
                onBlur={handleBlur}
              />
              {isFocus && (
                <div
                  className='absolute right-0 bg-white border border-gray-300 rounded shadow-lg mt-1 z-10 p-2 w-full'
                  style={{ top: '100%' }}
                >
                  <div className='w-full flex flex-col items-center gap-1 divide-y-2'>
                    <div className='flex flex-row justify-center items-center'>
                      <span className='mr-2'>{icons.topSearch}</span>
                      <span className='uppercase'>Tìm kiếm nhiều nhất</span>
                    </div>
                    <div className='flex flex-wrap items-center p-1 gap-1 w-full'>
                      {topSearch.map((item) => (
                        <Link
                          to={`/search?page=1&searchQuery=${item.value}`}
                          key={item.value}
                          className='text-sm text-gray-700 bg-gray-200 p-1 rounded hover:bg-gray-300 transition duration-200'
                          onClick={setFalseFocus}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col items-center divide-y-2'>
                    {loading ? (
                      <div className='flex items-center justify-center'>
                        <Spin />
                      </div>
                    ) : products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.id} className='flex flex-row items-center p-2 gap-3 w-full'>
                          <Link
                            to={`/product/detail/${product.slug}`}
                            className='w-[20%] flex items-center justify-center'
                            onClick={setFalseFocus}
                          >
                            <img
                              src={product.productDetails[0].imgUrl}
                              alt={product.name}
                              className='w-[65px] h-[80px]'
                            />
                          </Link>
                          <div className='flex flex-col w-[85%] gap-1'>
                            <Link
                              to={`/product/detail/${product.slug}`}
                              className='text-sm text-gray-700'
                              onClick={setFalseFocus}
                            >
                              {product.name}
                            </Link>
                            <div>
                              {product.discount > 0 ? (
                                <div>
                                  <span className='text-blue-cyan font-semibold pr-2'>
                                    {(product?.price - (product?.price * product?.discount) / 100).toLocaleString(
                                      'de-DE'
                                    )}
                                    ₫
                                  </span>
                                  <span className='line-through text-gray-700'>
                                    {product?.price.toLocaleString('de-DE')}₫
                                  </span>
                                </div>
                              ) : (
                                <span className='text-blue-cyan font-semibold'>
                                  {product?.price.toLocaleString('de-DE')}₫
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      !isSearching && <div className='text-center py-2'>Không có sản phẩm</div>
                    )}
                  </div>
                  {!loading && products.length > 0 && (
                    <Link
                      to={`/search?page=1&searchQuery=${query}`}
                      className='text-gray-700 text-sm flex items-center justify-center'
                      onClick={setFalseFocus}
                    >
                      Xem tất cả kết quả
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          <Menu
            mode='horizontal'
            className='flex-col sm:flex-row justify-between items-center uppercase flex-1 text-center hidden md:flex'
            items={navItems.map((item) => ({
              ...item,
              style: { flex: 1, textAlign: 'center' }
            }))}
            selectedKeys={currentKey ? [currentKey] : []}
            overflowedIndicator={<div className='flex justify-center items-start text-4xl'>{icons.menu}</div>}
            disabledOverflow={true}
          />
          <Drawer
            placement='top'
            onClose={toggleDrawer}
            open={isDrawerVisible}
            className='bg-slate-300'
            closeIcon={null}
            styles={{
              body: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              },
              content: { paddingBottom: '12px' }
            }}
          >
            <Menu
              mode='inline'
              className='lg:max-w-[40%] max-w-[90%] top-0 max-h-[320px] lg:text-xl text-base'
              items={navItems.map((item) => ({
                ...item,
                style: { textAlign: 'center', width: '100%' },
                className: 'header-menu-item'
              }))}
              inlineIndent={28}
              selectedKeys={currentKey ? [currentKey] : []}
            />
          </Drawer>
          <div className='flex items-center justify-center md:hidden'>
            <Button type='text' icon={icons.menu} onClick={toggleDrawer} className='md:hidden text-center text-4xl' />
          </div>
        </div>

        <div className='flex items-center justify-between text-base gap-4'>
          <Dropdown
            menu={{ items: currentUser ? actionsUser : actionsAuth }}
            placement='bottomRight'
            trigger={['click']}
            arrow
          >
            <button className='flex flex-col justify-center items-center text-center border-none outline-none group'>
              <span className='p-3 rounded-full border border-gray-300'>{icons.user}</span>
              <span className='group-hover:text-dark-blue'>Tài khoản</span>
            </button>
          </Dropdown>

          <Link to={'/cart'} className='flex flex-col justify-center items-center relative text-center group'>
            <Badge count={productCount} showZero className='p-3 rounded-full border border-gray-300'>
              <span>{icons.shoppingBag}</span>
            </Badge>
            <span className='group-hover:text-dark-blue'>Giỏ hàng</span>
          </Link>
        </div>
      </header>
    </div>
  )
}
