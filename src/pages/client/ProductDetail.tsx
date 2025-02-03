import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Tabs, Button, Divider, Image, Typography, message, Spin } from 'antd'
import type { TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { Product, Vouchers, ProductsList, QuickViewProduct, CustomBtn, CustomInput } from '@/components'
import { errorResponseCases, icons, addProductToRecentlyViewed, getRecentlyViewed, sizeType } from '@/utils'
import { IProduct, IProductDetail, IGetRelatedParams } from '@/interfaces'
import { cartApi, productApi } from '@/apis'
import { useApi } from '@/hooks'
import { useCartStore } from '@/stores'

const { Title } = Typography
type Product = IProduct

export function ProductDetail() {
  const navigate = useNavigate()
  const [activedColorIndex, setActivedColorIndex] = useState<number>(-1);
  const [activedColor, setActivedColor] = useState<string>('')
  const [activedSizeIndex, setActivedSizeIndex] = useState<number>(-1);
  const [activedSize, setActivedSize] = useState<string>('')
  const [count, setCount] = useState<number>(1)
  const { callApi: callProductApi } = useApi<void>()
  const [mainProduct, setMainProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [productsYouMayLike, setProductsYouMayLike] = useState<Product[]>([]);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const { loading, errorMessage, callApi: callCartApi } = useApi<void>()
  const { setQuantity } = useCartStore()
  const { slug } = useParams<{ slug: string }>();
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
  const [mainImageUrl, setMainImageUrl] = useState<string>();
  const [outOfStock, setOutOfStock] = useState<boolean>(false);

  const handleMainImageChange = (url: string) => () => {
    setMainImageUrl(url);
  }
  const handleColorChange = (index: number, productDetail: IProductDetail) => () => {
    setActivedColorIndex(index);
    setActivedColor(productDetail.color);
    setMainImageUrl(productDetail.imgUrl);
  }
  const handleSizeChange = (index: number, size: string) => () => {
    setActivedSizeIndex(index);
    setActivedSize(size);
  };
  const handleChangeQuantity = (value: number) => {
    if (!isNaN(value) && value >= 1) {
      setCount(value)
    } else {
      setCount(1)
    }
  }

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='font-bold text-blue-cyan uppercase'>Mô tả sản phẩm</span>,
      children: mainProduct?.description ? (
        <div className='text-left' dangerouslySetInnerHTML={{ __html: mainProduct?.description }}></div>
      ) : (
        <p>Không có mô tả</p>
      )
    },
    {
      key: '2',
      label: <span className='font-bold text-blue-cyan uppercase'>Chính sách đổi trả</span>,
      children: (
        <div className='flex flex-col justify-start items-start'>
          <p className='text-left'>+ Sản phẩm lỗi, hỏng do quá trình sản xuất hoặc vận chuyện</p>
          <p className='text-left'>+ Nằm trong chính sách đổi trả sản phẩm của Bean</p>
          <p className='text-left'>+ Sản phẩm còn nguyên tem mác chưa qua sử dụng và chưa giặt là</p>
          <p className='text-left'>+ Thời gian đổi trả nhỏ hơn 15 ngày kể từ ngày nhận hàng</p>
          <p className='text-left'>+ Chi phí bảo hành về sản phẩm, vận chuyển khách hàng chịu chi phí </p>
          <p className='text-left'>
            <b>Điều kiện đổi trả hàng</b>
          </p>
          <p className='text-left'>
            Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi nhận được hàng và phải liên hệ gọi ngay cho
            chúng tôi theo số điện thoại trên để được xác nhận đổi trả hàng.
          </p>
          <p className='text-left'>
            <b>Điều kiện đổi trả hàng:</b>
          </p>
          <p className='text-left'>- Sản phẩm gửi lại phải còn nguyên đai nguyên kiện</p>
          <p className='text-left'>- Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.</p>
          <p className='text-left'>
            - Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.
          </p>
          <p className='text-left'>
            - Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá trị
            đơn hàng.{' '}
          </p>
        </div>
      )
    }
  ]

  const [width, setWidth] = useState<number>(window.innerWidth)

  const [quickViewProduct, setQuickViewProduct] = useState<IProduct | null>(null);
  const [showQuickView, setShowQuickView] = useState<boolean>(false);
  const handleClickEye = (product: Product) => () => {
    setQuickViewProduct(product)
    setShowQuickView(true)
  }
  const handleClosePopup = () => {
    setShowQuickView(false)
  }

  const getMainProduct = async (slug: string) => {
    try {
      setLoadingProduct(true);
      await callProductApi(async () => {
        const { data } = await productApi.findOneBySlug(slug);
        setMainProduct(data)
        data && setLoadingProduct(false);
      })
    }
    catch (error) {
      console.error('Failed to get product', error);
    }
  };
  const getRelatedProducts = async (productId: string, gender: string, type: string) => {
    try {
      await callProductApi(async () => {
        const getProductsParams: IGetRelatedParams = {
          page: 1,
          limit: 10,
          productId: productId,
          categoryGender: gender,
          categoryType: type,
        }
        const { data } = await productApi.findRelatedProducts(getProductsParams);
        setRelatedProducts(data.data)
      })
    }
    catch (error) {
      console.error('Failed to get related products', error);
    }
  };
  const getProductsYouMayLike = async (productId: string, gender: string) => {
    try {
      await callProductApi(async () => {
        const getProductsParams: IGetRelatedParams = {
          page: 1,
          limit: 4,
          productId: productId,
          categoryGender: gender,
          categoryType: '',
        }
        const { data } = await productApi.findRelatedProducts(getProductsParams);
        setProductsYouMayLike(data.data)
      })
    }
    catch (error) {
      console.error('Failed to get products may you like', error);
    }
  };

  const findProductDetailId = (): string | undefined => {
    return mainProduct?.productDetails.find(
      (detail: IProductDetail) => detail.size === activedSize && detail.color === activedColor
    )?.id
  }

  const handleAddToCart = (quantity: number) => {
    const productDetailId = findProductDetailId()
    callCartApi(async () => {
      const { data } = await cartApi.addToCart({
        productDetailId,
        categoryId: mainProduct?.category.id,
        quantity
      })
      if (data) {
        message.success('Thêm sản phẩm vào giỏ thành công!')
        setQuantity(data.cartProductLength)
      }
    })
  }
  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage)
      if (errorMessage === errorResponseCases['Login']) {
        navigate('/login')
      }
    }
  }, [errorMessage])

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    slug && getMainProduct(slug);
    setActivedColorIndex(-1);
    setActivedColor('');
    setActivedSizeIndex(-1);
    setActivedSize('');
    setCount(1);
  }, [slug]);

  useEffect(() => {
    if (mainProduct) {
      addProductToRecentlyViewed(mainProduct);
      getRelatedProducts(mainProduct.id, mainProduct.category.gender, mainProduct.category.type);
      getProductsYouMayLike(mainProduct.id, mainProduct.category.gender);
      setViewedProducts(getRecentlyViewed(mainProduct.id));
      setMainImageUrl(mainProduct.productDetails[0].imgUrl);
      const isOutOfStock = !mainProduct.productDetails.some((value) => value.stock > 0);
      setOutOfStock(isOutOfStock);
    }
  }, [mainProduct]);
  
  useEffect(() => {
    activedColor && activedSize && mainProduct && setCount(
      Math.min(count, mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock || 1)
    );
  }, [activedColor, activedSize])

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      {showQuickView && quickViewProduct && (<QuickViewProduct product={quickViewProduct} handleClosePopup={handleClosePopup} />)}
      <div className="w-full max-w-1200">
        {loadingProduct ? (
          <div className='flex justify-center items-center w-full min-h-[65vh]'>
            <Spin size="large" />
          </div>
        ) : (
          <div>
            {mainProduct ? (
              <div className='flex flex-col flex-wrap gap-6 justify-between lg:flex-row px-4 mt-5 mb-5'>
                <div className='flex-[3] flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 md:flex-row'>
                    <div className='flex-1 overflow-hidden'>
                      <Image src={mainImageUrl} width={350} height={450} className='object-scale-down bg-gray-200' />
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        modules={[Navigation]}
                        navigation
                        className='w-[350px]'
                      >
                        {mainProduct.productDetails
                          .filter((item, index, self) => index === self.findIndex((t) => t.imgUrl === item.imgUrl))
                          .map((productDetail: IProductDetail) => (
                            <SwiperSlide key={productDetail.imgUrl}>
                              <div className={`w-[80px] h-[110px] ${mainImageUrl === productDetail.imgUrl && 'border border-blue-cyan'} flex justify-center items-center object-scale-down bg-gray-200 cursor-pointer overflow-hidden hover:border hover:border-blue-cyan`}>
                                <img onClick={handleMainImageChange(productDetail.imgUrl)} src={productDetail.imgUrl} />
                              </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                    <div className='flex-1 flex flex-col items-start gap-2'>
                      <Title level={2} className='text-left'>
                        {mainProduct.name}
                      </Title>
                      <div className='flex flex-col gap-3 md:flex-row'>
                        <span className='text-left'>Thương hiệu: <span className='text-left text-primary'>Bean Fashion</span></span>
                        <div className='border-l border-gray-300 hidden md:block'></div>
                        <span className='text-left'>Tình trạng:
                          {outOfStock ? (
                            <span className='ml-1 text-left text-red-500'>Hết hàng</span>
                          ) : (
                            <span className='ml-1 text-left text-primary'>Còn hàng</span>
                          )}
                        </span>
                      </div>
                      <div className='flex flex-row gap-2 items-end'>
                        <span className='text-left text-red-500 font-bold text-2xl'>
                          {(mainProduct.price - (mainProduct.price * mainProduct.discount) / 100).toLocaleString("de-DE")}₫
                        </span>
                        {mainProduct.discount > 0 && (
                          <span className='text-left text-gray-400 line-through text-base'>
                            {mainProduct.price.toLocaleString("de-DE")}₫
                          </span>
                        )}
                      </div>
                      <Divider className='border-gray-200 my-2' />
                      <div className='flex flex-col'>
                        <span className='text-left flex gap-1'>Màu sắc:
                          {activedColorIndex >= 0 && (
                            <span className='text-left text-primary'>
                              {mainProduct.productDetails
                                .filter(
                                  (item, index, self) =>
                                    index === self.findIndex((t) => t.color === item.color)
                                )[activedColorIndex].colorName}
                            </span>
                          )}
                        </span>
                        <div className='flex flex-row items-start gap-4 mt-1'>
                          {mainProduct.productDetails
                            .filter(
                              (item, index, self) =>
                                index === self.findIndex((t) => t.color === item.color)
                            )
                            .map((productDetail: IProductDetail, index: number) => (
                              <button
                                key={productDetail.color}
                                onClick={handleColorChange(index, productDetail)}
                                disabled={
                                  outOfStock 
                                  || (!mainProduct.productDetails.find((value) => value.color === productDetail.color && value.size === activedSize)?.stock && activedSize !== '')
                                  || (!mainProduct.productDetails.some((value) => value.color === productDetail.color && value.stock > 0))
                                }
                                className={`${
                                  outOfStock 
                                  || (!mainProduct.productDetails.find((value) => value.color === productDetail.color && value.size === activedSize)?.stock && activedSize !== '') 
                                  || (!mainProduct.productDetails.some((value) => value.color === productDetail.color && value.stock > 0)) 
                                  ? 'cursor-not-allowed' : 'cursor-pointer'
                                }`}
                              >
                                <div
                                  style={{ backgroundColor: productDetail.color }}
                                  className={`w-7 h-7 border border-gray-200 rounded-full`}
                                >
                                  {activedColorIndex === index && (
                                    <div className={`w-full h-full flex justify-end items-start`}>
                                      <div className="w-2 h-2 bg-green-500 rounded-full border border-gray-200"></div>
                                    </div>
                                  )}
                                  {(!mainProduct.productDetails.some((value) => value.color === productDetail.color && value.stock > 0)) 
                                    && (
                                      <div className={`w-full h-full flex justify-center items-center p-0`}>
                                        <span className='text-lg text-gray-300 bg-white rounded-full font-bold m-0'>{icons.ban}</span>
                                      </div>
                                  )}
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-left'>Kích thước: <span className='text-left text-primary'>{activedSize}</span></span>
                        <div className='flex flex-row items-start space-x-4 mt-1'>
                          {mainProduct.productDetails
                            .filter(
                              (item, index, self) =>
                                index === self.findIndex((t) => t.size === item.size)
                            )
                            .sort((a, b) => sizeType.indexOf(a.size) - sizeType.indexOf(b.size))
                            .map((productDetail: IProductDetail, index: number) => (
                              <button
                                key={productDetail.size}
                                onClick={handleSizeChange(index, productDetail.size)}
                                disabled={
                                  outOfStock 
                                  || (!mainProduct.productDetails.find((value) => value.size === productDetail.size && value.color === activedColor)?.stock && activedColor !== '')
                                  || (!mainProduct.productDetails.some((value) => value.size === productDetail.size && value.stock > 0))
                                }
                              >
                                <div
                                  className={`w-7 h-7 ${activedSizeIndex === index
                                    ? 'bg-blue-cyan text-white'
                                    : 'bg-white text-blue-cyan'
                                    }
                                    ${
                                      outOfStock 
                                      || (!mainProduct.productDetails.find((value) => value.size === productDetail.size && value.color === activedColor)?.stock && activedColor !== '') 
                                      || (!mainProduct.productDetails.some((value) => value.size === productDetail.size && value.stock > 0))
                                      ? 'cursor-not-allowed text-gray-300 bg-gray-100' : 'cursor-pointer'} border border-gray-200 flex justify-center items-center rounded`}
                                >
                                  {productDetail.size}
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                      {!outOfStock && (
                        activedColor && activedSize ? (
                          <div className='text-left'>
                            <span className='text-left text-primary'> {mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock} sản phẩm có sẵn</span>
                          </div>
                        ) : (
                          <div className='text-left'>
                            <span className='text-left text-red-400'>Hãy chọn phân loại hàng</span>
                          </div>
                        )
                      )}
                      {
                        activedColor 
                        && activedSize 
                        && mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock !== undefined 
                        && count >= mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)!.stock && (
                          <div className='text-left'>
                              <span className='text-left text-red-400'>Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này</span>
                          </div>
                      )}
                      <div className='flex flex-col gap-4 md:flex-row mt-4'>
                        <div className='flex flex-row items-center max-w-32'>
                          <CustomBtn
                            className='bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-s-sm rounded-e-none !mt-0 p-2 !w-8 h-8 focus:ring-gray-100  focus:ring-2 focus:outline-none disabled:bg-gray-300'
                            onClick={() => {
                              handleChangeQuantity(Math.max(count - 1, 1))
                            }}
                            disabled={outOfStock || count <= 1}
                            children={icons.minus}
                          />
                          <CustomInput
                            name={mainProduct.name}
                            size='small'
                            placeholder='Nhập số lượng'
                            type='text'
                            value={count}
                            className='bg-gray-50 disabled:border-gray-200 border-x-0 border-gray-300 !max-w-12 h-8 text-center text-black text-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 block py-2 w-full rounded-none focus-within:!border-blue-500 focus-within:!shadow-none'
                            onChange={(e) => {
                              handleChangeQuantity(Math.min(parseInt(e.target.value, 10), (mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock ?? 0)))
                            }}
                            disabled={outOfStock || !(activedColor && activedSize)}
                          />
                          <CustomBtn
                            className='bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-e-sm rounded-l-none !mt-0 p-2 !w-8 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none disabled:bg-gray-300'
                            onClick={() => {
                              activedColor && activedSize &&
                                handleChangeQuantity(
                                  count === mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock ? count : count + 1
                                )
                            }}
                            disabled={outOfStock
                              || activedColor && activedSize && count >= (mainProduct.productDetails.find((value) => value.size === activedSize && value.color === activedColor)?.stock ?? 0)
                              || !(activedColor && activedSize)
                            }
                            children={icons.plus}
                          />
                        </div>
                        <div className='flex flex-row items-center max-w-40'>
                          <Button
                            className='bg-blue-cyan text-white uppercase rounded-sm'
                            onClick={() => handleAddToCart(count)}
                            disabled={outOfStock || loading || !(activedColor && activedSize)}
                            loading={loading}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Tabs defaultActiveKey="1" items={tabItems} />
                  </div>
                  {relatedProducts.length > 0 && (
                    <div className='flex flex-col overflow-hidden mt-8'>
                      <Title level={2} className='uppercase !text-blue-cyan !font-bold'>Sản phẩm liên quan</Title>
                      <Divider className='bg-gray-300 rounded-md border-none h-0.5 -mt-2' />
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={width > 768 ? 4 : width > 639 ? 2 : 1}
                        modules={[Navigation]}
                        navigation
                        className='w-72 xl:w-[55rem] lg:w-[70rem] md:w-full sm:w-[35rem] xs:w-[25rem] max-w-[56rem]'
                      >
                        {relatedProducts?.map((product: Product) => (
                          <SwiperSlide
                            key={product.id}
                            className="relative bg-white p-2.5 rounded"
                          >
                            <Product
                              product={product}
                              handleClickEye={handleClickEye(product)}
                            // handleClickCart={() => handleClickCart(product)}       
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>)}
                </div>
                <div className='flex-[1] flex flex-col gap-4 justify-center md:justify-start'>
                  <Vouchers />
                  <div className='flex justify-center flex-col lg:flex-col lg:gap-0 md:gap-4 md:flex-row sm:flex-col'>
                    {productsYouMayLike.length > 0 && <ProductsList title='maylike' products={productsYouMayLike} />}
                    {viewedProducts.length > 0 && <ProductsList title='viewed' products={viewedProducts} />}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center bg-gray-50 m-7 p-4 w-full'>
                <span className="text-2xl font-bold text-gray-500">Không tìm thấy sản phẩm</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
