import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Col, Row, Table, Image, Modal, message, Button } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'

import { useCartStore } from '@/stores'

import { useApi, useBoolean, useDebouncedCallback } from '@/hooks'

import { cartApi } from '@/apis'

import { errorResponseCases, icons } from '@/utils'

import { ICartProduct, IFetchedCartItem } from '@/interfaces'

import { CustomBtn, CustomBreadcrumb, CustomInput } from '@/components'

export function Cart() {
  const navigate = useNavigate()
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const { loading, errorMessage, callApi: callCartApi } = useApi<void>()
  const { loading: loadingDeleteCart, errorMessage: errorDeleteCart, callApi: callDeleteCartApi } = useApi<void>()
  const {
    value: isOpenDeleteMultipleModal,
    setTrue: openDeleteMultipleModal,
    setFalse: closeDeleteMultipleModal
  } = useBoolean()
  const [cartItems, setCartItems] = useState<ICartProduct[]>([])
  const [checkoutItems, setCheckoutItems] = useState<ICartProduct[]>([])
  const { productCount, removeFromCart } = useCartStore()
  const [width, setWidth] = useState(window.innerWidth)
  const openDeleteModal = (id: string) => {
    setSelectedRowId(id)
  }

  const closeDeleteModal = () => {
    setSelectedRowId(null)
  }

  const columns: TableColumnsType<ICartProduct> = [
    {
      title: <h2 className='uppercase font-bold text-center'>Thông tin sản phẩm</h2>,
      key: 'informations',
      dataIndex: 'informations',
      width: 390,
      render: (_, record) => (
        <>
          <Row gutter={8}>
            <Col span={6}>
              <Image src={record.imgUrl} alt={record.name} />
            </Col>
            <Col span={18} className='pl-4'>
              <h6 className='text-sm font-medium line-clamp-2'>{record.name}</h6>
              <div className='text-xs capitalize'>
                {record.color} / {record.size}
              </div>
              <CustomBtn
                type='text'
                title='Xóa'
                className='!text-rose-600 !text-base !hover:underline !bg-transparent !border-none !w-fit !mt-0 !p-0 !h-fit'
                onClick={() => openDeleteModal(record.id)}
              />
            </Col>
          </Row>
          <Modal
            className='bg-inherit'
            open={selectedRowId === record.id}
            title='Xóa'
            onClose={closeDeleteModal}
            onCancel={closeDeleteModal}
            footer={() => (
              <div className='flex justify-end'>
                <div className='flex w-fit gap-3'>
                  <CustomBtn
                    key='cancel'
                    title='Hủy'
                    onClick={closeDeleteModal}
                    type='default'
                    className='px-5 py-1 !w-fit !h-9'
                  />
                  <CustomBtn
                    key='delete'
                    title='Xóa'
                    onClick={() => handleDeleteCartItem(record.id)}
                    loading={loading}
                    disabled={loading}
                    type='primary'
                    className='px-5 py-1 !w-fit !h-9'
                  />
                </div>
              </div>
            )}
          >
            Bạn có muốn xóa sản phẩm này không?
          </Modal>
        </>
      )
    },
    {
      title: <h2 className='uppercase font-bold text-center'>Đơn giá</h2>,
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (_, record) => (
        <div className='text-red-600 font-bold text-center p-2'>
          {(record.price * (1 - record.discount / 100)).toLocaleString('de-DE')}đ
        </div>
      )
    },
    {
      title: <h2 className='uppercase font-bold text-center'>Số lượng</h2>,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (_, record) => (
        <div className='relative flex items-center max-w-[8rem]'>
          <CustomBtn
            className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg rounded-e-none !mt-0 p-2 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none z-10'
            onClick={() => {
              handleChangeQuantity(Math.max(record.quantity - 1, 1), record)
            }}
            disabled={record.quantity <= 1}
            children={icons.minus}
          />
          <CustomInput
            name={record.name}
            size='small'
            placeholder='Nhập số lượng'
            type='text'
            maxLength={2}
            value={record.quantity}
            className='bg-gray-50 border-gray-300 h-8 text-center text-black text-sm focus:ring-blue-500 focus:border-blue-500 block py-2 w-full rounded-none'
            onChange={(e) => {
              handleChangeQuantity(Math.min(parseInt(e.target.value, 10), (record?.stock ?? 0)), record)
            }}
          />
          <CustomBtn
            className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg rounded-l-none !mt-0 p-2 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none'
            onClick={() => {
              handleChangeQuantity(Math.min(record.quantity + 1, record.stock), record)
            }}
            disabled={record.quantity >= record.stock || record.quantity >= 99}
            children={icons.plus}
          />
        </div>
      )
    },
    {
      title: <h2 className='uppercase font-bold text-center'>Thành tiền</h2>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 160,
      render: (_, record) => (
        <div className='text-red-600 font-bold text-center px-5'>
          {(record.price * (1 - record.discount / 100) * record.quantity).toLocaleString('de-DE')}đ
        </div>
      )
    }
  ]

  const getCartItems = () => {
    callCartApi(async () => {
      const { data } = await cartApi.getCart()
      if (data) {
        const cartProducts: ICartProduct[] = data.cartProducts?.map((item: IFetchedCartItem) => ({
          id: item.id,
          productDetailId: item.productDetail.id,
          name: item.productDetail.product.name,
          slug: item.productDetail.product.slug,
          price: item.productDetail.product.price,
          discount: item.productDetail.product.discount,
          size: item.productDetail.size,
          color: item.productDetail.colorName,
          quantity: item.quantity,
          imgUrl: item.productDetail.imgUrl,
          stock: item.productDetail.stock
        }))
        setCartItems(cartProducts)
      }
    })
  }

  const rowSelection: TableProps<ICartProduct>['rowSelection'] = {
    onChange: (_, selectedRows: ICartProduct[]) => {
      setCheckoutItems(selectedRows)
    }
  }

  const { debouncedCallback } = useDebouncedCallback(async (id: string, value: number) => {
    await cartApi.updateCartItem(id, { quantity: value })
  }, 500)

  const handleChangeQuantity = (value: number, cartItem: ICartProduct) => {
    if (value) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === cartItem.id ? { ...item, quantity: value } : item))
      )
      setCheckoutItems((prevItems) =>
        prevItems.map((item) => (item.id === cartItem.id ? { ...item, quantity: value } : item))
      )
      if (value <= Math.min(99, cartItem.stock) && value > 0) debouncedCallback(cartItem.id, value)
      else if (value <= 0) message.error('Số lượng không được nhỏ hơn 1')
      else message.error('Vượt quá số lượng tối đa')
    }
  }

  const handleDeleteCartItem = async (id: string) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id)
    const updatedCheckoutItems = checkoutItems.filter((checkoutItem) => checkoutItem.id !== id)
    await callDeleteCartApi(async () => {
      const { data } = await cartApi.deleteCartItem(id)
      if (data) {
        message.success('Xóa sản phẩm thành công')
        setCartItems(updatedCartItems)
        removeFromCart(1)
        setCheckoutItems(updatedCheckoutItems)
        closeDeleteModal()
      }
    })
  }

  const handleDeleteMultipleCartItems = async () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => !checkoutItems.some((checkoutItem) => cartItem.id === checkoutItem.id)
    )

    const deleteIds = checkoutItems.map((item) => item.id)

    await callDeleteCartApi(async () => {
      const { data } = await cartApi.deleteMultipleCartItems(deleteIds)
      if (data) {
        message.success('Xóa sản phẩm thành công')
        removeFromCart(checkoutItems.length)
        setCartItems(updatedCartItems)
        setCheckoutItems([])
        closeDeleteMultipleModal()
      }
    })
  }

  const isCheckoutDisabled = (items: ICartProduct[]) => {
    return items.length === 0 || items.some((item) => item.quantity > Math.min(99, item.stock) || item.quantity < 1)
  }

  const items = [{ title: <Link to='/'>Trang chủ</Link> }, { title: 'Giỏ hàng' }]

  useEffect(() => {
    getCartItems()
  }, [productCount])
  
  useEffect(() => {
    const showError = (error: string, redirectPath: string | null) => {
      if (error) {
        message.error(error)
        if (redirectPath) {
          navigate(redirectPath)
        }
      }
    }

    showError(errorMessage, errorMessage === errorResponseCases['Login'] ? '/login' : null)
    showError(errorDeleteCart, null)
  }, [errorMessage, errorDeleteCart, navigate])

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <CustomBreadcrumb items={items} />
      <Modal
        open={isOpenDeleteMultipleModal}
        title='Xóa'
        onClose={closeDeleteMultipleModal}
        onCancel={closeDeleteMultipleModal}
        footer={() => (
          <div className='flex justify-end'>
            <div className='flex w-fit gap-3'>
              <CustomBtn
                key='cancel'
                title='Hủy'
                onClick={closeDeleteMultipleModal}
                type='default'
                className='px-5 py-1 !w-fit !h-9'
              />
              <CustomBtn
                key='delete'
                title='Xóa'
                onClick={handleDeleteMultipleCartItems}
                loading={loadingDeleteCart}
                disabled={loading}
                type='primary'
                className='px-5 py-1 !w-fit !h-9'
              />
            </div>
          </div>
        )}
      >
        Bạn có muốn xóa những sản phẩm này không?
      </Modal>
      <div className='xl:w-1200 mx-auto my-2'>
        <h1 className='uppercase text-left font-bold p-3 bg-gray-100'>Giỏ hàng của bạn</h1>
        <Row className='mt-2' gutter={12}>
          <Col span={width >= 1024 ? 18 : 24}>
            <Table<ICartProduct>
              pagination={cartItems.length > 10 ? undefined : false}
              columns={columns}
              loading={loading}
              rowSelection={{ type: 'checkbox', ...rowSelection }}
              dataSource={cartItems}
              rowKey={(record) => record.id}
              scroll={
                columns.length > 0 ? { y: cartItems.length > 5 ? 100 * 5 : undefined, x: 'max-content' } : undefined
              }
            />
            <Row justify='space-between' align='bottom' className='mt-3'>
              <Col className='mb-2 w-full px-5 xs:w-fit xs:p-0 '>
                <CustomBtn title='Tiếp tục mua hàng' to='/products' icon={icons.prevPage} className='w-full' />
              </Col>
              <Col className='w-full xs:w-1/2 md:w-1/3 xl:w-1/2'>
                <div className='flex flex-col-reverse xl:flex-row items-end w-full xs:mb-2'>
                  <Col span={width > 1024 ? 12 : 24} className='px-5 w-full xs:p-0'>
                    <CustomBtn
                      className={`w-[92%] ${
                        !(checkoutItems.length === 0) &&
                        '!text-rose-500 !border-rose-500 hover:!border-rose-500 hover:!text-rose-500 hover:!text-opacity-50 hover:!border-opacity-50'
                      }`}
                      disabled={checkoutItems.length === 0}
                      onClick={openDeleteMultipleModal}
                      title='Xóa các mục đã chọn'
                    />
                  </Col>
                  <Col
                    span={width > 1024 ? 12 : 24}
                    className='w-full fixed bottom-0 bg-white z-10 rounded p-5 xs:static xs:bg-inherit xs:p-0 xs:rounded-none'
                  >
                    <Row gutter={12} justify='space-between'>
                      <Col>
                        <div className='font-bold uppercase w-full text-base'>
                          <span>tổng tiền: </span>
                        </div>
                      </Col>
                      <Col>
                        <div className='font-bold text-red-500 text-end w-full text-base'>
                          <span>
                            {checkoutItems.length
                              ? checkoutItems
                                  .reduce(
                                    (acc, item) =>
                                      acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
                                    0
                                  )
                                  .toLocaleString('de-DE')
                              : 0}
                          </span>
                          đ
                        </div>
                      </Col>
                    </Row>

                    <Button
                      size='large'
                      className='w-[97%] h-12 text-lg mt-4 font-semibold rounded-md bg-dark-blue text-white hover:!bg-blue-cyan hover:opacity-90 disabled:bg-blue-cyan disabled:opacity-70 disabled:cursor-not-allowed disabled:!text-white'
                      type='primary'
                      disabled={isCheckoutDisabled(checkoutItems)}
                    >
                      <Link
                        to='/checkout'
                        state={{
                          checkoutItems,
                          totalPrice: checkoutItems.length
                            ? checkoutItems.reduce(
                                (acc, item) => acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
                                0
                              )
                            : 0
                        }}
                      >
                        Thanh toán
                      </Link>
                    </Button>
                  </Col>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={width >= 1024 ? 6 : 24} className='relative w-full'>
            <fieldset className='relative bg-white rounded mb-5 mt-2.5 p-3 border border-dashed border-blue-cyan bg-dark-blue-02'>
              <legend className='flex justify-center items-center w-auto text-dark-blue font-semibold bg-dark-blue-02 rounded border border-solid border-current text-base mb-0 px-2.5 uppercase whitespace-normal text-left'>
                <img
                  alt='MÃ GIẢM GIÁ'
                  src='//bizweb.dktcdn.net/100/451/884/themes/857425/assets/code_dis.gif?1727683533447'
                  className='max-w-6 mix-blend-multiply align-middle'
                />
                mã giảm giá
              </legend>
              {[0, 1, 2].map((item) => (
                <div className='relative bg-white drop-shadow p-1.5 mb-3.5 text-left' key={item}>
                  <Row justify='space-between' className='relative'>
                    <div className='flex justify-between relative w-full'>
                      <span className='block mb-0 font-bold text-left relative text-dark-blue uppercase '>10% off</span>
                      <img
                        width='36'
                        height='20'
                        src='//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon1_value_img.png?1727683533447'
                        alt='10% OFF'
                      />
                    </div>
                  </Row>
                  <div>
                    Giảm <b>10%</b> cho đơn hàng từ <b>500k.</b>
                  </div>
                  <div className='p-1 mt-1 relative bg-gray-100 rounded flex justify-between items-center'>
                    <span className='mb-0 inline-block text-base uppercase font-semibold'>BFAS10</span>
                    <CustomBtn className='float-right !m-0 !w-[80px] h-[35px]' type='primary' title='Copy' />
                  </div>
                </div>
              ))}
            </fieldset>
          </Col>
        </Row>
      </div>
    </div>
  )
}
