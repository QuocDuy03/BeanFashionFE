import { Col, Row } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/stores'
import { menuSidebar } from '@/utils/constants'

export const ProfileLayout = () => {
  const { currentUser } = useAuthStore()

  return (
    <section className='flex mt-4'>
      <Row className='m-auto w-1200'>
        <Col span={4}>
          <div className='text-left'>
            <h3 className='text-lg font-medium'>TRANG TÀI KHOẢN</h3>
            <span className='text-base font-medium'>Xin chào, </span>
            <span className='text-base font-medium capitalize text-dark-blue'>{currentUser?.fullName} !</span>
            <ul className='mt-3'>
              {menuSidebar.map((menuItem) => (
                <li key={menuItem.key}>
                  <NavLink
                    to={menuItem.linkTo}
                    className={({ isActive }) =>
                      `inline-block text-base py-2 hover:text-yellow ${isActive ? 'text-yellow font-medium' : ''}`
                    }
                  >
                    {menuItem.title}
                    {menuItem.key === 'addresses' && <span> (0)</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col span={20}>
          <Outlet />
        </Col>
      </Row>
    </section>
  )
}
