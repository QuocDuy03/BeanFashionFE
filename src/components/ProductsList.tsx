import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import { IProduct } from "@/interfaces"
import { icons } from '@/utils';

const { Title } = Typography;

type ProductsListProps = {
    title: 'maylike' | 'viewed',
    products: Array<IProduct>
};

export function ProductsList({ title, products }: ProductsListProps) {
    return (
        <div className="w-full rounded-lg border border-gray-200 p-4 shadow-md mb-5">
            <Title level={5} className="text-base uppercase font-bold mb-2 border-b border-gray-200 pb-1">
                <span className='text-blue-cyan'>{title === 'maylike' ? 'Có thể bạn thích' : 'Sản phẩm vừa xem'}</span>
            </Title>
            <div>
                {products.map((product) => (
                    <div key={product.id} className="flex mb-3 border-b border-dashed border-gray-200 pb-2">
                        <div className="w-14 h-20 mr-3 object-scale-down">
                            <Link to={'/product/detail/' + product.slug} title={product.name} className="block">
                                <img
                                    src={product.productDetails[0].imgUrl}
                                    alt={product.name}
                                    className="w-full h-full"
                                />
                            </Link>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-left text-sm font-medium mb-1">
                                <Link to={'/product/detail/' + product.slug} title={product.name} className="text-left line-clamp-2 text-gray-600 hover:text-primary">
                                    {product.name}
                                </Link>
                            </h3>
                            <div className='flex flex-row flex-wrap gap-2 justify-start items-center'>
                                <span className="text-sm text-left text-red-500 mb-0">
                                    {(product?.price - (product?.price * product?.discount) / 100).toLocaleString("de-DE")}₫
                                </span>
                                <span className="text-xs text-left line-through text-gray-400 mb-0">
                                    {product?.price.toLocaleString("de-DE")}₫
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {title === 'maylike' && (
                <Link to={`/products?page=1&categoryGender=${products[0].category.gender}`} title={title} className="">
                    <span className='text-blue-cyan flex justify-center items-center italic'>Xem thêm {icons.rightChevon}</span>
                </Link>
            )}
        </div>
    )
}