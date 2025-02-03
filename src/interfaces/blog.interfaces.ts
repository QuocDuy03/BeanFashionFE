export interface IHotNews {
    title: string;
    link: string;
    date: string;
    image: string;
}

export interface INewsCardProps {
    blog: IBlog;
}

export interface IAuthor {
    id: string;
    fullName: string;
    avatar: string;
}

export interface IBlog {
    id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    coverImage: string;
    author: IAuthor;
    createdAt: string;
}

export interface ISortStyle { 
    label: string, 
    key: string 
};

export interface IGetBlogsParams {
    page: number, 
    limit: number, 
    sortStyle: string, 
    authors: string[], 
    keyword: string | undefined, 
    createDateRange: Date[]
}