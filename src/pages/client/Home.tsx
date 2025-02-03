import { useEffect, useState } from 'react'
import { Carousel, Row, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'swiper/css'
import 'swiper/css/navigation'
import 'react-tabs/style/react-tabs.css'

import { Product, CountdownTimer, QuickViewProduct } from '@/components'
import { useApi } from '@/hooks'
import { productApi } from '@/apis'
import { icons } from '@/utils'
import { IProduct, IProductComp } from '@/interfaces'
import { sliderImages, serviceImages, categoryImages, tabImages, bannerBigImage, threeBannerImages, brandImages } from '@/utils';

type Product = IProductComp

const settings = {
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 3000,
  vertical: false,
  draggable: true
}

export function Home() {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [tabProductIndex, setProductTabIndex] = useState<number>(0)
  const [products, setProducts] = useState<Product[]>([])
  const [maleProducts, setMaleProducts] = useState<Product[]>([])
  const [femaleProducts, setFemaleProducts] = useState<Product[]>([])
  const [kidProducts, setKidProducts] = useState<Product[]>([])
  const [saleProductsInTabIndex, setSaleProductsInTabIndex] = useState<Product[][]>([])
  const currentTime = new Date()
  const [status, setStatus] = useState<boolean[]>([false, false, false, false])
  const [width, setWidth] = useState(window.innerWidth)
  const { callApi: callProductApi } = useApi<void>()

  const [quickViewProduct, setQuickViewProduct] = useState<IProduct | null>(null)
  const [showQuickView, setShowQuickView] = useState<boolean>(false)
  const handleClickEye = (product: Product) => () => {
    setQuickViewProduct(product)
    setShowQuickView(true)
  }
  const handleClosePopup = () => {
    setShowQuickView(false)
  }
  const getProducts = async () => {
    callProductApi(async () => {
      const { data } = await productApi.getTopSellingProducts()
      if (data) {
        const bestSellProducts: Product[] = data.map((product: Product, index: number) => ({
          ...product,
          ranking: index + 1,
          productCount: true,
        }))
        setProducts(bestSellProducts)
      }
    })
  }

  const getMaleProducts = async () => {
    callProductApi(async () => {
      const { data } = await productApi.getProducts({ page: 1, categoryGender: 'nam' })
      if (data) {
        setMaleProducts(data.data)
      }
    })
  }

  const getFemaleProducts = async () => {
    callProductApi(async () => {
      const { data } = await productApi.getProducts({ page: 1, categoryGender: 'nữ' })
      if (data) {
        setFemaleProducts(data.data)
      }
    })
  }

  const getKidProducts = async () => {
    callProductApi(async () => {
      const { data } = await productApi.getProducts({ page: 1, categoryGender: 'trẻ em' })
      if (data) {
        setKidProducts(data.data)
      }
    })
  }

  const getDiscountProducts = async () => {
    callProductApi(async () => {
      const { data } = await productApi.getDiscountProduct()
      if (data) {
        const categorizedProducts: Product[][] = [[], [], [], []]

        data.forEach((product: Product) => {
          product.discounts.forEach((discount) => {
            const timeRange = discount.timeRange
            let index = -1

            switch (timeRange) {
              case '0h-6h':
                index = 0
                break
              case '6h-12h':
                index = 1
                break
              case '12h-18h':
                index = 2
                break
              case '18h-24h':
                index = 3
                break
            }

            if (index !== -1) {
              categorizedProducts[index].push(product)
            }
          })
        })

        setSaleProductsInTabIndex(categorizedProducts)
      }
    })
  }

  const tabData = [
    { timeRangeDesktop: '00:00 - 06:00', timeRangeMobile: '0h - 6h', start: 0, end: 6 },
    { timeRangeDesktop: '06:00 - 12:00', timeRangeMobile: '6h - 12h', start: 6, end: 12 },
    { timeRangeDesktop: '12:00 - 18:00', timeRangeMobile: '12h - 18h', start: 12, end: 18 },
    { timeRangeDesktop: '18:00 - 24:00', timeRangeMobile: '18h - 24h', start: 18, end: 24 }
  ]

  const getStatus = (currentHour: number, start: number, end: number, status: boolean) => {
    if (currentHour >= start && currentHour < end) return 'Đang diễn ra'
    return status ? 'Đã diễn ra' : 'Sắp diễn ra'
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {

    const fetchProducts = async () => {
      getProducts()
      getDiscountProducts()
      getMaleProducts()
      getFemaleProducts()
      getKidProducts()
    }

    fetchProducts()
  }, [])
  useEffect(() => {
    const hours = currentTime.getHours()
    const tabIndex = Math.floor(hours / 6)
    const newStatus = Array(4)
      .fill(false)
      .map((_, index) => index <= tabIndex)

    setTabIndex(tabIndex)
    setStatus(newStatus)
  }, [])
  return (
    <>
      {showQuickView && quickViewProduct && (
        <QuickViewProduct product={quickViewProduct} handleClosePopup={handleClosePopup} />
      )}
      <div className='relative w-full min-h-full mb-4'>
        <div className=''>
          <div className=''>
            <Carousel {...settings}>
              <div className='w-full h-full'>
                <img src={sliderImages[0]} draggable={false} alt='slider' loading='lazy' />
              </div>
              <div className='w-full h-full'>
                <img src={sliderImages[1]} draggable={false} alt='slider' loading='lazy' />
              </div>
              <div className='w-full h-full'>
                <img src={sliderImages[2]} draggable={false} alt='slider' loading='lazy' />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row justify={'center'}>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full px-1'>
              <div className='lg:flex lg:items-center lg:justify-center text-center shadow-md pt-2 pb-1 rounded md:min-h-24 md:mb-1 lg:min-h-16 last:border-r-0'>
                <div className='my-1 lg:inline-block lg:mb-0'>
                  <img className='max-w-9 bg-transparent m-auto' src={serviceImages[0]} alt='delivery' />
                </div>
                <div className='inline-block text-center font-normal mb-0 mt-0 text-blue-cyan lg:text-left lg:ml-2 md:text-md'>
                  Vận chuyển <span className='font-semibold'>Miễn phí</span> <br />
                  Trong khu vực <span className='font-semibold'>TP.HCM</span>
                </div>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full px-1'>
              <div className='lg:flex lg:items-center lg:justify-center text-center shadow-md pt-2 pb-1 rounded md:min-h-24 md:mb-1 lg:min-h-16 last:border-r-0'>
                <div className='my-1 lg:inline-block lg:mb-0'>
                  <img className='max-w-9 bg-transparent m-auto' src={serviceImages[1]} alt='exchange' />
                </div>
                <div className=' inline-block text-center font-normal mb-0 mt-0 text-blue-cyan lg:text-left lg:ml-2 md:text-md'>
                  Đổi trả <span className='font-semibold'>Miễn phí</span> <br />
                  Trong vòng <span className='font-semibold'>30 ngày</span>
                </div>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full px-1'>
              <div className='lg:flex lg:items-center lg:justify-center text-center shadow-md pt-2 pb-1 rounded md:min-h-24 md:mb-1 lg:min-h-16 last:border-r-0'>
                <div className='my-1 lg:inline-block lg:mb-0'>
                  <img className='max-w-9 bg-transparent m-auto' src={serviceImages[2]} alt='payment' />
                </div>
                <div className=' inline-block text-center font-normal mb-0 mt-0 text-blue-cyan lg:text-left lg:ml-2 md:text-md'>
                  Tiến hành <span className='font-semibold'>Thanh toán</span> <br />
                  Với nhiều <span className='font-semibold'>Phương thức</span>
                </div>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full px-1'>
              <div className='lg:flex lg:items-center lg:justify-center text-center shadow-md pt-2 pb-1 rounded md:min-h-24 md:mb-1 lg:min-h-16 last:border-r-0'>
                <div className='my-1 h-full lg:inline-block lg:mb-0'>
                  <img className='max-w-9 bg-transparent m-auto' src={serviceImages[3]} alt='refund' />
                </div>
                <div className='inline-block text-center font-normal mb-0 mt-0 text-blue-cyan lg:text-left lg:ml-2 md:text-md'>
                  <span className='font-semibold'>100% hoàn tiền</span> <br />
                  Nếu sản phẩm <span className='font-semibold'>Lỗi</span>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row className='flex justify-content-center'>
            <div className='lg:w-full md:w-full sm:w-full w-full'>
              <div className='relative mb-9 md:text-left md:mb-1'>
                <h2 className='text-black text-center text-lg'>
                  Top <span className='font-semibold text-blue-cyan'>Bán Chạy</span>
                </h2>
              </div>
              <Swiper spaceBetween={10} slidesPerView={width > 768 ? 4 : 2} modules={[Navigation]} navigation>
                {products?.length ? (
                  products?.map((product: Product) => (
                    <SwiperSlide key={product.id} className='relative mb-3.5 bg-white rounded'>
                      <Product product={product} handleClickEye={handleClickEye(product)} />
                    </SwiperSlide>
                  ))
                ) : (
                  <Skeleton active className='h-96' />
                )}
              </Swiper>
            </div>
          </Row>
        </div>
      </div>
      <section className='mb-7 md:mb-3.5' id='index-flash-sale'>
        <div className='container lg:w-1200 mx-auto'>
          <div className='rounded border border-gray-300 pb-0 bg-amber-500 relative'>
            <div className='clearfix'>
              <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className='block'>
                  <TabList className='flex h-16 items-center justify-center rounded-t w-full text-center'>
                    {tabData.map((tab, index) => (
                      <Tab
                        key={index}
                        className={`relative md:p-1 font-semibold h-16 rounded-t-lg flex-1 cursor-pointer mr-0 ${
                          tabIndex === index
                            ? 'bg-red-800 text-white border-none outline-none'
                            : 'text-slate-800 bg-white border-r border-gray-600'
                        }`}
                      >
                        <div className='mt-2 md:mt-0'>
                          <div className='m-0 p-0 border-none rounded-none border border-transparent opacity-100 bg-transparent text-inherit font-bold md:text-xl text-sm overflow-hidden inline-block line-clamp-1 transition-colors duration-300 ease-linear'>
                            {width >= 768 ? tab.timeRangeDesktop : tab.timeRangeMobile}
                          </div>
                          <div className='m-0 p-0 border-none rounded-none border border-transparent opacity-100 bg-transparent text-inherit font-medium md:text-sm text-xs overflow-hidden block line-clamp-1 transition-colors duration-300 ease-linear'>
                            {getStatus(currentTime.getHours(), tab.start, tab.end, status[index])}
                          </div>
                        </div>
                      </Tab>
                    ))}
                    <CountdownTimer />
                  </TabList>
                </div>

                {[0, 1, 2, 3].map((index) => (
                  <TabPanel key={index}>
                    <div className='p-5'>
                      <div
                        className={` overflow-hidden ${tabIndex === index ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}
                      >
                        <div className='block'>
                          {saleProductsInTabIndex.length ? (
                            saleProductsInTabIndex[index]?.length > 0 ? (
                              <Swiper
                                spaceBetween={10}
                                slidesPerView={width > 768 ? 4 : 2}
                                modules={[Navigation]}
                                navigation
                              >
                                {saleProductsInTabIndex[index].map((product) => (
                                  <SwiperSlide key={product.id} className='relative mb-3 bg-white p-2.5 rounded-lg'>
                                    <Product product={product} handleClickEye={handleClickEye(product)} />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            ) : (
                              <div className='flex flex-col justify-center items-center h-96 my-2'>
                                <span className='text-7xl text-white block'>{icons.info.white}</span>
                                <span className='text-white text-xl'>
                                  Không có sản phẩm nào được giảm giá vào khung giờ này
                                </span>
                              </div>
                            )
                          ) : (
                            <Skeleton active className='h-96' />
                          )}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <section className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row className='flex justify-content-center'>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 px-2'>
              <div className='bg-blue-cyan relative overflow-hidden w-full text-white text-center drop-shadow-md group before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-white before:-skew-y-12  before:-translate-y-2/4'>
                <img
                  className='max-w-full scale-[1.1] group-hover:opacity-30 group-hover:scale-100 box-border transition-all duration-300 ease-in-out'
                  src={categoryImages[0]}
                  alt='Men'
                />
                <div className='absolute inset-0 box-border transition-all duration-300 ease-in-out'>
                  <p className='bg-blue-cyan absolute top-1/2 left-10 right-10 -skew-y-12 p-1.5 m-0 uppercase font-normal lg:text-2xl text-sm mb-0 box-border transition-all duration-300 ease-in-out -translate-y-2/4'>
                    Men's
                  </p>
                </div>
                <Link
                  to='/products?page=1&categoryGender=nam'
                  className='absolute inset-0 cursor-pointer'
                ></Link>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 px-2'>
              <div className='bg-blue-cyan relative overflow-hidden w-full text-white text-center drop-shadow-md group before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-white before:-skew-y-12  before:-translate-y-2/4'>
                <img
                  className='max-w-full scale-[1.1] group-hover:opacity-30 group-hover:scale-100 box-border transition-all duration-300 ease-in-out'
                  src={categoryImages[1]}
                  alt='Women'
                />
                <div className='absolute inset-0 box-border transition-all duration-300 ease-in-out'>
                  <p className='bg-blue-cyan absolute top-1/2 left-10 right-10 -skew-y-12 p-1.5 m-0 uppercase font-normal lg:text-2xl text-sm mb-0 box-border transition-all duration-300 ease-in-out -translate-y-2/4'>
                    Women's
                  </p>
                </div>
                <Link
                  to='/products?page=1&categoryGender=nữ'
                  className='absolute inset-0 cursor-pointer'
                ></Link>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 px-2'>
              <div className='bg-blue-cyan relative overflow-hidden w-full text-white text-center drop-shadow-md group before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-white before:-skew-y-12  before:-translate-y-2/4'>
                <img
                  className='max-w-full scale-[1.1] group-hover:opacity-30 group-hover:scale-100 box-border transition-all duration-300 ease-in-out'
                  src={categoryImages[2]}
                  alt='Kids'
                />
                <div className='absolute inset-0 box-border transition-all duration-300 ease-in-out'>
                  <p className='bg-blue-cyan absolute top-1/2 left-10 right-10 -skew-y-12 p-1.5 m-0 uppercase font-normal lg:text-2xl text-sm mb-0 box-border transition-all duration-300 ease-in-out -translate-y-2/4'>
                    Kid's
                  </p>
                </div>
                <Link
                  to='/products?page=1&categoryGender=trẻ+em'
                  className='absolute inset-0 cursor-pointer'
                ></Link>
              </div>
            </div>
            <div className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 px-2'>
              <div className='bg-blue-cyan relative overflow-hidden w-full text-white text-center drop-shadow-md group before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-white before:-skew-y-12  before:-translate-y-2/4'>
                <img
                  className='max-w-full scale-[1.1] group-hover:opacity-30 group-hover:bg-white group-hover:scale-100 box-border transition-all duration-300 ease-in-out'
                  src={categoryImages[3]}
                  alt='Gym'
                />
                <div className='absolute inset-0 box-border transition-all duration-300 ease-in-out'>
                  <p className='bg-blue-cyan absolute top-1/2 left-10 right-10 -skew-y-12 p-1.5 m-0 uppercase font-normal lg:text-2xl text-sm mb-0 box-border transition-all duration-300 ease-in-out -translate-y-2/4'>
                    Gym's
                  </p>
                </div>
                <Link
                  to='/products?page=1&categoryType=gym'
                  className='absolute inset-0 cursor-pointer'
                ></Link>
              </div>
            </div>
          </Row>
        </div>
      </section>
      <section className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row>
            <div className='flex-none w-full max-w-full'>
              <h2 className='text-lg text-black '>
                Thời trang <span className='font-semibold text-blue-cyan'>Xu Hướng</span>
              </h2>
            </div>
            <div className='lg:flex lg:w-full'>
              <div className='lg:flex-none lg:w-1/4 lg:max-w-1/4 lg:block hidden'>
                <div className='relative overflow-hidden block'>
                  <img className='border-0 max-w-full h-auto bg-transparent' src={tabImages[0]} alt='banner tab' />
                </div>
              </div>
              <div className='lg:w-3/4 lg:max-w-3/4 lg:pl-2.5 w-screen'>
                <Tabs selectedIndex={tabProductIndex} onSelect={(index) => setProductTabIndex(index)}>
                  <TabPanel>
                    <div className='p-0 m-2.5'>
                      <div
                        className={`${tabProductIndex === 0 ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 overflow-hidden'}`}
                      >
                        <Swiper spaceBetween={10} slidesPerView={width > 768 ? 4 : 2} modules={[Navigation]} navigation>
                          {maleProducts.length ? (
                            maleProducts?.map((product) => (
                              <SwiperSlide key={product.id} className='relative mb-3.5 bg-white rounded lg:!w-[24%]'>
                                <Product product={product} handleClickEye={handleClickEye(product)} />
                              </SwiperSlide>
                            ))
                          ) : (
                            <Skeleton active className='h-96' />
                          )}
                        </Swiper>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='p-0 m-2.5'>
                      <div
                        className={`${tabProductIndex === 1 ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 overflow-hidden'}`}
                      >
                        <Swiper spaceBetween={10} slidesPerView={width > 768 ? 4 : 2} modules={[Navigation]} navigation>
                          {femaleProducts.length ? (
                            femaleProducts?.map((product) => (
                              <SwiperSlide key={product.id} className='relative mb-3.5 bg-white rounded lg:!w-[24%]'>
                                <Product product={product} handleClickEye={handleClickEye(product)} />
                              </SwiperSlide>
                            ))
                          ) : (
                            <Skeleton active className='h-96' />
                          )}
                        </Swiper>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='p-0 m-2.5'>
                      <div
                        className={`${tabProductIndex === 2 ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 overflow-hidden'}`}
                      >
                        <Swiper spaceBetween={10} slidesPerView={width > 768 ? 4 : 2} modules={[Navigation]} navigation>
                          {kidProducts.length ? (
                            kidProducts?.map((product) => (
                              <SwiperSlide key={product.id} className='relative mb-3.5 bg-white rounded lg:!w-[24%]'>
                                <Product product={product} handleClickEye={handleClickEye(product)} />
                              </SwiperSlide>
                            ))
                          ) : (
                            <Skeleton active className='h-96' />
                          )}
                        </Swiper>
                      </div>
                    </div>
                  </TabPanel>
                  <TabList className='flex justify-between items-center m-0 border-b-0 border-t-2 border-t-blue-cyan pt-6'>
                    <Tab
                      className={`flex items-center md:text-base text-xs cursor-pointer font-semibold relative w-1/3 mb-0 focus-visible:!outline-none ${tabProductIndex === 0 ? 'text-blue-cyan before:absolute before:w-4 before:h-4 before:left-3 before:-top-8 before:rotate-45 before:border before:border-blue-cyan before:border-t-0 before:border-l-0 before:bg-white' : 'text-black'}`}
                    >
                      <div
                        className={`float-left mb-0 rounded-full md:w-10 md:h-10 p-0.5 mr-2.5 border-solid border transition-all duration-300 ${tabProductIndex === 0 ? 'border-blue-cyan' : 'border-gray-500'}`}
                      >
                        <img className='border-0 max-w-full h-auto bg-transparent' src={tabImages[1]} alt='tab nu' />
                      </div>
                      <p className='my-0 leading-4'>
                        Thời trang Nam
                        <span className='block text-xs text-left text-gray-500 font-normal'>
                          {maleProducts.length} sản phẩm
                        </span>
                      </p>
                    </Tab>
                    <Tab
                      className={`flex items-center md:text-base text-xs cursor-pointer font-semibold relative w-1/3 mb-0 focus-visible:!outline-none ${tabProductIndex === 1 ? 'text-blue-cyan before:absolute before:w-4 before:h-4 before:left-3 before:-top-8 before:rotate-45 before:border before:border-blue-cyan before:border-t-0 before:border-l-0 before:bg-white' : 'text-black'}`}
                    >
                      <div
                        className={`float-left mb-0 rounded-full md:w-10 md:h-10 p-0.5 mr-2.5 border-solid border transition-all duration-300 ${tabProductIndex === 1 ? 'border-blue-cyan' : 'border-gray-500'}`}
                      >
                        <img className='border-0 max-w-full h-auto bg-transparent' src={tabImages[2]} alt='tab nu' />
                      </div>
                      <p className='my-0 leading-4'>
                        Thời trang Nữ
                        <span className='block text-xs text-left text-gray-500 font-normal'>
                          {femaleProducts.length} sản phẩm
                        </span>
                      </p>
                    </Tab>
                    <Tab
                      className={`flex items-center md:text-base text-xs cursor-pointer font-semibold relative w-1/3 mb-0 focus-visible:!outline-none ${tabProductIndex === 2 ? 'text-blue-cyan before:absolute before:w-4 before:h-4 before:left-3 before:-top-8 before:rotate-45 before:border before:border-blue-cyan before:border-t-0 before:border-l-0 before:bg-white' : 'text-black'}`}
                    >
                      <div
                        className={`float-left mb-0 rounded-full md:w-10 md:h-10 p-0.5 mr-2.5 border-solid border transition-all duration-300 ${tabProductIndex === 2 ? 'border-blue-cyan' : 'border-gray-500'}`}
                      >
                        <img
                          className='border-0 max-w-full h-auto bg-transparent'
                          src={tabImages[3]}
                          alt='tab tre em'
                        />
                      </div>
                      <p className='my-0 leading-4'>
                        Thời trang Trẻ em
                        <span className='block text-xs text-left text-gray-500 font-normal'>
                          {kidProducts.length} sản phẩm
                        </span>
                      </p>
                    </Tab>
                  </TabList>
                </Tabs>
              </div>
            </div>
          </Row>
        </div>
      </section>
      <section className='bg-big-banner-sale bg-no-repeat bg-fixed bg-cover bg-center pt-24 pb-24 mb-8 '>
        <Row className='lg:w-1200 mx-auto'>
          <div className='w-full flex justify-center'>
            <Link to='' className='text-center block'>
              <img
                src={bannerBigImage}
                alt='banner big sale'
                className='relative text-9xl italic font-semibold bg-transparent animate-aniName'
              />
            </Link>
          </div>
        </Row>
      </section>
      <section className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row className=''>
            <div className='flex-none w-full max-w-full'>
              <h2 className='text-black text-lg '>
                Thời trang <span className='font-semibold text-blue-cyan'>Trẻ em</span>
              </h2>
            </div>
            <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={width > 768 ? 4 : 2} navigation>
              {kidProducts.length ? (
                kidProducts.map((product) => (
                  <SwiperSlide key={product.id} className='relative mb-4 bg-white p-2.5 rounded-md'>
                    <Product product={product} handleClickEye={handleClickEye(product)} />
                  </SwiperSlide>
                ))
              ) : (
                <Skeleton active className='h-96' />
              )}
            </Swiper>
          </Row>
        </div>
      </section>
      <section className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row className=''>
            <div className='w-full sm:w-full md:w-4/12 lg:w-4/12 xl:w-4/12 px-2.5'>
              <div className='mb-7'>
                <img className='border-0 max-w-full h-auto bg-transparent' src={threeBannerImages[0]} alt='banner 1' />
              </div>
            </div>
            <div className='w-full sm:w-full md:w-4/12 lg:w-4/12 xl:w-4/12 px-2.5'>
              <div className='mb-7'>
                <img className='border-0 max-w-full h-auto bg-transparent' src={threeBannerImages[1]} alt='banner 2' />
              </div>
            </div>
            <div className='w-full sm:w-full md:w-4/12 lg:w-4/12 xl:w-4/12 px-2.5'>
              <div className='mb-7'>
                <img className='border-0 max-w-full h-auto bg-transparent' src={threeBannerImages[2]} alt='banner 3' />
              </div>
            </div>
          </Row>
        </div>
      </section>
      <section className='mb-7 md:mb-3.5'>
        <div className='container lg:w-1200 mx-auto'>
          <Row className=''>
            <div className='flex-none w-full max-w-full mb-2'>
              <h2 className='text-black text-lg'>
                Bean <span className='font-semibold text-blue-cyan'>Instagram</span>
              </h2>
            </div>
            <Swiper spaceBetween={10} slidesPerView={width > 768 ? 4 : 3} modules={[Navigation]} navigation>
              {brandImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <Link
                    to=''
                    className='min-h-24 relative overflow-hidden block before:hover:animate-shine before:absolute before:top-0 before:-left-full before:z-2 before:block before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:to-white-0.3 before:origin-top-left before:-skew-x-12'
                  >
                    <img
                      src={image.path}
                      alt={`bean instagram ${image.id}`}
                      className='border-0 max-w-full h-auto bg-transparent'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
        </div>
      </section>
    </>
  )
}
