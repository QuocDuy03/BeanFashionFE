import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'

export const CountdownTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  let targetTime: Date
  const currentHour = currentTime.getHours()

  if (currentHour >= 0 && currentHour < 6) {
    targetTime = new Date(currentTime)
    targetTime.setHours(6, 0, 0, 0)
  } else if (currentHour >= 6 && currentHour < 12) {
    targetTime = new Date(currentTime)
    targetTime.setHours(12, 0, 0, 0)
  } else if (currentHour >= 12 && currentHour < 18) {
    targetTime = new Date(currentTime)
    targetTime.setHours(18, 0, 0, 0)
  } else {
    targetTime = new Date(currentTime)
    targetTime.setHours(24, 0, 0, 0)
  }

  const timeRemain = Math.floor((targetTime.getTime() - currentTime.getTime()) / 1000)
  const hours = Math.floor(timeRemain / 3600)
  const minutes = Math.floor((timeRemain % 3600) / 60)
  const seconds = timeRemain % 60

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='h-full w-auto min-w-24 text-center px-2 py-1'>
      <h2 className='text-black leading-7'>{width >= 768 ? 'Thời gian khuyến mãi' : 'TGKM'}</h2>
      <Row className='mx-auto' justify={'center'}>
        <Col className='text-center'>
          <div className='md:w-9 w-5 h-6 md:text-lg text-sm flex justify-center items-center font-semibold mr-1 text-white rounded bg-red-500'>
            <span className=''>{hours}</span>
          </div>
        </Col>
        <Col className='text-center'>
          <div className='md:w-9 w-5 h-6 md:text-lg text-sm flex justify-center items-center font-semibold mr-1 text-white rounded bg-red-500'>
            <span className=''>{minutes}</span>
          </div>
        </Col>
        <Col className='text-center'>
          <div className='md:w-9 w-5 h-6 md:text-lg text-sm flex justify-center items-center font-semibold mr-1 text-white rounded bg-red-500'>
            <span className=''>{seconds}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}
