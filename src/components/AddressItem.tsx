import React from 'react'

import { Badge, Popconfirm } from 'antd'

import { IAddressReturn } from '@/interfaces'
import { icons } from '@/utils'
import { useWindowSize } from '@/hooks'

type AddressItemProps = {
  address: IAddressReturn
  isDefault: boolean
  handleSetDefaultAddress: (addressId: string) => void
  handleToggleUpdateModal: (address: IAddressReturn) => void
  handleDeleteAddress: (id: string, e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const AddressItem: React.FC<AddressItemProps> = ({
  address,
  isDefault,
  handleSetDefaultAddress,
  handleDeleteAddress,
  handleToggleUpdateModal
}) => {
  const onSetDefaultAddress = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    handleSetDefaultAddress(address.id)
  }
  const windowSize = useWindowSize()

  return (
    <div
      onClick={() => handleToggleUpdateModal(address)}
      className='flex flex-col items-start w-full gap-1 p-4 duration-200 rounded-lg bg-slate-200 drop-shadow-md hover:drop-shadow-kg hover:scale-[101.5%] hover:cursor-pointer group '
      key={address.id}
    >
      <div className='flex justify-between w-full md:flex-row flex-col'>
        <div className='flex items-start gap-2 text-xl font-bold'>
          <span className='text-xl text-red-500 duration-200 scale-[115%] group-hover:scale-[160%]'>
            {icons.filledLocation}
          </span>

          <span className=' hover:opacity-85 flex items-center'>
            <span
              className={`truncate md:max-w-[50vw] max-w-[30vw] text-md md:text-2xl ${isDefault && windowSize.width < 480 && 'text-green-500'}`}
            >
              {address.name}
            </span>
            {isDefault && windowSize.width > 480 && (
              <Badge className='ml-4' count={'Mặc định'} style={{ backgroundColor: '#52c41a' }} />
            )}
          </span>
        </div>
        <div className='flex gap-3 sm:justify-between justify-between  ml-2'>
          {!isDefault ? (
            <div
              onClick={(e) => onSetDefaultAddress(e)}
              className='text-green-600 hover:cursor-pointer hover:underline opacity-90 hover:opacity-100'
            >
              Mặc định
            </div>
          ) : (
            <div className='text-gray-600 w-16'>Mặc định</div>
          )}
          <Popconfirm
            title='Xóa địa chỉ'
            description='Bạn chắc chắn muốn xóa địa chỉ này?'
            onConfirm={(e) => handleDeleteAddress(address.id, e)}
            onCancel={() => {}}
            okText='Yes'
            cancelText='No'
            okButtonProps={{
              danger: true
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className='text-red-600 hover:cursor-pointer hover:underline opacity-90 hover:opacity-100'
            >
              Xóa
            </div>
          </Popconfirm>
        </div>
      </div>
      <div className='flex flex-col items-start gap-1 text-base'>
        <div>
          <span className='font-semibold'>SĐT:</span> {address.phoneNumber}
        </div>
        <div className='xl:max-w-[720px] sm:max-w-[55vw] max-w-[50vw] overflow-hidden text-left truncate text-ellipsis'>
          {`${address.addressDetail}, ${address.ward}, ${address.district}, ${address.province}`}
        </div>
      </div>
    </div>
  )
}
