import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Select, Spin } from 'antd'

import axios from 'axios'

import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import { storeSystemApi } from '@/apis'
import { useApi } from '@/hooks'

import { CenterMapOnCurrentLocation, CustomBreadcrumb } from '@/components'
import { ILocation } from '@/interfaces'
import { icons } from '@/utils'

type Location = {
  value: number
  label: string
}

export function StoreSystem() {
  const [filteredProvince, setFilteredProvince] = useState<Location[]>([])
  const [filteredDistrict, setFilteredDistrict] = useState<Location[]>([])
  const [filteredWard, setFilteredWard] = useState<Location[]>([])
  const { callApi: callStoreSystemApi } = useApi<void>()

  const [selectedProvince, setSelectedProvince] = useState<Location | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<Location | null>(null)
  const [selectedWard, setSelectedWard] = useState<Location | null>(null)

  const [storeLocation, setStoreLocation] = useState<ILocation[]>([])
  const [currentCoords, setCurrentCoords] = useState<LatLngExpression>()
  const [filteredStoreLocation, setFilteredStoreLocation] = useState<ILocation[]>([])
  const [isFilter, setIsFilter] = useState<boolean>(false)

  const getStoreLocation = async () => {
    callStoreSystemApi(async () => {
      const { data } = await storeSystemApi.getStore()
      if (data) {
        setStoreLocation(data)
        setCurrentCoords([data[0].latitude, data[0].longitude])
      }
    })
  }

  const getProvince = async () => {
    const response = await axios.get(`${import.meta.env.VITE_PROVINCE_URL}/p/`)
    const provinces: Location[] = response.data.map((item: any) => ({
      value: item.code,
      label: item.name
    }))

    setFilteredProvince(provinces)
  }

  const getDistrict = async () => {
    const provinceCode = selectedProvince?.value
    const response = await axios.get(`${import.meta.env.VITE_PROVINCE_URL}/p/${provinceCode}`, {
      params: {
        depth: 2
      }
    })
    const districts: Location[] = response.data?.districts.map((item: any) => ({
      value: item?.code,
      label: item?.name
    }))
    setFilteredDistrict(districts)
  }

  const getWard = async () => {
    const districtCode = selectedDistrict?.value
    const response = await axios.get(`${import.meta.env.VITE_PROVINCE_URL}/d/${districtCode}`, {
      params: {
        depth: 2
      }
    })
    const wards: Location[] = response.data?.wards.map((item: any) => ({
      value: item?.code,
      label: item?.name
    }))
    setFilteredWard(wards)
  }

  const handleProvinceChange = (province: Location) => {
    setIsFilter(true)

    const filterStoreProvince = storeLocation.filter(
      (item) => item.province.toLowerCase() === province.label.toLowerCase()
    )
    setFilteredStoreLocation(filterStoreProvince)
    setSelectedProvince(province)

    setSelectedDistrict(null)
    setFilteredDistrict([])

    setSelectedWard(null)
    setFilteredWard([])
  }

  const handleDistrictChange = (district: Location) => {
    const filterStoreDistrict = storeLocation.filter(
      (item) => item.district.toLowerCase() === district.label.toLowerCase()
    )
    setFilteredStoreLocation(filterStoreDistrict)
    setSelectedDistrict(district)

    setSelectedWard(null)
    setFilteredWard([])
  }

  const handleWardChange = (ward: Location) => {
    const filterStoreWard = storeLocation.filter((item) => item.ward.toLowerCase() === ward.label.toLowerCase())
    setFilteredStoreLocation(filterStoreWard)
    setSelectedWard(ward)
  }

  const handleLocationChange = (location: ILocation) => {
    setCurrentCoords([location.latitude, location.longitude])
  }

  useEffect(() => {
    getStoreLocation()
  }, [])

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <CustomBreadcrumb items={[{ title: <Link to='/home'>Trang chủ</Link> }, { title: 'Hệ thống cửa hàng' }]} />
      <div className='xl:w-1200 mx-auto my-2'>
        <Row gutter={10}>
          <Col span={width >= 768 ? 8 : 24}>
            <div className='bg-blue-cyan p-2.5'>
              <div className='mb-2 w-full'>
                <Select
                  className='!w-full text-left'
                  showSearch
                  placeholder='Chọn tỉnh thành'
                  optionFilterProp='label'
                  onChange={(_, option) => handleProvinceChange(option as Location)}
                  options={filteredProvince}
                  onFocus={getProvince}
                  value={selectedProvince}
                  size='large'
                />
              </div>
              <div className='mb-2 w-full'>
                <Select
                  className='!w-full text-left'
                  showSearch
                  placeholder='Chọn quận huyện'
                  optionFilterProp='label'
                  onChange={(_, option) => handleDistrictChange(option as Location)}
                  options={filteredDistrict}
                  onFocus={getDistrict}
                  value={selectedDistrict}
                  size='large'
                />
              </div>
              <div className='mb-2 w-full'>
                <Select
                  className='!w-full text-left'
                  showSearch
                  placeholder='Chọn xã phường'
                  optionFilterProp='label'
                  onChange={(_, option) => handleWardChange(option as Location)}
                  options={filteredWard}
                  onFocus={getWard}
                  value={selectedWard}
                  size='large'
                />
              </div>
              <div className='md:h-[380px] overflow-hidden overflow-y-auto mt-4 text-left'>
                {!isFilter ? (
                  storeLocation.length ? (
                    storeLocation.map((store) => (
                      <div
                        key={store.id}
                        className='bg-white p-1 leading-6 border border-dashed border-gray-200 cursor-pointer'
                        onClick={() => handleLocationChange(store)}
                      >
                        <div className='relative inline-block py-2 px-1'>
                          <h4 className='font-bold capitalize'> Bean Fashion {store.ward}</h4>
                          <span className='relative text-sm pl-5 text-gray-500 w-full inline-block capitalize'>
                            <i className='absolute top-0.5 left-0'>{icons.locationDarkBlue}</i>
                            {`${store.addressDetail}, ${store.ward}, ${store.district}, ${store.province}`}
                          </span>
                          <span className='relative text-sm pl-5 text-gray-500 w-full inline-block capitalize'>
                            <i className='absolute top-0.5 left-0'>{icons.phoneDarkBlue}</i>
                            {`${store.phoneNumber}`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Spin className='text-center w-full' />
                  )
                ) : (
                  filteredStoreLocation.map((store) => (
                    <div
                      key={store.id}
                      className='bg-white p-1 leading-6 border border-dashed border-gray-200 cursor-pointer'
                      onClick={() => handleLocationChange(store)}
                    >
                      <div className='relative inline-block py-2 px-1'>
                        <h4 className='font-bold capitalize'> Bean Fashion {store.ward}</h4>
                        <span className='relative text-sm pl-5 text-gray-500 w-full inline-block capitalize'>
                          <i className='absolute top-0.5 left-0'>{icons.locationDarkBlue}</i>
                          {`${store.addressDetail}, ${store.ward}, ${store.district}, ${store.province}`}
                        </span>
                        <span className='relative text-sm pl-5 text-gray-500 w-full inline-block capitalize'>
                          <i className='absolute top-0.5 left-0'>{icons.phoneDarkBlue}</i>
                          {`${store.phoneNumber}`}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Col>
          <Col span={width >= 768 ? 16 : 24}>
            {currentCoords ? (
              <MapContainer
                center={currentCoords}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '550px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={currentCoords} />
                <CenterMapOnCurrentLocation coords={currentCoords} />
              </MapContainer>
            ) : (
              <Spin />
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
