import { ICategory } from './category.interface'
export interface IProductDetail {
  id: string
  size: string
  colorName: string
  color: string
  imgUrl: string
  stock: number
}

export interface IDiscount {
  id: string
  discountValue: number
  sold: number
  timeRange: '0h-6h' | '6h-12h' | '12h-18h' | '18h-24h'
  date: Date
}
export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  category: ICategory
  slug: string
  discount: number
  createdAt: Date
  updatedAt: Date
  productDetails: IProductDetail[]
  discounts: IDiscount[]
}

export interface IProductComp extends IProduct {
  ranking?: number
  productCount?: boolean
  productCountSale?: boolean
  sold?: number
  saleCount?: number
}

export interface IImage {
  imgUrl: string
}

export interface IColor {
  colorName: string
  colorHex: string
}

export interface ISize {
  size: string
}

export interface IVoucher {
  id: string
  name: string
  discount: number
  description: string
  quantity: number
}

export interface IGetProductsParams {
  page: number;
  sortStyle?: string;
  categoryGender?: string;
  price?: string;
  categoryType?: string;
  colorName?: string;
}

export interface IGetRelatedParams {
  page: number;
  limit: number;
  productId?: string;
  categoryGender?: string;
  categoryType?: string;
}
export interface IGetBySearchQueryParams {
  page?: number;
  searchQuery: string;
}