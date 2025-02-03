import React from 'react'

import { Button, Col, Modal, Row, Table, TableColumnsType } from 'antd'

import { IAddressReturn, IUseBoolean } from '@/interfaces'
import { icons } from '@/utils'

type SelectAddressModalProps = {
  modalControl: IUseBoolean
  addModalControl: IUseBoolean
  addressesList?: IAddressReturn[]
  selectedAddress?: IAddressReturn
  handleSelectAddress: (address: IAddressReturn) => void
}
export const SelectAddressModal: React.FC<SelectAddressModalProps> = ({
  modalControl,
  addModalControl,
  addressesList,
  selectedAddress,
  handleSelectAddress
}) => {
  const columns: TableColumnsType<IAddressReturn> = [
    {
      title: null,
      key: 'informations',
      dataIndex: 'informations',
      className: '!p-0',
      width: 320,
      render: (_, record) => (
        <div
          onClick={() => handleSelectAddress(record)}
          className={`hover:!bg-green-50 p-4 duration-500 hover:cursor-pointer ${selectedAddress?.id === record.id && 'bg-green-50'}`}
        >
          <Row gutter={8}>
            <Col span={24} className='pl-4 flex flex-col w-full'>
              <div
                className={`flex font-semibold gap-2  w-full text-sm ${selectedAddress?.id === record.id && 'text-red-600 !text-base'}`}
              >
                <div className='flex items-center gap-2'>
                  <span className={`text-red-500 text-lg ${selectedAddress?.id === record.id && 'text-xl'}`}>
                    {icons.filledLocation}
                  </span>
                  <span>{record.name}</span>
                </div>
                -<div className=''>{record.phoneNumber}</div>
              </div>
              <span className=' w-full'>{`${record?.addressDetail}, ${record?.ward}, ${record?.district}, ${record?.province}`}</span>
            </Col>
          </Row>
        </div>
      )
    }
  ]
  const handleAddAddress = () => {
    addModalControl.setTrue()
    modalControl.setFalse()
  }
  return (
    <Modal
      title={[
        <div key={'modal-title'} className='text-lg'>
          Chọn địa chỉ
        </div>
      ]}
      open={modalControl.value}
      onCancel={() => modalControl.setFalse()}
      width={500}
      footer={[]}
      className='mt-32'
    >
      <Table<IAddressReturn>
        columns={columns}
        dataSource={addressesList}
        scroll={
          columns.length > 0
            ? { y: addressesList && addressesList?.length > 3 ? 140 * 3 : undefined, x: 'fit-content' }
            : undefined
        }
        pagination={false}
        className='pb-2'
      />
      <div className='w-full flex justify-center'>
        <Button
          onClick={handleAddAddress}
          className=' text-lg font-semibold rounded-md bg-transparent hover:text-white hover:!bg-blue-500 hover:opacity-90  disabled:!text-white text-blue-500  border-blue-500 border-solid border-[1px] w-[40%] h-10 justify-self-center'
          type='primary'
          disabled={false}
        >
          Thêm địa chỉ
        </Button>
      </div>
    </Modal>
  )
}
