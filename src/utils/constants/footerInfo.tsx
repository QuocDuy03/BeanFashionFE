import { icons } from '../icons'

export const footerInfo = [
  {
    title: 'VỀ CHÚNG TÔI',
    data: [
      { text: ' Trang chủ', to: '/' },
      { text: 'Nữ', to: '' },
      { text: 'Nam', to: '' },
      { text: 'Trẻ em', to: '' },
      { text: 'Sản phẩm', to: '' },
      { text: 'Tin tức', to: '' },
      { text: 'Liên hệ', to: '/contact' }
    ]
  },
  {
    title: 'HỖ TRỢ',
    data: [
      { text: 'Giải đáp thắc mắc', to: '/inquiries_sup' },
      { text: 'Hướng dẫn đổi trả', to: '/exchange_sup' },
      { text: 'Hướng dẫn chọn size', to: '/size_sup' },
      { text: 'Hướng dẫn thanh toán', to: '/payment_sup' },
      { text: 'Chương trình cộng tác viên', to: '/collab_sup' },
      { text: 'Tư vấn bán sỉ', to: '/retail_sup' },
      { text: 'Quà tặng tri ân', to: '/gift_sup' }
    ]
  },
  {
    title: ' CHÍNH SÁCH',
    data: [
      { text: 'Chính sách thành viên', to: '/membership_pol' },
      { text: 'Chính sách thanh toán', to: '/payment_pol' },
      { text: 'Hướng dẫn mua hàng', to: '/purchase_pol' },
      { text: 'Chính sách đổi sản phẩm', to: '/exchange_pol' },
      { text: 'Bảo mật thông tin cá nhân', to: '/security_pol' },
      { text: 'Nhập hàng giá sỉ', to: '/stock_pol' },
      { text: 'Chính sách cộng tác viên', to: '/collab_pol' }
    ]
  }
]

export const socialMedias = [
  {
    to: '/facebook',
    icon: icons.facebook
  },
  {
    to: '/twitter',
    icon: icons.twitter
  },
  {
    to: '/youtube',
    icon: icons.youtube
  },
  {
    to: '/instagram',
    icon: icons.instagram
  }
]

export const contactInfo = [
  {
    title: 'Địa chỉ:',
    text: '70 Lữ Gia, Phường 15, Quận 11, Thành phố Hồ Chí Minh',
    to: '/'
  },
  {
    title: 'Email:',
    text: 'support@sapo.vn',
    to: 'mailto:support@sapo.vn'
  },
  {
    title: 'Điện thoại:',
    text: '1900 6750',
    to: 'tel:1900 6750'
  }
]
