import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, ConfigProvider, Form, message, Modal, Select } from 'antd'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { IAddress, IAddressFieldData, IUseBoolean } from '@/interfaces'
import { getDistricts, getWards, icons, phoneRegExp } from '@/utils'
import { useBoolean, useWindowSize } from '@/hooks'
import { useProvincesStore } from '@/stores'
import { AddressMap, CustomInput } from '@/components'

interface IAddressDefault extends IAddress {
  id: string
}

type AddressModalProps = {
  modalControl: IUseBoolean
  loadingSubmit: boolean
  onSubmit: (addressData: IAddress) => void
  title: string
  defaultData?: IAddressDefault
}
type AddressFields =
  | 'name'
  | 'phoneNumber'
  | 'province'
  | 'district'
  | 'ward'
  | 'addressDetail'
  | 'longitude'
  | 'latitude'

const addressSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập họ tên!'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập mật khẩu!'),
  province: yup.string().required('Vui lòng chọn tỉnh!'),
  district: yup.string().required('Vui lòng chọn thành phố!'),
  ward: yup.string().required('Vui lòng chọn huyện, xã!'),
  addressDetail: yup.string().required('Vui lòng nhập địa chỉ!'),
  longitude: yup.string(),
  latitude: yup.string()
})

export const AddressModal: React.FC<AddressModalProps> = ({
  modalControl,
  loadingSubmit,
  title,
  defaultData,
  onSubmit
}) => {
  const { currentProvinces } = useProvincesStore()
  const windowSize = useWindowSize()
  const [districts, setDistricts] = useState<IAddressFieldData[]>()
  const [wards, setWards] = useState<IAddressFieldData[]>()
  const mapVisible = useBoolean(false)
  const isFetchingAddress = useBoolean(false)

  const handleCancel = async () => {
    await reset()
    mapVisible.setFalse()
    modalControl.setFalse()
  }
  const defaultWardData = {
    value: '0',
    label: 'Khác',
    id: ''
  }
  const addressFields: AddressFields[] = ['province', 'district', 'ward', 'addressDetail']
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    resetField,
    clearErrors,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: defaultData ? (({ id, ...rest }) => rest)(defaultData) : {},
    shouldUnregister: false,
    resolver: yupResolver(addressSchema)
  })
  const fetchDistricts = async (provinceID: string): Promise<IAddressFieldData[]> => {
    const districtData = await getDistricts(provinceID)
    setDistricts(districtData)
    return districtData
  }
  const fetchWards = async (districtID: string): Promise<IAddressFieldData[]> => {
    const wardData = await getWards(districtID)
    setWards([...wardData, defaultWardData])
    return wardData
  }

  const emptyAddressFields = (fields: AddressFields[]) => {
    fields.forEach((field) => {
      if (defaultData) {
        setValue(field, '')
      } else {
        resetField(field)
      }
    })
  }

  const fetchDefaultData = async () => {
    if (defaultData) {
      const province = currentProvinces?.find((item) => item.value.includes(defaultData.province))
      if (province) {
        const districtsList = await fetchDistricts(province.id)
        const district = districtsList?.find((item) => item.value.includes(defaultData.district))
        if (district) {
          await fetchWards(district.id)
        }
      }
    }
  }

  useEffect(() => {
    fetchDefaultData()
  }, [defaultData])

  const handleSelectProvince = async (provinceParam: string) => {
    emptyAddressFields(['district', 'ward', 'addressDetail', 'latitude', 'longitude'])
    fetchDistrictByProvicename(provinceParam)
  }

  const handleSelectDistrict = async (districtParam: string) => {
    emptyAddressFields(['ward', 'addressDetail', 'latitude', 'longitude'])
    fetchWardByDistrictName(districtParam)
  }

  const fetchDistrictByProvicename = async (provinceName: string) => {
    const province = currentProvinces?.find((item) => item.value.includes(provinceName))
    if (province) {
      await fetchDistricts(province.id)
    } else {
      emptyAddressFields(addressFields)
    }
  }
  const fetchWardByDistrictName = async (districtName: string) => {
    const district = districts?.find((item) => item.value.includes(districtName))
    if (district) {
      await fetchWards(district.id)
    } else {
      emptyAddressFields(['district', 'ward', 'addressDetail'])
    }
  }

  const handleSelectWard = () => {
    emptyAddressFields(['latitude', 'longitude'])
  }

  const handlePickLocation = async (
    addressFilterReturn: Omit<IAddress, 'longitude' | 'latitude' | 'phoneNumber' | 'name'>,
    coords?: number[]
  ) => {
    try {
      const province = currentProvinces?.find((item) =>
        item.value.toLowerCase().includes(addressFilterReturn.province.toLowerCase())
      )
      if (!province) {
        message.error('Tỉnh, thành phố không hợp lệ!')
        emptyAddressFields(addressFields)
        return
      }

      setValue('province', province.value, { shouldDirty: true })
      const districtData = await fetchDistricts(province.id)
      const district = districtData.find((item) =>
        item.value.toLowerCase().includes(addressFilterReturn.district.toLowerCase())
      )

      if (!district) {
        message.error('Quận, huyện không hợp lệ!')
        emptyAddressFields(addressFields)
        return
      }
      setValue('district', district.value, { shouldDirty: true })

      const wardData = await fetchWards(district.id)
      const ward = wardData.find((item) => item.value.toLowerCase().includes(addressFilterReturn.ward.toLowerCase()))
      if (ward) {
        setValue('ward', ward.value, { shouldDirty: true })
      } else {
        if (addressFilterReturn.ward) {
          addressFilterReturn.addressDetail = `${addressFilterReturn.addressDetail ? `${addressFilterReturn.addressDetail}, ${addressFilterReturn.ward}` : addressFilterReturn.ward}`
        }
        setValue('ward', '0', { shouldDirty: true })
      }
      setValue('addressDetail', addressFilterReturn.addressDetail, { shouldDirty: true })
      if (coords) {
        setValue('longitude', coords[0].toString(), { shouldDirty: true })
        setValue('latitude', coords[1].toString(), { shouldDirty: true })
      }
      addressFields.forEach((item) => {
        clearErrors(item)
      })
    } catch (error) {
      emptyAddressFields(addressFields)
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            singleItemHeightLG: 48,
            optionSelectedFontWeight: 600
          }
        }
      }}
    >
      <Modal
        title={[
          <div key={'modal-title'} className='text-xl'>
            {title}
          </div>
        ]}
        maskClosable={false}
        open={modalControl.value}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        width={800}
        footer={[
          <div key={'footer-control'} className='flex justify-between'>
            <div>
              {mapVisible.value ? (
                <Button
                  onClick={mapVisible.toggle}
                  className={'bg-red-600 text-white hover:!text-red-600 hover:!border-red-600'}
                  variant='solid'
                  size='large'
                >
                  {windowSize.width > 480 && 'Ẩn bản đồ'}
                  {icons.map}
                </Button>
              ) : (
                <Button
                  onClick={mapVisible.toggle}
                  className={'bg-green-600 text-white hover:!text-green-600 hover:!border-green-600'}
                  variant='solid'
                  size='large'
                >
                  {windowSize.width > 480 && 'Chọn trên bản đồ'}
                  {icons.map}
                </Button>
              )}
            </div>
            <div className='flex gap-2'>
              <Button size='large' key='back' onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                size='large'
                loading={loadingSubmit}
                disabled={!isDirty}
                key='submit'
                type='primary'
                onClick={handleSubmit(onSubmit)}
              >
                Ok
              </Button>
            </div>
          </div>
        ]}
      >
        <Form className='mb-4' onFinish={handleSubmit(onSubmit)} layout='vertical'>
          <CustomInput
            className='mt-0 !font-normal'
            key={'name'}
            name={'name'}
            size='large'
            type={'text'}
            control={control}
            errors={errors}
            placeholder={'Họ tên'}
          />
          <CustomInput
            className='mt-0 !font-normal'
            key={'phoneNumber'}
            name={'phoneNumber'}
            size='large'
            type={'text'}
            control={control}
            errors={errors}
            placeholder={'Số điện thoại'}
          />
          <div className='flex flex-wrap justify-between'>
            <Form.Item
              className='w-full mt-4 mb-0 text-lg font-normal text-left border-0 lg:w-60 hover:border-dark-blue'
              validateStatus={errors['province'] ? 'error' : ''}
              help={errors['province']?.message}
            >
              <Controller
                name={'province'}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='text-lg  address-select'
                    loading={isFetchingAddress.value}
                    disabled={isFetchingAddress.value}
                    size='large'
                    onSelect={() => handleSelectProvince(getValues('province'))}
                    showSearch
                    value={getValues('province')}
                    placeholder='Chọn tỉnh, thành phố'
                    filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={currentProvinces}
                    rootClassName='!hover:border-dark-blue'
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              className='w-full mt-4 mb-0 text-lg font-normal text-left border-0 lg:w-60 hover:border-dark-blue'
              validateStatus={errors['district'] ? 'error' : ''}
              help={errors['district']?.message}
            >
              <Controller
                name={'district'}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='text-lg  address-select'
                    size='large'
                    loading={isFetchingAddress.value}
                    disabled={isFetchingAddress.value}
                    onSelect={() => handleSelectDistrict(getValues('district'))}
                    showSearch
                    value={getValues('district')}
                    placeholder='Chọn quận, huyện'
                    filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={districts}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              className='w-full mt-4 mb-0 text-lg font-normal text-left border-0 lg:w-60 hover:border-dark-blue'
              validateStatus={errors['ward'] ? 'error' : ''}
              help={errors['ward']?.message}
            >
              <Controller
                name={'ward'}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='text-lg  address-select'
                    size='large'
                    loading={isFetchingAddress.value}
                    disabled={isFetchingAddress.value}
                    onSelect={() => handleSelectWard()}
                    showSearch
                    value={getValues('ward')}
                    placeholder='Chọn phường, xã'
                    filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={wards}
                  />
                )}
              />
            </Form.Item>
          </div>
          <CustomInput
            className='mt-0 !font-normal'
            key={'addressDetail'}
            name={'addressDetail'}
            size='large'
            type={'text'}
            disabled={isFetchingAddress.value}
            control={control}
            errors={errors}
            placeholder={'Địa chỉ'}
          />
        </Form>
        {mapVisible.value && (
          <AddressMap isFetchingAddress={isFetchingAddress} handlePickLocation={handlePickLocation} />
        )}
      </Modal>
    </ConfigProvider>
  )
}
