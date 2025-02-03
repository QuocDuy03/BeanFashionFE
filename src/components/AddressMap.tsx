import { useEffect, useState } from 'react'

import axios from 'axios'
import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Button, message, Spin } from 'antd'

import { addressFilter, getLocation, icons } from '@/utils'
import { IUseBoolean } from '@/interfaces'

type AddressMapProps = {
  handlePickLocation: (addressFilterReturn: AddressFilterReturn, coords: number[]) => void
  isFetchingAddress: IUseBoolean
}
type AddressFilterReturn = {
  province: string
  district: string
  ward: string
  addressDetail: string
}

export const AddressMap: React.FC<AddressMapProps> = ({ handlePickLocation, isFetchingAddress }) => {
  const [currentCoords, setCurrentCoords] = useState<LatLngExpression>([10.7769, 106.7009])
  const [locationError, setLocationError] = useState<string>()
  const fetchCurrentLocation = async () => {
    isFetchingAddress.setTrue()
    const location = await getLocation()

    if (location.coords) {
      setCurrentCoords([location.coords.latitude, location.coords.longitude])
      fetchLocationInfo(location.coords.latitude, location.coords.longitude)
    } else {
      setLocationError(location.err || 'Không xác định được vị trí')
      message.error(location.err || 'Không xác định được vị trí')
    }
    isFetchingAddress.setFalse()
  }
  useEffect(() => {
    fetchCurrentLocation()
  }, [])

  const handleSetCurrentLocation = () => {
    fetchCurrentLocation()
  }
  const fetchLocationInfo = async (lat: number, lng: number) => {
    try {
      isFetchingAddress.setTrue()

      const response = await axios.get(import.meta.env.VITE_NOMINATIM_URL, {
        params: {
          format: 'json',
          lat,
          lon: lng,
          zoom: 18
        },
        headers: {
          'Accept-Language': 'vi'
        }
      })
      const data = response.data
      if (data && data.address) {
        const newFieldValues = addressFilter(data.display_name)
        handlePickLocation(newFieldValues, [lat, lng])
        isFetchingAddress.setFalse()
      } else {
        isFetchingAddress.setFalse()

        message.error('Không tìm thấy thông tin vị trí.')
      }
    } catch (error) {
      isFetchingAddress.setFalse()
      message.error('Lỗi khi lấy thông tin vị trí')
    }
  }
  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng
    setCurrentCoords([lat, lng])
    fetchLocationInfo(lat, lng)
  }
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick
    })
    return null
  }
  return currentCoords || locationError ? (
    <div className=''>
      <div className='flex items-center justify-between gap-1 py-2'>
        <div>Chọn vị trí của bạn trên bản đồ:</div>
        <Button
          disabled={isFetchingAddress.value}
          onClick={handleSetCurrentLocation}
          className={`w-8 h-8 p-0 border-red-600 ${!isFetchingAddress.value && 'hover:!border-red-500'}  rounded-full hover:!drop-shadow-lg drop-shadow-sm`}
        >
          <div className={`text-2xl text-red-500 hover:text-red-400}`}>{icons.currentLocation}</div>
        </Button>
      </div>
      <MapContainer center={currentCoords} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {currentCoords && <Marker position={currentCoords} />}
        {!isFetchingAddress.value && <MapClickHandler />}
        <CenterMapOnCurrentLocation coords={currentCoords} />
      </MapContainer>
    </div>
  ) : (
    <div className='flex justify-center w-full mt-4'>
      <Spin />
    </div>
  )
}

export const CenterMapOnCurrentLocation: React.FC<{ coords: LatLngExpression }> = ({ coords }) => {
  const map = useMap()

  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom())
    }
  }, [coords, map])

  return null
}
