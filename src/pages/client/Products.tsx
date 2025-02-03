import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Select, Pagination, Skeleton } from 'antd'

import { useApi, useBoolean } from '@/hooks'

import { IGetProductsParams, IProduct, IProductComp } from '@/interfaces'

import { Product, QuickViewProduct, ProductSideBar } from '@/components'

import { icons, sortOptions } from '@/utils'
import { productApi } from '@/apis/product.api'

type query = {
  sortStyle: string
  categoryGender: string
  price: string[]
  categoryType: string[]
  colorName: string[]
}

export const AllProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sideBarVisible = useBoolean(window.innerWidth > 980)

  const [selectedFilter, setSelectedFilter] = useState<string[]>([])
  const [products, setProducts] = useState<IProduct[] | null>(null)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const { value: initialRender, setFalse: setFalseInitial, setTrue: setTrueInitial } = useBoolean(true)
  const { value: isUpdate, setFalse: setFalseUpdate } = useBoolean(true)

  const handleChangePage = (page: number) => {
    updateSearchParams(page)
    setCurrentPage(page)
  }

  const [query, setQuery] = useState<query>({
    sortStyle: '',
    categoryGender: '',
    price: [],
    categoryType: [],
    colorName: []
  })
  const { loading, callApi: callApiGetProduct } = useApi<void>()

  const getProducts = async (page: number) => {
    const params: IGetProductsParams = {
      page,
      ...(query.sortStyle && { sortStyle: query.sortStyle }),
      ...(query.categoryGender && { categoryGender: query.categoryGender }),
      ...(query.price.length > 0 && { price: query.price.join(',') }),
      ...(query.categoryType.length > 0 && { categoryType: query.categoryType.join(',') }),
      ...(query.colorName.length > 0 && { colorName: query.colorName.join(',') })
    }
    callApiGetProduct(async () => {
      const { data } = await productApi.getProducts(params)
      if (data) {
        setProducts(data.data)
        setTotalProducts(data.total)
      } else {
        setProducts([])
      }
    })
  }

  const handleClearFilter = () => {
    setSelectedFilter([])
    setCurrentPage(1)
    setQuery({
      sortStyle: '',
      categoryGender: '',
      price: [],
      categoryType: [],
      colorName: []
    })
  }

  const handleCheckFilter = (filterType: keyof query, option: string) => {
    setCurrentPage(1)
    if (filterType === 'sortStyle' || filterType === 'categoryGender') {
      setQuery({ ...query, [filterType]: option })
      return
    }
    setQuery((prevQuery) => {
      const currentFilter = prevQuery[filterType]

      if (Array.isArray(currentFilter)) {
        const updatedFilter = currentFilter.includes(option)
          ? currentFilter.filter((item) => item !== option)
          : [...currentFilter, option]

        return { ...prevQuery, [filterType]: updatedFilter }
      }

      return prevQuery
    })
    setSelectedFilter((prev) =>
      prev.indexOf(option) === -1 ? [...prev, option] : prev.filter((item) => item !== option)
    )
  }

  const updateSearchParams = (page: number) => {
    setSearchParams({
      page: page.toString(),
      ...(query.sortStyle && { sortStyle: query.sortStyle }),
      ...(query.categoryGender && { categoryGender: query.categoryGender }),
      ...(query.price.length > 0 && { price: query.price.join(',') }),
      ...(query.categoryType.length > 0 && { categoryType: query.categoryType.join(',') }),
      ...(query.colorName.length > 0 && { colorName: query.colorName.join(',') })
    })
  }

  const [quickViewProduct, setQuickViewProduct] = useState<IProduct | null>(null)
  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const handleClickEye = (product: IProductComp) => () => {
    setQuickViewProduct(product)
    setShowQuickView(true)
  }
  const handleClosePopup = () => {
    setShowQuickView(false)
  }

  useEffect(() => {
    if (initialRender) {
      setFalseInitial()

      const urlPage = parseInt(searchParams.get('page') || '1')
      const urlSortStyle = searchParams.get('sortStyle') || ''
      const urlCategoryGender = searchParams.get('categoryGender') || ''
      const urlPrice = searchParams.get('price')?.split(',') || []
      const urlCategoryType = searchParams.get('categoryType')?.split(',') || []
      const urlColorName = searchParams.get('colorName')?.split(',') || []
      setSelectedFilter([...urlPrice, ...urlCategoryType, ...urlColorName])

      const updateQuery = {
        sortStyle: urlSortStyle,
        categoryGender: urlCategoryGender,
        price: urlPrice,
        categoryType: urlCategoryType,
        colorName: urlColorName
      }

      setQuery(updateQuery)
      setCurrentPage(urlPage)
    }
  }, [searchParams])

  useEffect(() => {
    if (!isUpdate) {
      updateSearchParams(currentPage)
    } else {
      setFalseUpdate()
    }

    if (!initialRender) {
      setTrueInitial()
      getProducts(currentPage)
    }
  }, [query])

  return (
    <>
      {showQuickView && quickViewProduct && (
        <QuickViewProduct product={quickViewProduct} handleClosePopup={handleClosePopup} />
      )}
      <div className={'w-full flex justify-center mb-10 relative top-0'}>
        {sideBarVisible.value ? (
          <div
            onClick={() => sideBarVisible.toggle()}
            className={
              'transform translate-x-0 w-screen h-screen bg-opacity-70 z-10 fixed top-0 bg-black xl:hidden block'
            }
          ></div>
        ) : undefined}
        <div className={'mt-10 w-1200 flex gap-5'}>
          <div
            onClick={() => sideBarVisible.toggle()}
            className={
              'bg-dark-blue w-14 h-14 fixed top-56 flex justify-center items-center rounded-tr-xl rounded-br-xl z-10 transition-all duration-500 hover:cursor-pointer xl:hidden' +
              (sideBarVisible.value ? ' left-80' : ' left-0')
            }
          >
            <div className='text-white'>{icons.filter}</div>
          </div>
        <ProductSideBar
          handleCheckFilter={handleCheckFilter}
          handleClearFilter={handleClearFilter}
          selectedFilter={selectedFilter}
          sideBarVisible={sideBarVisible}
        />
        <div className={'xl:w-3/4 w-full xl:mx-0 mx-2'}>
          <div
            className={
              'flex justify-between bg-off-white items-center h-13 p-2.5 border border-gray-300 rounded-sm mb-5'
            }
          >
            <div className={'text-xl font-extrabold pl-7.5 md:pl-0'}>TẤT CẢ SẢN PHẨM</div>
            <div className={'flex items-center'}>
              <div>{icons.sortDecreasing}</div>
              <div className={'font-medium mx-2.5 ml-1 pb-1'}>Sắp xếp:</div>
              <Select
                onChange={(value) => handleCheckFilter('sortStyle', value)}
                defaultValue={sortOptions.default}
                value={query.sortStyle || sortOptions.default}
                style={{ width: 120 }}
                options={sortOptions.option}
              ></Select>
            </div>
          </div>
          <div
            className={'w-full flex flex-wrap gap-[5%] md:gap-[2%] justify-start md:px-0 sm:px-2 px-1'}
          >
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div className="md:w-[23.5%] mt-2 w-[46%] h-fit bg-gray-200 rounded-md" key={index}>
                  <Skeleton.Node 
                    active 
                    style={{ width: '207px', height: '350px', borderRadius: '8px' }} 
                  />
                </div>
              ))
            ) : products && products.length === 0 ? (
              <div className={'w-full flex justify-center'}>
                <div className={'text-2xl font-semibold text-gray-400'}>Không có sản phẩm phù hợp</div>
              </div>
            ) : products?.map((product: IProduct) => (
              <div className={'md:w-[23.5%] mt-2 w-[46%] h-fit'} key={product.id}>
                <Product
                  product={product}
                  handleClickEye={handleClickEye(product)}
                />
              </div>
            ))}
          </div>
          <div className={`${loading && 'hidden'} flex justify-center mt-5`}>
            <Pagination
              disabled={totalProducts === 0}
              align='center'
              defaultCurrent={1}
              current={currentPage}
              total={totalProducts}
              pageSize={12}
              onChange={handleChangePage}
              showSizeChanger={false}
              hideOnSinglePage={true}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
