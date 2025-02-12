import { Link } from 'react-router-dom'
import { icons } from '../icons'
import { categoryApi } from '@/apis'
import { ICategory, INavigationItem } from '@/interfaces'
import { normalizeKey } from '../helpers'

const processCategories = async (): Promise<Record<string, string[]>> => {
  const { data } = await categoryApi.findAll()

  if (!data) return {}

  return data.reduce((acc: Record<string, string[]>, { gender, type }: Omit<ICategory, 'id'>) => {
    if (!acc[gender]) acc[gender] = []
    if (!acc[gender].includes(type)) acc[gender].push(type)
    return acc
  }, {})
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const buildNavigationItems = (categories: Record<string, string[]>) => {
  return Object.entries(categories).map(([gender, types]) => ({
    label: <Link to={`/products?page=1&categoryGender=${gender}`}>{capitalize(gender)}</Link>,
    key: `gender-${normalizeKey(gender)}`,
    children: types
      .sort((typeA, typeB) => typeA.localeCompare(typeB))
      .map((type) => ({
        label: <Link to={`/products?page=1&categoryGender=${gender}&categoryType=${type}`}>{capitalize(type)}</Link>,
        key: `type-${normalizeKey(gender)}-${normalizeKey(type)}`
      }))
  }))
}

const getCategories = async () => {
  const categories = await processCategories()
  return buildNavigationItems(categories)
}

export const NAVIGATION_ITEMS: Promise<INavigationItem[]> = getCategories().then((categories) => [
  { label: <Link to='/'>Trang chủ</Link>, key: 'home' },
  ...categories,
  { label: <Link to='/products'>Sản phẩm</Link>, key: 'products' },
  { label: <Link to='/blogs'>Tin tức</Link>, key: 'news' },
  { label: <Link to='/contact'>Liên hệ</Link>, key: 'contact' },
  {
    label: (
      <Link to='#' className='text-red-500 flex items-center justify-center'>
        <span>{icons.gift}</span>
        Khuyến mãi
      </Link>
    ),
    key: 'promotion'
  }
])
