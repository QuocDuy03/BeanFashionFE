import { useAuthStore } from '@/stores'
export const Profile = () => {
  const { currentUser } = useAuthStore()

  return (
    <div className='text-left'>
      <h3 className='text-lg font-medium uppercase mb-7'>Thông tin tài khoản</h3>
      <div className='mb-4'>
        <span className='text-base font-medium'>Họ tên: </span>
        <span className='text-base'>{currentUser?.fullName}</span>
      </div>
      <div>
        <span className='text-base font-medium'>Email: </span>
        <span className='text-base'>{currentUser?.email}</span>
      </div>
    </div>
  )
}
