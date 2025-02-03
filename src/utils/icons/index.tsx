import { LiaPhoneSolid } from 'react-icons/lia'
import { CiLocationOn, CiSettings } from 'react-icons/ci'
import { BsBank2, BsCashStack, BsSearch, BsSortDown } from 'react-icons/bs'
import { SlUser, SlLogin, SlLogout } from 'react-icons/sl'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import {
  FaGift,
  FaPlus,
  FaFilter,
  FaMinus,
  FaMapLocationDot,
  FaLocationDot,
  FaTruck,
  FaArrowDownLong,
  FaArrowUpLong
} from 'react-icons/fa6'
import { IoEyeOutline, IoCaretForwardOutline } from 'react-icons/io5'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaUser, FaRegHeart, FaSortAmountDown, FaFireAlt, FaBan } from 'react-icons/fa'
import { FiX, FiInfo } from 'react-icons/fi'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { MdOutlineWatchLater } from 'react-icons/md'
import { BiCurrentLocation, BiSolidDiscount } from 'react-icons/bi'
import { PiUserPlus } from 'react-icons/pi'
import { IoIosMenu } from "react-icons/io";

export const icons = {
  phone: <LiaPhoneSolid />,
  phoneDarkBlue: <LiaPhoneSolid className='text-blue-cyan' />,
  location: <CiLocationOn />,
  locationDarkBlue: <CiLocationOn className='text-blue-cyan' />,
  search: <BsSearch />,
  user: <SlUser />,
  shoppingBag: <HiOutlineShoppingBag />,
  gift: <FaGift />,
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  instagram: <FaInstagram />,
  settings: <CiSettings />,
  eye: <IoEyeOutline />,
  info: {
    white: <FiInfo className='text-white' />,
    red: <FiInfo className='text-rose-600' />
  },
  faUser: <FaUser />,
  watch: <MdOutlineWatchLater />,
  heart: <FaRegHeart />,
  rightChevon: <IoCaretForwardOutline />,
  discount: <BiSolidDiscount />,
  sortDecreasing: <BsSortDown />,
  close: <FiX />,
  nextPage: <GrNext />,
  prevPage: <GrPrevious />,
  minus: <FaMinus />,
  plus: <FaPlus />,
  login: <SlLogin />,
  logout: <SlLogout />,
  register: <PiUserPlus />,
  filter: <FaFilter />,
  map: <FaMapLocationDot />,
  currentLocation: <BiCurrentLocation />,
  filledLocation: <FaLocationDot />,
  sort: <FaSortAmountDown />,
  delivery: <FaTruck />,
  bank: <BsBank2 />,
  cash: <BsCashStack />,
  downArrow: <FaArrowDownLong />,
  upArrow: <FaArrowUpLong />,
  ban: <FaBan />,
  topSearch: <FaFireAlt />,
  menu: <IoIosMenu />
}
