import { useCopyToClipboard } from '@/hooks';
import { Button, List, message  } from 'antd';

import { icons } from '@/utils';
import { IVoucher } from '@/interfaces';

export function Vouchers() {
    const [, copy] = useCopyToClipboard();
    const handleCopy = (text : string) => async () => {
        const success = await copy(text);
        if (success) {
            message.success(`Copied: ${text}`);
        }
        else {
            message.error(`Failed to copy text: ${text}`)
        }
    }
    const vouchers :IVoucher[] = [
        {
            id:'abcd1',
            name: 'BFAS10',
            discount: 0.1,
            description: `Giảm 10 % cho đơn hàng từ 500k`,
            quantity: 10
        },
        {
            id:'abcd2',
            name: 'BFAS15',
            discount: 0.15,
            description: 'Giảm 15 % cho đơn hàng từ 1000k',
            quantity: 10
        },
        {
            id:'abcd3',
            name: '8BFAS08',
            discount: 0.08,
            description: 'Giảm 8 % cho đơn hàng từ 100k',
            quantity: 10
        },
    ]
    return (
        <div>
            <List
                size="small"
                className='border border-dashed border-blue-cyan rounded-md'
            >
                <div className='p-3 bg-gray-50 rounded-md'>
                    <div className='flex justify-center items-center gap-2 w-36 h-8 bg-white border border-blue-cyan rounded-md -mt-8'>
                        <span className='text-red-500 text-lg'>{icons.gift}</span>
                        <span className='uppercase font-bold'>Mã giảm giá</span>
                    </div>
                    {vouchers.map((voucher : IVoucher, index : number) => (
                        <List.Item key={voucher.id} className='bg-white px-0 mt-4 border border-gray-100 shadow-md'>
                            <div className='w-full px-0 flex flex-col justify-start items-start'>
                                <div className='flex w-full justify-between'>
                                    <div className='flex justify-start items-start gap-3'>
                                        <span className='rounded-full text-blue-cyan font-bold uppercase'>{voucher.discount * 100} off</span>
                                        {index === 0 &&(<span className='rounded-full px-3 py-1 bg-orange-100 text-xs text-orange-400'>Top Code</span>)}
                                    </div>
                                    <div className='flex justify-center items-center gap-1'>
                                        <span className='text-blue-cyan'>{voucher.discount * 100}%</span>
                                        <span className='text-2xl text-blue-cyan'>{icons.discount}</span>
                                    </div>
                                </div>
                                <p className='text-left'>{voucher.description}</p>
                                <div className='flex flex-row justify-between items-center w-full bg-gray-100 p-1 rounded-lg'>
                                    <span className='font-bold text-gray-500 text-md'>{voucher.name}</span>
                                    <Button onClick={handleCopy(voucher.name)} className='bg-blue-cyan text-white h-7'>Copy</Button>
                                </div>
                            </div>
                        </List.Item>
                    ))}
                </div>
            </List>
        </div>
    )
}