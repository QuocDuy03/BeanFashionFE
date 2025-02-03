import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  Col,
  Image,
  Input,
  message,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tooltip
} from 'antd'

import { orderApi } from '@/apis'
import { OrderDetailModal } from '@/components'
import { useApi, useBoolean, useWindowSize } from '@/hooks'
import { IOrderQuery, IOrderReturn } from '@/interfaces'
import {
  ConvertDateString,
  ConvertTimeString,
  FilterOptions,
  getOrderStatusByEnum,
  icons,
  OrderStatus,
  SortOptions
} from '@/utils'

type PaginationType = {
  totalPages?: number
  totalOrders?: number
  currentPage?: number
  limit?: number
}

export const Orders = () => {
  const viewOrderModalControl = useBoolean()
  const windowSize = useWindowSize()

  const [searchParam, setSearchParam] = useSearchParams()
  const [fetchOrderCompleted, setFetchOrderCompleted] = useState(false)

  const [orders, setOrders] = useState<IOrderReturn[]>([])
  const [selectedOrder, setSelectedOrder] = useState<IOrderReturn>()
  const [pagination, setPagination] = useState<PaginationType>({})
  const [inputKeyword, setInputKeyword] = useState<string>(searchParam.get('keyword') || '')
  const [currentSearchParams, setCurrentSearchParams] = useState<IOrderQuery>({
    page: parseInt(searchParam.get('page') || '1'),
    limit: parseInt(searchParam.get('limit') || '5'),
    sortBy: (searchParam.get('sortBy') as SortOptions) ?? SortOptions.DateDecrease,
    filter: (searchParam.get('filter') as FilterOptions) ?? FilterOptions.None,
    keyword: searchParam.get('keyword') ?? ''
  })

  const { loading: callOrderApiLoading, callApi: callOrderApi } = useApi<void>()

  const hanldeSelectOrder = (order: IOrderReturn) => {
    setSelectedOrder(order)
    viewOrderModalControl.setTrue()
  }
  const getSortOptionElm = (title: string, icon?: JSX.Element) => {
    return (
      <span className='flex items-center gap-1'>
        <span>{title}</span>
        <span>{icon}</span>
      </span>
    )
  }
  const sortOptions = [
    {
      value: SortOptions.DateDecrease,
      label: getSortOptionElm('Date:', icons.downArrow)
    },
    {
      value: SortOptions.DateIncrease,
      label: getSortOptionElm('Date:', icons.upArrow)
    },
    {
      value: SortOptions.PriceDecrease,
      label: getSortOptionElm('Price:', icons.downArrow)
    },
    {
      value: SortOptions.PriceIncrease,
      label: getSortOptionElm('Price:', icons.upArrow)
    }
  ]
  const filterOptions = [
    {
      value: FilterOptions.Delivered,
      label: FilterOptions.Delivered
    },
    {
      value: FilterOptions.Delivering,
      label: FilterOptions.Delivering
    },
    {
      value: FilterOptions.Confirmed,
      label: FilterOptions.Confirmed
    },

    {
      value: FilterOptions.Pending,
      label: FilterOptions.Pending
    },
    {
      value: FilterOptions.Cancelled,
      label: FilterOptions.Cancelled
    },
    {
      value: FilterOptions.None,
      label: FilterOptions.None
    }
  ]
  const columns = useMemo<TableColumnsType<IOrderReturn>>(
    () => [
      {
        title: <h2 className='uppercase font-bold text-center'>ID</h2>,
        key: 'informations',
        dataIndex: 'informations',
        width: 140,
        render: (_, record) => (
          <Row gutter={8} className='w-full flex flex-col justify-between'>
            <Col span={24} className='pl-4'>
              <Tooltip
                className='!w-full'
                placement='bottomLeft'
                title={record.id}
                color='white'
                overlayStyle={{
                  maxWidth: '100%'
                }}
                overlayInnerStyle={{
                  color: 'black',
                  textWrap: 'nowrap'
                }}
                arrow={{
                  pointAtCenter: true
                }}
              >
                <h6 className='hover:cursor-pointer hover:underline hover:text-primary text-sm font-medium line-clamp-1 text-ellipsis'>
                  {record.id}
                </h6>
              </Tooltip>
            </Col>
          </Row>
        )
      },
      {
        title: <h2 className='uppercase font-bold text-center'>Sản phẩm</h2>,
        key: 'informations',
        dataIndex: 'informations',
        width: 340,
        render: (_, record) => (
          <Row gutter={8} className='w-full flex justify-center'>
            <Col span={orders.length > 4 ? 6 : 6}>
              <Image src={record.products[0]?.imgUrl} alt={record.products[0]?.name} />
            </Col>
            <Col span={orders.length > 4 ? 18 : 18} className='pl-4 flex flex-col justify-between'>
              <div>
                <h6 className='text-sm font-medium line-clamp-2 text-ellipsis'>{record.products[0]?.name}</h6>
                <div className='text-xs capitalize'>
                  {record.products[0]?.colorName} / {record.products[0]?.size}
                </div>
              </div>
              <div className='text-red-600 font-bold pb-2'>
                {(record.products[0]?.price * (1 - record.products[0]?.discount / 100)).toLocaleString('de-DE')}đ
              </div>
            </Col>
          </Row>
        )
      },
      {
        title: <h2 className='uppercase font-bold text-center'>Số sản phẩm</h2>,
        key: 'informations',
        dataIndex: 'informations',
        width: 100,

        render: (_, record) => (
          <Row gutter={8} className='w-full flex justify-center'>
            <Col span={24} className='text-sm font-medium line-clamp-1 text-center'>
              {record.products.reduce((total, product) => total + product.quantity, 0)}
            </Col>
          </Row>
        )
      },
      {
        title: <h2 className='uppercase font-bold text-center'>Tổng tiền</h2>,
        dataIndex: 'quantity',
        key: 'quantity',
        width: 120,
        render: (_, record) => (
          <div className='relative flex items-center justify-center text-red-600 font-bold'>
            {record.totalPrice.toLocaleString('de-DE')}đ
          </div>
        )
      },
      {
        title: <h2 className='uppercase font-bold !text-center flex'>Tình trạng</h2>,
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        width: 120,
        render: (_, record) => (
          <div
            className={` text-center font-semibold ${
              [OrderStatus.Delivered, OrderStatus.Confirmed, OrderStatus.Delivering].includes(record?.orderStatus)
                ? 'text-green-500'
                : record?.orderStatus === OrderStatus.Pending
                  ? 'text-slate-500'
                  : 'text-red-500'
            }`}
          >
            {getOrderStatusByEnum(record?.orderStatus)}
          </div>
        )
      },
      {
        title: <h2 className='uppercase font-bold text-center'>Ngày đặt hàng</h2>,
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        width: 140,
        render: (_, record) => (
          <div>
            <div className='text-center'>{ConvertTimeString(record.createdAt)}</div>
            <div className='text-center'>{ConvertDateString(record.createdAt)}</div>
          </div>
        )
      }
    ],
    [callOrderApiLoading]
  )
  const getSearchParams = (params: IOrderQuery) => {
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value))
    const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString()
    return `?${queryString}`
  }
  const fetchOrders = (params: IOrderQuery) => {
    callOrderApi(async () => {
      const { data } = await orderApi.getOrders(params)
      if (data) {
        setOrders(data?.orders || [])
        setPagination(data?.pagination || {})
        const search = getSearchParams(params)
        setSearchParam(search, { replace: true })
        setCurrentSearchParams(params)
        setFetchOrderCompleted(true)
      } else {
        message.error('Đã xảy ra lỗi khi lấy thông tin đơn hàng!')
      }
    })
  }
  const fetchOrderWithCurrentParams = () => {
    fetchOrders(currentSearchParams)
  }
  const onChangePage: PaginationProps['onChange'] = (page, size) => {
    if (page !== pagination.currentPage || size != pagination.limit) {
      if (inputKeyword !== currentSearchParams.keyword) {
        setInputKeyword(currentSearchParams.keyword || '')
      }
      fetchOrders({
        ...currentSearchParams,
        page,
        limit: size
      })
    }
  }
  const handleSearchOrder = () => {
    if (inputKeyword !== currentSearchParams.keyword) {
      setCurrentSearchParams({ ...currentSearchParams, keyword: inputKeyword })
      fetchOrders({
        ...currentSearchParams,
        page: 1,
        limit: pagination.limit || 5,
        keyword: inputKeyword ? inputKeyword : undefined
      })
    }
  }
  const handleChangeSortOption = (sortBy: SortOptions) => {
    setCurrentSearchParams({ ...currentSearchParams, sortBy: sortBy })
    fetchOrders({ ...currentSearchParams, sortBy })
  }
  const handleChangeFilterOption = (filter: FilterOptions) => {
    setCurrentSearchParams({ ...currentSearchParams, filter: filter })
    fetchOrders({ ...currentSearchParams, filter })
  }
  useEffect(() => {
    fetchOrderWithCurrentParams()
  }, [])
  return (
    <section className='px-2 xs:px-4'>
      <div className={`flex justify-start pb-4 ${windowSize.width < 720 && 'flex-col gap-2'}`}>
        <div className='text-2xl font-bold xs:text-2xl text-dark-blue flex-[5] text-left'>
          {windowSize.width > 640 ? 'Danh sách đơn hàng' : 'Đơn hàng'}
        </div>
        <div className='flex-[3] flex items-center gap-2'>
          <Input
            value={inputKeyword}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchOrder()
              }
            }}
            onChange={(e) => setInputKeyword(e.target.value)}
            placeholder='ID đơn hàng, tên sản phẩm...'
            className='rounded-md py-2 border-gray-500 hover:!border-dark-blue focus-within:!border-dark-blue focus:!border-dark-blue !drop-shadow-sm '
            suffix={
              <span onClick={handleSearchOrder} className='text-lg hover:cursor-pointer hover:text-dark-blue m-1'>
                {icons.search}
              </span>
            }
          />
        </div>
      </div>
      <div className='w-full gap-2 items-end flex justify-end mb-2'>
        <div className={`flex gap-1 ${windowSize.width < 400 && 'flex-col !items-start'}`}>
          <div className='gap-2 items-center flex'>
            <span className='font-semibold text-base w-11'>Filter: </span>
            <Select
              className='w-28 text-left'
              options={filterOptions}
              value={currentSearchParams.filter}
              onChange={(e) => handleChangeFilterOption(e)}
            />
          </div>
          <div className='gap-2 items-center flex'>
            <span className='font-semibold text-base w-11'>Sort: </span>
            <Select
              className='w-24'
              options={sortOptions}
              value={currentSearchParams.sortBy}
              onChange={(e) => handleChangeSortOption(e)}
            />
          </div>
        </div>
      </div>
      {fetchOrderCompleted ? (
        orders?.length > 0 ? (
          <div className='w-full border-[1px] border-gray-200 border-solid rounded-md'>
            <Table<IOrderReturn>
              loading={callOrderApiLoading}
              columns={columns}
              dataSource={orders}
              rowKey={(record) => record.id}
              scroll={{ y: orders.length > 4 ? 480 : undefined, x: 'max-content' }}
              pagination={false}
              rowClassName={'hover:cursor-pointer'}
              onRow={(record) => ({
                onClick: () => hanldeSelectOrder(record)
              })}
            />
          </div>
        ) : (
          !callOrderApiLoading && <div className='text-xl mt-10 text-red-500'>Bạn chưa có đơn hàng nào</div>
        )
      ) : (
        <Spin />
      )}

      {pagination && orders.length > 0 && (
        <div className='w-full flex justify-end py-3'>
          <Pagination
            defaultCurrent={pagination?.currentPage || 1}
            current={pagination?.currentPage || 1}
            onChange={onChangePage}
            total={pagination?.totalOrders}
            defaultPageSize={4}
            pageSize={pagination?.limit}
            pageSizeOptions={[4, 8, 10, 20]}
            showSizeChanger={true}
            showLessItems
          />
        </div>
      )}
      {selectedOrder && (
        <OrderDetailModal
          defaultData={selectedOrder}
          modalControl={viewOrderModalControl}
          fetchOrders={fetchOrderWithCurrentParams}
        />
      )}
    </section>
  )
}
