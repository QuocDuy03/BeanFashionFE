import { useEffect, useState } from 'react'

import { message, Spin } from 'antd'

import { addressApi, userApi } from '@/apis'
import { AddressItem, AddressModal, CustomBtn } from '@/components'

import { useApi, useBoolean, useWindowSize } from '@/hooks'
import { IAddress, IAddressReturn } from '@/interfaces'
import { useProvincesStore } from '@/stores'
import { getProvinces } from '@/utils'

export const Address = () => {
  const addModalControl = useBoolean(false)
  const updateModalControl = useBoolean(false)
  const [updatingAddress, setUpdatingAddress] = useState<IAddressReturn>()
  const [defaultAddress, setDefaultAddress] = useState<IAddressReturn>()
  const [addressesList, setAddressesList] = useState<IAddressReturn[]>()
  const [fetchAddressCompleted, setFetchAddressCompleted] = useState(false)

  const { loading: addAddressLoading, callApi: callApiAddAddress } = useApi<void>()
  const { loading: getDefaultAddressLoading, callApi: callApiGetDefaultAddress } = useApi<void>()
  const { loading: getAddressLoading, callApi: callApiGetAddress } = useApi<void>()

  const { setCurrentProvinces, currentProvinces } = useProvincesStore()
  const windowSize = useWindowSize()
  const fetchAddresses = async () => {
    callApiGetAddress(async () => {
      const data = await addressApi.getAddresses()
      if (data) {
        setAddressesList(data.data)
        setFetchAddressCompleted(true)
      } else {
        message.error('Đã xãy ra lỗi khi lấy danh sách địa chỉ!')
      }
    })
  }

  const handleToggleUpdateModal = (defaultData: IAddressReturn) => {
    setUpdatingAddress(defaultData)
    updateModalControl.toggle()
  }

  const handleUpdateAddress = (addressData: IAddress) => {
    if (updatingAddress) {
      callApiAddAddress(async () => {
        const data = await addressApi.updateAddress({ ...addressData, id: updatingAddress.id })
        if (data) {
          updateModalControl.setFalse()
          message.success('Cập nhật địa chỉ thành công!')
          fetchAddresses()
          fetchDefaultAddress()
        } else {
          updateModalControl.setFalse()
          message.error('Đã xãy ra lỗi khi cập nhật địa chỉ!')
        }
      })
    }
  }
  const handleAddAddress = (addressData: IAddress) => {
    callApiAddAddress(async () => {
      const data = await addressApi.addAddress(addressData)
      if (data) {
        addModalControl.setFalse()
        message.success('Thêm địa chỉ thành công!')
        fetchAddresses()
        fetchDefaultAddress()
      } else {
        addModalControl.setFalse()
        message.error('Đã xãy ra lỗi khi thêm địa chỉ!')
      }
    })
  }
  const handleDeleteAddress = (id: string, e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e?.stopPropagation()
    if (id) {
      callApiAddAddress(async () => {
        const data = await addressApi.deleteAddress(id)
        if (data) {
          message.success('Xóa địa chỉ thành công!')
          fetchAddresses()
          fetchDefaultAddress()
        } else {
          message.error('Đã xãy ra lỗi khi xóa địa chỉ!')
        }
      })
    }
  }
  const fetchProvinces = async () => {
    const provincesList = await getProvinces()
    setCurrentProvinces(provincesList)
  }
  const fetchDefaultAddress = () => {
    callApiAddAddress(async () => {
      const data = await userApi.getDefaultAddress()
      if (data) {
        setDefaultAddress(data.data)
      } else {
        message.error('Đã xãy ra lỗi khi lấy địa chỉ mặc định!')
      }
    })
  }
  const handleSetDefaultAddress = (addressId: string) => {
    callApiGetDefaultAddress(async () => {
      const data = await userApi.setDefaultAddress(addressId)
      if (data) {
        setDefaultAddress(data.data)
        fetchAddresses()
        fetchDefaultAddress()
      } else {
        message.error('Đã xãy ra lỗi khi lấy địa chỉ mặc định!')
      }
    })
  }
  useEffect(() => {
    fetchAddresses()
    fetchDefaultAddress()
    if (currentProvinces.length <= 0) fetchProvinces()
  }, [])
  return (
    <section className='px-2 xs:px-4 '>
      <div className='flex items-center justify-between w-full'>
        <div className='text-2xl font-bold xs:text-2xl text-dark-blue'>
          {windowSize.width > 640 ? 'Địa chỉ của bạn' : 'Địa chỉ'}
        </div>
        <div className='w-fit flex items-center'>
          <CustomBtn
            onClick={addModalControl.toggle}
            type='primary'
            title={windowSize.width > 640 ? 'Thêm địa chỉ' : 'Thêm'}
          ></CustomBtn>
        </div>
      </div>
      {!getDefaultAddressLoading && !getAddressLoading && fetchAddressCompleted ? (
        addressesList?.length ? (
          <div className='max-h-[78vh] overflow-y-scroll w-full flex flex-col items-start gap-4 md:pl-4 my-4 md:pr-8 md:py-2 px-1 pr-2 pl-2'>
            {addressesList
              ?.sort((a, b) => {
                if (a.id === defaultAddress?.id && b.id !== defaultAddress?.id) {
                  return -1
                } else if (a.id !== defaultAddress?.id && b.id === defaultAddress?.id) {
                  return 1
                }
                return 0
              })
              .map((address: IAddressReturn) => (
                <AddressItem
                  isDefault={address.id === defaultAddress?.id}
                  key={address.id}
                  address={address}
                  handleSetDefaultAddress={handleSetDefaultAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleToggleUpdateModal={handleToggleUpdateModal}
                />
              ))}
          </div>
        ) : (
          <div className='text-xl mt-10 text-red-500'>Bạn chưa thêm địa chỉ nào</div>
        )
      ) : (
        <Spin />
      )}
      {addModalControl.value && (
        <AddressModal
          title={'Thêm địa chỉ mới'}
          onSubmit={handleAddAddress}
          loadingSubmit={addAddressLoading}
          modalControl={addModalControl}
        />
      )}
      {updateModalControl.value && (
        <AddressModal
          title={'Chỉnh sửa địa chỉ'}
          defaultData={updatingAddress}
          onSubmit={handleUpdateAddress}
          loadingSubmit={addAddressLoading}
          modalControl={updateModalControl}
        />
      )}
    </section>
  )
}
