import React, { useEffect, useState } from 'react'

import { Button, Col, Image, message, Modal, Popconfirm, Row, Table, TableColumnsType } from 'antd'

import { IOrderProduct, IOrderReturn, IUseBoolean } from '@/interfaces'
import { useApi, useWindowSize } from '@/hooks'
import {
  ConvertDateString,
  ConvertTimeString,
  getOrderStatusByEnum,
  icons,
  OrderStatus,
  PaymentMethod,
  PaymentStatus
} from '@/utils'
import { checkoutApi, orderApi } from '@/apis'

type OrderDetailModalProps = {
  modalControl: IUseBoolean
  defaultData: IOrderReturn
  fetchOrders: () => void
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ modalControl, defaultData, fetchOrders }) => {
  const { loading: callOrderApiLoading, callApi: callOrderApi } = useApi<void>()
  const [order, setOrder] = useState<IOrderReturn>()
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const windowSize = useWindowSize()
  const columns: TableColumnsType<IOrderProduct> = [
    {
      title: <h2 className='uppercase font-bold text-center min-w-[200px]'>Thông tin sản phẩm</h2>,
      className: '!px-2',
      key: 'informations',
      dataIndex: 'informations',
      width: 200,
      render: (_, record) => (
        <>
          <Row gutter={8}>
            <Col span={7}>
              <Image src={record.imgUrl} alt={record.name} />
            </Col>
            <Col span={17} className='pl-4 flex flex-col justify-between'>
              <div>
                <h6 className='text-sm font-medium line-clamp-2 text-ellipsis'>{record.name}</h6>
                <div className='text-xs capitalize'>
                  {record.colorName} / {record.size}
                </div>
              </div>
              <div className='text-red-600 font-bold pb-2'>
                {(record.price * (1 - record.discount / 100)).toLocaleString('de-DE')}đ
              </div>
            </Col>
          </Row>
        </>
      )
    },
    {
      title: <h2 className='uppercase font-bold text-center'>Số lượng</h2>,
      className: '!px-2',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (_, record) => <div className='relative flex items-center justify-center  w-full '>{record.quantity}</div>
    },
    {
      title: <h2 className='uppercase font-bold text-center'>Thành tiền</h2>,
      className: '!px-2',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 160,
      render: (_, record) => (
        <div className='text-red-600 font-bold text-center w-full'>
          {(record.price * (1 - record.discount / 100) * record.quantity).toLocaleString('de-DE')}đ
        </div>
      )
    }
  ]
  const handleCancelOrder = () => {
    callOrderApi(async () => {
      const data = await orderApi.cancelOrder(defaultData.id)
      if (data) {
        fetchOrders()
        modalControl.setFalse()
        message.success('Hủy đơn hàng thành công!')
      } else {
        message.error('Đã xảy ra lỗi khi hủy đơn hàng!')
      }
    })
  }
  const handleVerifyPayment = () => {
    callOrderApi(async () => {
      const data = await checkoutApi.verifyPayment(defaultData.id)
      if (data) {
        if (data.data.status == 'SUCCESS') {
          message.success('Xác nhận thành công. Đơn hàng đã được thanh toán!')
          modalControl.setFalse()
          fetchOrders()
        } else {
          message.error('Xác nhận thất bại. Đơn hàng chưa được thanh toán!!')
          modalControl.setFalse()
        }
      } else {
        message.error('Đã xãy ra lỗi khi xác nhận thanh toán cho đơn hàng!')
      }
    })
  }
  const handleCreateStripeOrder = () => {
    callOrderApi(async () => {
      const data = await checkoutApi.createRepayStripeUrl(defaultData.id)
      if (data) {
        window.location.href = data.data
      } else {
        message.error('Đã xãy ra lỗi khi tạo liên kết thanh toán!')
      }
    })
  }
  const fetchOrder = (orderId: string) => {
    if (orderId) {
      setModalLoading(true)
      callOrderApi(async () => {
        const data = await orderApi.getOrder(orderId)
        if (data.data) {
          setOrder(data?.data)
        } else {
          modalControl.setFalse()
        }
        setModalLoading(false)
      })
    }
  }
  useEffect(() => {
    fetchOrder(defaultData.id)
  }, [defaultData.id])
  return (
    <Modal
      title={[
        <div key={'modal-title'} className='text-xl'>
          Order ID: <span className='text-dark-blue underline'>{order?.id}</span>
        </div>
      ]}
      open={modalControl.value}
      onClose={() => modalControl.setFalse()}
      onCancel={() => modalControl.setFalse()}
      width={800}
      className='top-16'
      loading={modalLoading}
      footer={
        order && [
          order.paymentMethod === PaymentMethod.Stripe && order.paymentStatus === PaymentStatus.Unpaid && (
            <Button
              key={'modal-footer-btn-1'}
              size='large'
              loading={callOrderApiLoading}
              onClick={handleCreateStripeOrder}
              className='font-semibold text-base text-white bg-green-500 !border-green-500 hover:!bg-green-400 hover:!text-white hover:!border-green-400 '
            >
              Thanh toán ngay
            </Button>
          ),
          <Popconfirm
            key={'modal-footer-btn-2'}
            title='Hủy đơn hàng'
            description='Bạn chắc chắn muốn hủy đơn hàng này?'
            onConfirm={handleCancelOrder}
            okText='Yes'
            cancelText='No'
            okButtonProps={{
              danger: true
            }}
          >
            <Button
              disabled={order.orderStatus !== OrderStatus.Pending}
              className='enabled:hover:!bg-red-500 enabled:hover:!text-white'
              danger={true}
              size='large'
              loading={callOrderApiLoading}
            >
              Hủy đơn hàng
            </Button>
          </Popconfirm>
        ]
      }
    >
      {order && (
        <div className=' rounded p-3 border border-dashed border-blue-cyan items-center flex flex-col gap-2 bg-slate-100'>
          <div className='flex flex-col w-full gap-2'>
            <div className='uppercase font-bold text-xl text-dark-blue py-[1px] justify-self-center text-center'>
              Thông tin thanh toán
            </div>
            <div className={`flex md:gap-14 gap-2 ${windowSize.width < 720 && 'flex-col'}`}>
              <div className=' w-full'>
                <div className='flex items-center justify-between w-full'>
                  <div className='font-semibold flex gap-2'>
                    <span className='text-red-600 text-2xl'>{icons.filledLocation}</span>
                    <span className='text-lg text-red-800'>Địa chỉ nhận hàng:</span>
                  </div>
                </div>
                {order?.address && (
                  <div>
                    <div className='font-semibold text-base'>
                      <span>{order?.address?.name} </span>
                      <span>({order?.address?.phoneNumber})</span>
                    </div>
                    <div className=' text-slate-700'>
                      {`${order?.address?.addressDetail}, ${order?.address?.ward}, ${order?.address?.district}, ${order?.address?.province}`}
                    </div>
                  </div>
                )}
              </div>
              <div className='w-0 border-dashed border-r-[1px] border-gray-400'></div>
              <div className='w-full'>
                <div className='flex items-center  justify-between w-full'>
                  <div className='font-semibold  flex gap-2 '>
                    {windowSize.width > 720 && <span className='text-blue-600 text-2xl'>{icons.delivery}</span>}
                    <span className='text-lg text-blue-600'>Phương thức vận chuyển:</span>
                  </div>
                </div>
                <div className='flex justify-between w-full'>
                  <div>
                    <div className='font-bold text-base'>
                      <span>Tiêu chuẩn</span>
                    </div>
                    <div className=' text-slate-700'>Đảm bảo nhận hàng sau 3-5 ngày</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 w-full'>
              <div
                className={`flex items-center md:gap-4 gap-0 w-full ${windowSize.width < 720 && 'flex-col !items-start'}`}
              >
                <div className='font-semibold  flex '>
                  <span className='text-lg '>Phương thức thanh toán:</span>
                </div>
                <div className={`text-slate-700 font-semibold`}>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl text-lime-600 '>
                      {order?.paymentMethod == PaymentMethod.COD ? icons.cash : icons.bank}
                    </span>
                    <span className='text-base text-lime-600'>
                      {order?.paymentMethod == PaymentMethod.COD ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='font-bold text-base'>
                {windowSize.width > 640 ? 'Trạng thái thanh toán:' : 'Thanh toán:'}
              </div>

              {order?.paymentStatus === PaymentStatus.Paid ? (
                <div className='font-semibold text-base text-green-500'> Đã thanh toán</div>
              ) : (
                <div className='font-semibold text-base text-red-500'> Chưa thanh toán</div>
              )}
            </div>

            {order?.paymentStatus === PaymentStatus.Paid && (
              <div className='flex items-center gap-2'>
                <div className='font-bold text-base'>Ngày thanh toán: </div>
                <div className=' text-base '>
                  {ConvertTimeString(order.paidAt)} {ConvertDateString(order.paidAt)}
                </div>
              </div>
            )}
            {order.paymentMethod === PaymentMethod.Stripe && order.paymentStatus === PaymentStatus.Unpaid && (
              <div className='flex items-center gap-2'>
                <div className='font-bold text-base'> Đã thanh toán?</div>
                <Button
                  loading={callOrderApiLoading}
                  onClick={handleVerifyPayment}
                  className='font-semibold text-base border-[1px] border-primary border-solid'
                  type='link'
                  color='default'
                >
                  Kiểm tra
                </Button>
              </div>
            )}
            <div className='flex items-end gap-2'>
              <div className='font-bold text-base'>
                {windowSize.width > 640 ? 'Tình trạng đơn hàng:' : 'Tình trạng:'}
              </div>
              <div
                className={`font-semibold text-base ${[OrderStatus.Delivered, OrderStatus.Confirmed, OrderStatus.Delivering].includes(order.orderStatus) ? 'text-green-500' : order?.orderStatus === OrderStatus.Pending ? 'text-slate-500' : 'text-red-500'}`}
              >
                {getOrderStatusByEnum(order.orderStatus)}
              </div>
            </div>
            <div className='justify-start items-start flex flex-col gap-2'>
              <div className='text-lg font-bold'>Lời nhắn:</div>
              {order?.message && (
                <div className='border-[1px] border-gray-300 border-solid h-20 overflow-y-scroll w-full bg-gray-100 px-2 py-1'>
                  {order?.message}
                </div>
              )}
            </div>
          </div>
          <div className='w-full border-[1px] border-gray-400 border-solid'>
            <Table<IOrderProduct>
              columns={columns}
              dataSource={order?.products}
              rowKey={(record) => record.id}
              loading={modalLoading}
              scroll={
                columns?.length > 0
                  ? {
                      y: order?.products && order?.products?.length > 2 ? 120 * 2 : undefined,
                      x: 'fit-content'
                    }
                  : undefined
              }
              pagination={false}
              className='w-full'
            />
          </div>
          <div className='flex flex-col-reverse xl:flex-row items-end w-full xs:mb-2'>
            <div className='font-bold w-full text-base text-left flex justify-end gap-4 '>
              <span>Tổng tiền: </span>
              <span className='text-red-500'>
                {order?.products.length ? order?.totalPrice.toLocaleString('de-DE') : 0}đ
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
