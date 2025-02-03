import { IAddressReturn } from './address.interface'
import { FilterOptions, OrderStatus, PaymentMethod, PaymentStatus, SortOptions } from '@/utils'

export interface IOrder {
  products: {
    productDetailId: string
    quantity: number
  }[]
  totalPrice: number
  address: IAddressReturn
  paymentMethod: PaymentMethod
  message: string
}
export interface IOrderProduct {
  color: string
  colorName: string
  discount: number
  id: string
  imgUrl: string
  name: string
  price: number
  quantity: number
  size: string
  slug: string
}
export interface IOrderReturn {
  address: IAddressReturn
  id: string
  message: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  products: IOrderProduct[]
  createdAt: string
  paidAt: string
  totalPrice: number
}
export interface IOrderQuery {
  page: number
  limit: number
  keyword?: string
  sortBy?: SortOptions
  filter?: FilterOptions
}
