import { OrderStatus } from '@/utils/common'

export const getOrderStatusByEnum = (orderEnum: OrderStatus) => {
  const orderStatusMap: Record<OrderStatus, string> = {
    [OrderStatus.Delivered]: 'Giao hàng thành công',
    [OrderStatus.Delivering]: 'Đang giao hàng',
    [OrderStatus.Confirmed]: 'Đã xác nhận',
    [OrderStatus.Pending]: 'Đang xử lí',
    [OrderStatus.Cancelled]: 'Đã hủy'
  }

  return orderStatusMap[orderEnum] || 'Trạng thái không xác định'
}
