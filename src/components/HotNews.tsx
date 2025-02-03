import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import news_Img from '@/assets/images/news_Img.webp'
import { IHotNews } from '@/interfaces';

const { Title, Paragraph } = Typography;

type HotNewsProps = {
  newsItems: IHotNews[];
};

export function HotNews ({ newsItems } : HotNewsProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-md mb-5">
      <Title level={5} className="text-base uppercase font-bold mb-2 border-b border-gray-200 pb-1">
        <Link to="/blogs" title="Tin tức nổi bật" className="">
          <span className='text-blue-cyan hover:text-primary'>Tin tức nổi bật</span>
        </Link>
      </Title>
      <div>
        {newsItems.map((item, index) => (
          <div key={index} className="flex mb-3 border-b border-dashed border-gray-200 pb-2">
            <div className="w-24 mr-3">
              <Link to={item.link} title={item.title} className="block">
                <img
                  src={news_Img} // Để tạm, nào call api sửa sau
                  alt={item.title}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </div>
            <div className="flex-1">
              <h3 className="text-left text-sm font-medium mb-1">
                <Link to={item.link} title={item.title} className="text-left line-clamp-2 text-blue-cyan hover:text-primary">
                  {item.title}
                </Link>
              </h3>
              <Paragraph className="text-xs text-left italic text-gray-600 mb-0">{item.date}</Paragraph>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
