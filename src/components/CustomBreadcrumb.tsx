import { Breadcrumb } from "antd";

type BreadcrumbItem = {
    title: React.ReactNode;
};

type CustomBreadcrumbProps = {
    items: BreadcrumbItem[];
};

export const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
    items,
}) => {
    return (
        <div className="bg-gray-100">
            <Breadcrumb
                items={items}
                className="w-1200 mx-auto py-3"
            />
        </div>
    );
};
