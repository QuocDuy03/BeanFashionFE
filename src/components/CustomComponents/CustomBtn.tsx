import { Button, Spin } from 'antd'
import { Link } from 'react-router-dom'

type ButtonProps = {
  title?: string
  type?: 'default' | 'primary' | 'link' | 'text'
  className?: string
  to?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  backgroundColor?: string
  children?: JSX.Element
  icon?: JSX.Element
}
export const CustomBtn: React.FC<ButtonProps> = ({
  title,
  type = 'default',
  className = '',
  to = '',
  htmlType,
  onClick,
  disabled = false,
  loading = false,
  backgroundColor,
  children,
  icon,
}: ButtonProps) => {
  const btnClass = `w-full h-12 text-lg mt-4 font-semibold rounded-md bg-dark-blue transition
    ${type !== 'primary' ? 'bg-white !text-dark-blue border-dark-blue' : 'text-white hover:!bg-blue-cyan hover:opacity-90'} 
    ${disabled ? 'disabled:bg-blue-cyan disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed disabled:!text-white' : ''} 
    ${className}`

  return to ? (
    <Button
      htmlType={htmlType}
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor }}
      icon={icon}
    >
      <Link to={to}>{loading ? <Spin className='text-rose-600' /> : title}</Link>
      {children}
    </Button>
  ) : (
    <Button
      htmlType={htmlType}
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor }}
      icon={icon}
    >
      {children}
      {loading ? <Spin className='text-rose-600' /> : title}
    </Button>
  )
}
