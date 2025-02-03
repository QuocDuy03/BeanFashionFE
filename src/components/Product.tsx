import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { icons } from '@/utils'
import { IProductComp } from '@/interfaces'

type ProductProps = {
  product: IProductComp
  handleClickEye?: () => void
}

export const Product: React.FC<ProductProps> = ({ product, handleClickEye }) => {
  return (
    <div className=''>
      {product ? (
        <div className='shadow-md rounded'>
          <div className='relative overflow-hidden group'>
            <div className='absolute w-full h-full bg-gray-300 opacity-0 z-0 top-0 right-0 ease-in-out duration-150 group-hover:opacity-70'></div>
              <img
                className='bg-transparent w-auto rounded md:h-[300px] h-[250px] top-0 bottom-0 m-auto ease-in-out duration-300 will-change-opacity'
                src={product?.productDetails[0]?.imgUrl}
                alt={product?.name}
              />
            {product.discount > 0 && (
              <span className='absolute rounded top-2 right-2 bg-rose-600 text-white px-2 py-1 box-content text-xs font-normal italic text-center'>
                -{product?.discount}%
              </span>
            )}
            {product.ranking && (
              <div className='absolute w-auto h-8 leading-8 box-content text-center left-2.5 top-2.5'>
                <span className='absolute opacity-0 border-2 rounded-full h-9 w-9 left-0 top-0 animate-pulsate border-dark-blue'></span>
                <div className='text-white text-sm font-medium w-9 h-9 leading-9 bg-dark-blue rounded-full inline-block'>
                  #{product.ranking}
                </div>
              </div>
            )}
            <div className='text-center h-full w-full absolute top-0 transition-opacity duration-300 ease-in-out opacity-0 bg-gray-400 group-hover:opacity-70'>
              <div className='w-full h-full bg-gray-300 opacity-0 absolute  top-0 left-0'></div>
              <div className='flex justify-center items-center absolute w-full top-1/2 left-1/2 text-center transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2'>
                <Link to={`/product/detail/${product?.slug}`} className='text-lg font-semibold'>
                  <Button
                    className='!w-12 !h-12 text-xl cursor-pointer rounded-full p-2 hover:bg-white'
                    icon={icons.settings}
                  />
                </Link>
                <Button
                  className='!w-12 !h-12 text-xl cursor-pointer rounded-full p-2 hover:bg-white'
                  title='Preview'
                  onClick={handleClickEye}
                  icon={icons.eye}
                />
              </div>
            </div>
          </div>
          <div className='relative my-1.5 px-2 pb-1'>
            <Link className='bg-gray-300 no-underline' to={`/product/detail/${product?.slug}`}>
              <div className='text-ellipsis text-left text-black no-underline text-sm mb-0.5 pb-0.5 capitalize h-11 overflow-hidden hover:text-dark-blue'>
                {product?.name}
              </div>
            </Link>
            <div className='text-red-500 block text-base min-h-6 text-left'>
              {product.discount ? (
                <>
                  <span className='pr-1 font-medium'>
                    {(product?.price - (product?.price * product?.discount) / 100).toLocaleString('de-DE')}₫
                  </span>
                  <span className='line-through text-gray-500 text-xs'>
                    {product?.price.toLocaleString('de-DE')}₫
                  </span>
                </>
              ) : (
                <span className='pr-1 font-medium'>{product?.price.toLocaleString('de-DE')}₫</span>
              )}
            </div>
            {product.productCount && (
              <div className='md:absolute md:bottom-2 md:right-2 md:w-28 md:block hidden '>
                <div className='w-full h-4 rounded-full relative bg-light-blue mt-1'>
                  <span className='text-xs w-full top-0 absolute z-10 text-white leading-4 left-1/2 font-normal transform -translate-x-1/2'>
                    Đã bán {product?.sold}
                  </span>
                  <div className='absolute h-4 rounded-full bg-dark-blue left-0 top-0 w-8/12'>
                    <span className='relative inline-block w-6 h-6 bg-contain bg-no-repeat bg-center left-full -top-3'></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {product.productCountSale && (
            <div className='mt-0 h-5 w-full relative block pb-1'>
              <div className='w-full h-4 rounded-full relative bg-orange-200  mt-1'>
                <span className='text-xs z-20 w-full absolute top-0 text-white leading-4 left-1/2 font-normal transform -translate-x-1/2'>
                  Đã bán {product?.saleCount}
                </span>
                <div className='absolute h-4 rounded-full bg-orange-600 left-0 top-0 w-10/12'>
                  <span className='relative inline-block w-6 h-6  bg-contain bg-no-repeat bg-center left-full top-[-10px]'></span>
                </div>
                <div className='absolute w-5 h-5 bg-no-repeat bg-fire bg-contain left-0.5 -top-1.5'></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
