import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from "react-router-dom";

import { Typography, Pagination, DatePicker, Input, Spin, Checkbox, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import type { CheckboxProps } from 'antd';

import { NewsCard } from '@/components';
import { IBlog, IAuthor, IGetBlogsParams } from '@/interfaces';
import { blogApi } from "@/apis";
import { useApi } from "@/hooks";
import { sortStyle, icons, initFilters } from '@/utils';

const { Title } = Typography;

export function Blog() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [createDateRange, setCreateDateRange] = useState<Date[]>();
  const [allAuthors, setAllAuthors] = useState<IAuthor[]>([]);
  const [choosedAuthors, setChoosedAuthors] = useState<string[]>([]);
  const [selectedSortStyle, setSelectedSortStyle] = useState<ItemType>(sortStyle[0]);
  const { callApi: callGetBlogsApi } = useApi<void>();
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);
  const [loadingAuthors, setLoadingAuthors] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterKey: string, value: string, isMultiFilter: boolean) => {
    const currentValues = searchParams.get(filterKey)?.split(',') || [];
    if (!isMultiFilter) {
      searchParams.set(filterKey, value);
      !searchParams.get(filterKey) && searchParams.delete(filterKey);
    }
    else if (currentValues.includes(value)) {
      currentValues.splice(currentValues.indexOf(value), 1);
      currentValues.length === 0 ?
        searchParams.delete(filterKey)
        :
        searchParams.set(filterKey, currentValues.join(','));
    }
    else {
      currentValues.push(value);
      searchParams.set(filterKey, currentValues.join(','));
    }
  }

  const getBlogs = async (page: number, limit: number) => {
    try {
      setLoadingBlogs(true);
      const params: IGetBlogsParams = {
        page: Number(searchParams.get(initFilters.page.name)) || page,
        limit: limit,
        sortStyle: searchParams.get(initFilters.sortStyle.name) || '',
        authors: searchParams.get(initFilters.authors.name)?.split(',') || [],
        keyword: searchParams.get(initFilters.search.name) || '',
        createDateRange: searchParams.get(initFilters.createDateRange.name)?.split(',').map(date => new Date(date)) || [],
      }
      setCurrent(params.page);
      setLimit(params.limit);
      setSelectedSortStyle(sortStyle.find(style => style?.key === params.sortStyle) || sortStyle[0]);
      setChoosedAuthors(params.authors);
      setCreateDateRange(params.createDateRange);
      setSearch(params.keyword || '');
      await callGetBlogsApi(async () => {
        const response = await blogApi.getAll(params);
        setBlogs(response.data.data);
        setTotalRecords(response.data.total);
      });
      setLoadingBlogs(false);
    } catch (error) {
      setLoadingBlogs(false);
      setBlogs([]);
      setTotalRecords(0);
      console.error('Failed to fetch blogs: ', error);
    }
  }

  const getAuthors = async () => {
    try {
      setLoadingAuthors(true);
      await callGetBlogsApi(async () => {
        const response = await blogApi.getAuthors();
        setAllAuthors(response.data);
      });
      setLoadingAuthors(false);
    }
    catch (error) {
      setLoadingAuthors(false);
      console.error('Failed to fetch authors: ', error);
    }
  }

  const handleChangeSortStyle = (event: ItemType) => {
    if (event?.key) {
      handleFilterChange(initFilters.sortStyle.name, event.key.toString(), initFilters.sortStyle.isMultiFilter);
      setSearchParams(searchParams);
    }
  }

  const onChoosedAuthorsChange: CheckboxProps['onChange'] = (event) => {
    const choosedAuthorsTemp = [...choosedAuthors];
    if (event.target.checked) {
      choosedAuthorsTemp.push(event.target.value);
    }
    else {
      choosedAuthorsTemp.splice(choosedAuthorsTemp.indexOf(event.target.value), 1);
    }
    setChoosedAuthors(choosedAuthorsTemp);
    handleFilterChange(initFilters.page.name, '1', initFilters.page.isMultiFilter);
    handleFilterChange(initFilters.authors.name, event.target.value, initFilters.authors.isMultiFilter);
    setSearchParams(searchParams);
  }

  const handleChangeCreateDateRange = (dates: [Dayjs, Dayjs] | null) => {
    handleFilterChange(initFilters.page.name, '1', initFilters.page.isMultiFilter);
    const createDateRangeTemp: Date[] = dates && dates.length > 0
      ? [
        (dates[0] || new Date()).toDate(),
        (dates[1] || new Date()).toDate()
      ]
      : [];
    handleFilterChange(initFilters.createDateRange.name, createDateRangeTemp.join(','), initFilters.createDateRange.isMultiFilter);
    setSearchParams(searchParams);
  }

  const handlePageChange = (page: number) => {
    handleFilterChange(initFilters.page.name, page.toString(), initFilters.page.isMultiFilter);
    setSearchParams(searchParams);
  }

  const handleSearch = (value: string) => {
    handleFilterChange(initFilters.page.name, '1', initFilters.page.isMultiFilter);
    handleFilterChange(initFilters.search.name, value, initFilters.search.isMultiFilter);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getBlogs(1, limit);
  }, [searchParams])

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-between w-full max-w-1200 px-4 mt-5 mb-5">
        <div className="flex-1 flex flex-col gap-5">
          <div className='flex items-center'>
            <div className='w-full p-4 bg-gray-100 text-blue-cyan rounded border'>
              <Input.Search
                placeholder='Tìm kiếm blog'
                className='rounded-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={handleSearch}
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 sm:flex-row lg:flex-col'>
            <div className='w-full p-4 bg-gray-100 text-blue-cyan rounded border'>
              <div className="flex flex-col justify-center items-start gap-2">
                <span className='font-bold uppercase'>Ngày tạo</span>
                <div className='flex justify-center items-center gap-1 w-full'>
                  <DatePicker.RangePicker
                    value={createDateRange && createDateRange.length>0 ? [dayjs(createDateRange[0]), dayjs(createDateRange[1])] : undefined}
                    placeholder={['Từ', 'Đến']}
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                    onChange={(date) => {
                      handleChangeCreateDateRange(date as [Dayjs, Dayjs]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='w-full p-4 bg-gray-100 text-blue-cyan rounded border'>
              <div className="flex flex-col justify-center items-start gap-2">
                <span className='font-bold uppercase'>Tác giả</span>
                {loadingAuthors ? (
                  <div className='flex justify-center items-center w-full'>
                    <Spin size="large" />
                  </div>
                ) : (
                  allAuthors.map((author) => (
                    <div key={author.id} className='flex items-center gap-2'>
                      <Checkbox
                        value={author.id}
                        checked={choosedAuthors.includes(author.id)}
                        onChange={onChoosedAuthorsChange}
                        className={`hover:text-primary ${choosedAuthors.includes(author.id)? 'text-primary' : 'text-blue-cyan'} transition duration-300 ease-in-out`}
                      >
                        {author.fullName}
                      </Checkbox>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[3]">
          <Title level={4} className="flex justify-start items-center text-left uppercase font-bold bg-gray-100 border rounded pl-2 py-2 shadow-sm mb-5 h-16">
            <span className='text-blue-cyan'>Tin tức</span>
          </Title>
          <div className="w-full flex justify-end items-center gap-1 my-3">
            <span className="text-blue-cyan flex items-center gap-1">{icons.sort}Sắp xếp:</span>
            <Dropdown
              trigger={['hover']}
              menu={{
                items: sortStyle,
                selectable: true,
                defaultSelectedKeys: ['3'],
                onClick: (e) => { handleChangeSortStyle(e) }
              }}
              className="w-max text-primary text-sm border-none bg-gray-100 rounded-none px-3 py-1"
            >
              <span className="text-lg">{
                sortStyle.find(style => style.key === selectedSortStyle?.key?.toString())?.label
              }</span>
            </Dropdown>
          </div>
          {loadingBlogs ? (
            <div className='flex justify-center items-center w-full min-h-[65vh]'>
              <Spin size="large" />
            </div>
          ) : (
            <div className='flex flex-col gap-5 justify-between items-center'>
              {
                blogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[65vh] w-full">
                    <div className='flex flex-col items-center justify-center w-full bg-gray-50 m-7 p-4 min-h-[65vh]'>
                      <span className="text-2xl font-bold text-gray-500">Không tìm thấy blog</span>
                    </div>
                  </div>
                ) :
                  <div className='flex flex-col gap-5 justify-between items-center'>
                    <div className="text-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[65vh]">
                      {blogs.map((blog) => (
                        <NewsCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                    <Pagination
                      align="center"
                      current={current}
                      total={totalRecords}
                      pageSize={limit}
                      onChange={handlePageChange}
                      hideOnSinglePage={true}
                    />
                  </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
