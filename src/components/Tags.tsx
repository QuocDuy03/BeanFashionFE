import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

type Tag = {
  name: string;
  link: string;
}

type TagsProps = {
  tags: Tag[];
};

export function Tags ({ tags } : TagsProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-md mb-5">
      <Title level={5} className="text-blue-cyan text-sm uppercase font-bold mb-2 border-b border-gray-200 pb-1">
        Tags
      </Title>
      <ul className="p-0 list-none flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <li key={index} className="inline-block">
            <Link
              to={tag.link}
              title={tag.name}
              className="text-gray-800 transition duration-300 ease-in-out px-2 py-1 border border-gray-200 m-1 rounded hover:bg-blue-cyan hover:border-blue-cyan hover:text-white"
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
