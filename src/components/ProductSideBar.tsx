import { Checkbox } from 'antd'

import { IUseBoolean } from '@/interfaces'
import { collectionLinks, filterTiers, icons } from '@/utils'

type query = {
  sortStyle: string
  categoryGender: string
  price: string[]
  categoryType: string[]
  colorName: string[]
}

type ProductSideBarProps = {
  sideBarVisible: IUseBoolean
  handleCheckFilter: (filterType: keyof query, option: string) => void
  handleClearFilter: () => void
  selectedFilter: string[]
}

export const ProductSideBar: React.FC<ProductSideBarProps> = ({
  sideBarVisible,
  handleCheckFilter,
  handleClearFilter,
  selectedFilter
}) => {
  return (
    <div
      className={
        ' h-screen top-0 left-0 bg-white overflow-x-hidden transition-all duration-500 fixed z-10 xl:w-1/4 xl:relative xl:h-auto' +
        (sideBarVisible.value ? ' w-80 xl:p-0 p-2 ' : ' w-0 p-0')
      }
    >
      <div className={'bg-off-white border border-gray-300 w-full h-auto p-2.5 px-5 rounded'}>
        <div className={'text-black font-extrabold text-lg mb-2 select-none'}>DANH MỤC SẢN PHẨM</div>
        <ul>
          {collectionLinks.map((link, index) => (
            <li className={'flex w-full justify-between h-8 items-center hover:cursor-pointer group'} key={index}>
              <div className={'flex h-7 items-center'}>
                <div className={'group-hover:h-5 group-hover:bg-dark-blue'}></div>
                <div
                  className={'m-0 pl-1.5 ml-2 user-select-none  group-hover:text-dark-blue'}
                  onClick={() => handleCheckFilter('categoryGender', link.value)}
                >
                  {link.label}
                </div>
              </div>
              <div className='text-dark-blue'>{icons.filter}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={'mt-5 border  border-gray-300 w-full h-auto p-2.5 px-5 rounded'}>
        <div className={'w-full'}>
          <div className={'flex w-full justify-between mb-2.5'}>
            <div className={'text-dark-blue font-extrabold text-xl'}>Đã chọn</div>
            <div className={'hover:cursor-pointer'}>
              <div className={'text-red-500 user-select-none font-medium'} onClick={handleClearFilter}>
                Clear
              </div>
            </div>
          </div>
        </div>
        {filterTiers.map((filterTier) => (
          <div className={'mb-3'} key={filterTier.title}>
            <div className={'text-black font-extrabold text-lg my-4'}>{filterTier.title}</div>
            <ul className={'max-h-40 overflow-x-hidden'}>
              {filterTier.options.map((option) => (
                <li
                  className={'flex w-full justify-start h-8 items-center group hover:cursor-pointer'}
                  key={option.value}
                >
                  <Checkbox
                    id={`priceFilter-${option.label}`}
                    className={'mr-2'}
                    checked={selectedFilter.indexOf(option.value) !== -1 ? true : false}
                    onChange={() => handleCheckFilter(filterTier.typeFilter as keyof query, option.value)}
                  ></Checkbox>
                  <label
                    htmlFor={`priceFilter-${option.label}`}
                    className={'ml-7.5 user-select-none group-hover:text-dark-blue'}
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
