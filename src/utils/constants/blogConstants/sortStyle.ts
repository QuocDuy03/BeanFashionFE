import { ISortStyle } from "@/interfaces";

export const sortStyle: ISortStyle[] = [
    { label: 'Mặc định', key: 'DEFAULT' },
    { label: 'A -> Z', key: 'NAME_ASC' },
    { label: 'Z -> A', key: 'NAME_DESC' },
    { label: 'Mới nhất', key: 'DATE_DESC' },
    { label: 'Cũ nhất', key: 'DATE_ASC' }
];
