import { IProduct } from './product.interface'

export interface IFetchedCartItem {
  id: string
  quantity: number
  productDetail: {
    id: string
    size: string
    colorName: string
    imgUrl: string
    stock: number
    product: {
      name: string
      price: number
      discount: number
      slug: string
    }
  }
}

export interface ICartProduct extends Pick<IProduct, 'name' | 'price' | 'discount' | 'slug'> {
  id: string
  productDetailId: string
  size: string
  color: string
  quantity: number
  imgUrl: string
  stock: number
}

export interface IAddToCartData {
  quantity: number
  productDetailId: string | undefined
  categoryId: string | undefined
}
