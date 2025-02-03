export const filterTiers = [
  {
    typeFilter: 'price',
    title: 'CHỌN MỨC GIÁ',
    options: [
      { value: 'LESS_THAN_100', label: 'Dưới 100.000 đ' },
      { value: 'FROM_100_TO_200', label: 'Từ 100.000 đ - 200.000 đ' },
      { value: 'FROM_200_TO_500', label: 'Từ 200.000 đ - 500.000 đ' },
      { value: 'FROM_500_TO_1000', label: 'Từ 500.000 đ - 1.000.000 đ' },
      { value: 'GREATER_THAN_1000', label: 'Trên 1.000.000 đ' }
    ]
  },
  {
    typeFilter: 'categoryType',
    title: 'LOẠI SẢN PHẨM',
    options: [
      { value: 'áo', label: 'Áo' },
      { value: 'quần', label: 'Quần' },
      { value: 'váy', label: 'Váy' },
      { value: 'đồ gym', label: 'Đồ tập Gym' },
      { value: 'áo cotton', label: 'Áo cotton' },
      { value: 'áo khoác', label: 'Áo khoác' },
      { value: 'áo phông', label: 'Áo phông' },
      { value: 'áo polo', label: 'Áo polo' }
    ]
  },
  {
    typeFilter: 'colorName',
    title: 'CHỌN MÀU SẮC',
    options: [
      { value: 'Xanh lá', label: 'Xanh lá' },
      { value: 'Be', label: 'Be' },
      { value: 'Đen', label: 'Đen' },
      { value: 'Trắng', label: 'Trắng' },
      { value: 'Hồng', label: 'Hồng' },
      { value: 'Đỏ', label: 'Đỏ' },
      { value: 'Nâu', label: 'Nâu' },
      { value: 'Vàng', label: 'Vàng' },
      { value: 'Tím', label: 'Tím' }
    ]
  }
]

export const sortOptions = {
  default: 'DEFAULT',
  option: [
    { value: 'DEFAULT', label: 'Mặc định' },
    { value: 'NAMEINCREASE', label: 'A → Z' },
    { value: 'NAMEDECREASE', label: 'Z → A' },
    { value: 'PRICEINCREASE', label: 'Giá tăng dần' },
    { value: 'PRICEDECREASE', label: 'Giá giảm dần' },
    { value: 'OLDEST', label: 'Cũ nhất' },
    { value: 'NEWEST', label: 'Mới nhất' }
  ]
}
export const collectionLinks = [
  { value: 'nam', label: 'Thời Trang Nam' },
  { value: 'nữ', label: 'Thời Trang Nữ' },
  { value: 'trẻ em', label: 'Thời Trang Trẻ Em' }
]
