import { IGetBlogsParams } from "@/interfaces";
import { instance as axiosClient } from "@/configs";
import moment from 'moment';

export const blogApi = {
    getAll: async (params : IGetBlogsParams) => {
        const formattedParams = {
            ...params,
            createDateRange: params.createDateRange.map(date => moment(date).format('YYYY-MM-DD'))
        };
        return axiosClient.get('/blogs', { params: formattedParams });
    },
    getAuthors: async () => {
        return axiosClient.get('/blogs/authors');
    },
    getOne: async (slug : string) => {
        return axiosClient.get(`/blogs/${slug}`);
    },
}