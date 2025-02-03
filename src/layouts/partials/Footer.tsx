import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'

import { Layout, Row, Col, Typography, Space, Skeleton } from 'antd'

import { contactInfo, footerInfo, socialMedias, sortStyle, convertStringDate } from '@/utils'

import { IGetBlogsParams, IBlog } from '@/interfaces';

import { blogApi } from "@/apis";

import { useApi } from "@/hooks";

const { Footer: AntFooter } = Layout
const { Title, Text } = Typography

export function Footer() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const { callApi: callGetBlogsApi } = useApi<void>();
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

  const getBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const params: IGetBlogsParams = {
        page: 1,
        limit: 3,
        sortStyle: sortStyle[3].key,
        authors: [],
        keyword: '',
        createDateRange: [],
      }
      await callGetBlogsApi(async () => {
        const response = await blogApi.getAll(params);
        setBlogs(response.data.data);
      });
      setLoadingBlogs(false);
    } catch (error) {
      console.error('Failed to fetch blogs: ', error);
    }
  }

  useEffect(() => {
    getBlogs();
  }, [])
  return (
    <AntFooter className='mt-auto bg-blue-cyan text-white pt-10'>
      <Row justify='space-around' className='m-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        <Col>
          <Title level={3} style={{ color: 'white' }}>
            THÔNG TIN CHUNG
          </Title>
          <Text className='text-white'>
            Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mạng lại giá trị tốt nhất
          </Text>
          {contactInfo.map((contactInfoItem) => (
            <div className='mt-2 text-white' key={contactInfoItem.title}>
              <strong>{contactInfoItem.title} </strong>
              <span>
                <Link to={contactInfoItem.to} className='text-yellow font-semibold hover:opacity-50 hover:text-yellow'>
                  {contactInfoItem.text}
                </Link>
              </span>
            </div>
          ))}

          <Space>
            {socialMedias.map((socialItem) => (
              <span className='text-2xl border-white px-1' key={socialItem.to}>
                <Link to={socialItem.to}>{socialItem.icon}</Link>
              </span>
            ))}
          </Space>
        </Col>

        <Col>
          <Title level={3} style={{ color: 'white' }}>
            BÀI VIẾT MỚI
          </Title>
          <div className='space-y-2'>
            {loadingBlogs || !blogs ? (
              <Space className='flex flex-col items-start space-y-4 overflow-hidden'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Space key={index}>
                    <Skeleton.Node active={true} style={{ width: 50, height: 50 }} />
                    <Skeleton
                      active
                      paragraph={{ rows: 1, width: 300 }}
                    />
                  </Space>
                ))}
              </Space>
            ) : (
              blogs.map((blog, index) => (
                <div key={blog.id} className='space-y-2'>
                  <Row gutter={8}>
                    <Link to={`/blogs/${blog.slug}`} className='flex items-center'>
                    <Col className='w-24 max-w-24 h-16 bg-gray-300 !p-0' >
                      <img
                        src={blog.coverImage}
                        alt='thumb'
                        className='w-24 max-w-24 h-16 object-contain'
                      />
                    </Col>
                    <Col className='ml-2'>
                      <Text className='text-white hover:text-yellow line-clamp-2 h-12 flex justify-center items-start'>
                        {blog.title}
                      </Text>
                      <Text className='text-gray-400'>{convertStringDate(blog.createdAt)}</Text>
                    </Col>
                    </Link>
                  </Row>
                  {index < blogs.length - 1 && (<hr />)}
                </div>
              ))
            )}
          </div>
        </Col>

        {footerInfo.map((infoItem) => (
          <Col key={infoItem.title}>
            <Title level={3} style={{ color: 'white' }}>
              {infoItem.title}
            </Title>
            <ul className='list-none p-0 space-y-2'>
              {infoItem.data.map((infoItemDetail) => (
                <li key={infoItemDetail.text}>
                  <Link to={infoItemDetail.to} className='hover:text-yellow'>
                    {infoItemDetail.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
      <br />
      <hr/>
      <div className='text-center pt-3'>
        <Text className='text-gray-400'>
        © Bản quyền thuộc về Mr. Bean | Cung cấp bởi Sapo
        </Text>
      </div>
    </AntFooter>
  )
}
