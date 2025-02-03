import { ErrorCode } from '@/utils/common'

export const errorResponseCases: Record<ErrorCode | string, string> = {
  [ErrorCode.EMAIL_ALREADY_REGISTERED]: 'Email đã được đăng ký!',
  [ErrorCode.EMAIL_NO_AUTHENTICATED]: 'Email chưa được xác thực!',
  [ErrorCode.INCORRECT_PASSWORD]: 'Mật khẩu không chính xác!',
  [ErrorCode.USER_NOT_FOUND]: 'Email chưa được đăng ký!',
  [ErrorCode.OTP_INVALID]: 'OTP đã hết hạn hoặc không hợp lệ!',
  [ErrorCode.MISSING_INPUT]: 'Thiếu thông tin đầu vào!',
  [ErrorCode.INVALID_LINK_EMAIL_VERIFICATION]: 'Liên kết xác nhận không hợp lệ!',
  [ErrorCode.EMAIL_DEACTIVATED]: 'Email đã bị hủy kích hoạt!',
  [ErrorCode.INVITATION_NOT_FOUND]: 'Không tìm thấy lời mời!',
  [ErrorCode.CART_PRODUCT_NOT_FOUND]: 'Không tìm thấy sản phẩm!',
  [ErrorCode.OUT_OF_STOCK]: 'Số lượng sản phẩm trong kho không đủ!',
  Login: 'Vui lòng đăng nhập để sử dụng tính năng này!',
  All: 'Đã có lỗi xảy ra. Vui lòng kiểm tra lại'
}
