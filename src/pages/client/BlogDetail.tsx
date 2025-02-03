import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spin, Avatar } from 'antd';

import { blogApi } from "@/apis";
import { IBlog } from "@/interfaces";
import { useApi } from "@/hooks";
import { icons, convertStringDate } from "@/utils";

export function BlogDetail() {
    const [blog, setBlog] = useState<IBlog | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const { callApi: callGetBlogApi } = useApi<void>();
    const [loadingBlog, setLoadingBlog] = useState<boolean>(false);

    const getBlog = async () => {
        setLoadingBlog(true);
        if (slug) {
            await callGetBlogApi(async () => {
                const res = await blogApi.getOne(slug);
                if (res.status === 200) {
                    setBlog(res.data);
                }
            });
        }
        setLoadingBlog(false);
    }

    useEffect(() => {
        getBlog();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full bg-white">
            <div className="flex flex-col items-center justify-start w-full max-w-1200 m-7 p-7 min-h-[50vh]">
                {loadingBlog ? (
                    <div className='flex justify-center items-center w-1200 min-h-[50vh]'>
                        <Spin size="large" />
                    </div>
                ) : (
                    blog ? (
                        <div className="flex flex-wrap md:flex-row gap-6 justify-between w-full">
                            <div className='w-full'>
                                <div className="w-full flex justify-between items-start text-left flex-col sm:flex-row">
                                    <div className="flex flex-col gap-2 justify-start items-start">
                                        <span className="font-semibold text-2xl text-primary">{blog.title}</span>
                                        <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-md py-1 px-2">
                                            <span className="text-xl text-primary">{icons.watch}</span>
                                            <span className="text-sm font-semibold">{convertStringDate(blog.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-w-fit items-center justify-start gap-1">
                                        <Avatar src={blog.author.avatar} icon={icons.faUser} size={65} className="object-cover" />
                                        <span className="text-gray-800 font-semibold">{blog.author.fullName}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start mt-2 text-left">{blog.description}</div>
                                <div className="flex justify-center my-7">
                                    <img src={blog.coverImage} alt="cover" className="w-full h-auto object-contain rounded-md" />
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: blog.content }} className="flex flex-col items-start mt-2 text-left"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center m-7 p-7 w-1200 min-h-[50vh]">
                            <span className="text-2xl font-bold text-gray-500">Không tìm thấy blog</span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}