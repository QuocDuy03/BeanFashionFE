import { Pagination, Skeleton } from "antd"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { productApi } from "@/apis"
import { useApi, useBoolean } from "@/hooks"
import { IProduct, IProductComp } from "@/interfaces"
import { Product, QuickViewProduct } from "@/components"

export const ProductSearch = () => {
    const { loading, callApi: getBySearchQuery } = useApi<void>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1) 
    const [products, setProducts] = useState<IProduct[] | null>(null)
    const [query, setQuery] = useState<string>('')
    const { value: initialRender, setFalse: setFalseInitial, setTrue: setTrueInitial } = useBoolean(true)
    const { value: isUpdate, setFalse: setFalseUpdate } = useBoolean(true)
    
    const updateSearchParams = (page: number) => {
        setSearchParams({
          page: page.toString(),
          ...(query && { searchQuery: query }),
        })
    }

    const handleChangePage = (page: number) => {
        updateSearchParams(page)
        setCurrentPage(page)
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

    const getProducts = async (page: number) => {
        getBySearchQuery(async () => {
            const { data } = await productApi.getBySearchQuery({ searchQuery: query, page: page })
            if (data) {
                setProducts(data.data)
                setTotalProducts(data.total)
                if (Math.ceil(data.total / 16) < page) {
                    handleChangePage(1)
                }
            } else {
                setProducts([])
                setTotalProducts(0)
            }
        })
    }
    useEffect(() => {
        if (initialRender) {
            setFalseInitial()

            const urlPage = parseInt(searchParams.get('page') || '1')
            const urlSearchQuery = searchParams.get('searchQuery') || ''

            setCurrentPage(urlPage)
            if (query !== urlSearchQuery) {
                setQuery(urlSearchQuery)
            } else {
                setTrueInitial()
                getProducts(urlPage)
            }
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
             <div className="w-full h-full">
                <div className="w-[63%] m-auto pb-10">
                    <h1 className="text-2xl font-semibold text-gray-700 text-left pb-4">
                        {loading ? <p>Kết quả tìm kiếm</p>
                         :<p>{`Có ${totalProducts} kết quả tìm kiếm phù hợp`}</p>
                        }
                    </h1>
                    <div
                        className={'w-full flex flex-wrap gap-2 md:gap-[2%] justify-start md:px-0 sm:px-2 px-1'}
                    >
                    {loading ? (
                        Array.from({ length: 16 }).map((_, index) => (
                            <div className="sm:w-[46%] xl:w-[23.5%] mt-2 h-fit bg-gray-200 rounded-md" key={index}>
                                <Skeleton.Node 
                                active 
                                style={{ width: '282px', height: '350px', borderRadius: '8px' }} 
                                />
                            </div>
                        ))
                    ) : products && products.length === 0 ? (
                        <div className="w-full flex justify-center">
                            <div className="text-2xl font-semibold text-gray-400">
                                Không có sản phẩm phù hợp
                            </div>
                        </div>
                    ) : (
                        products?.map((product: IProduct) => (
                        <div
                            className="sm:w-[46%] xl:w-[23.5%] mt-2 h-fit"
                            key={product.id}
                        >
                            <Product
                            product={product}
                            handleClickEye={handleClickEye(product)}
                            />
                        </div>
                        ))
                    )}
                    </div>
                    <div className={`${loading && 'hidden'} flex justify-center my-5`}>
                        <Pagination
                            disabled={totalProducts === 0}
                            align='center'
                            defaultCurrent={1}
                            current={currentPage}
                            total={totalProducts}
                            pageSize={16}
                            onChange={handleChangePage}
                            showSizeChanger={false}
                            hideOnSinglePage={true}
                        />
                    </div>
                </div>
            </div>
        </>
       
    )
}