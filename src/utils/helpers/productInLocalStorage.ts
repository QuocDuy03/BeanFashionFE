import { IProduct } from "@/interfaces";

export const getRecentlyViewed = (productId?: string): IProduct[] => {
    const products: IProduct[] = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (!productId) {
      return products;
    }
    return products.filter((product) => product.id !== productId);
  };

export const addProductToRecentlyViewed = (product: IProduct) => {
    const products = getRecentlyViewed();
    const existingIndex = products.findIndex((p:IProduct) => p.id === product.id);
  
    if (existingIndex !== -1) {
      products.splice(existingIndex, 1);
    }

    products.unshift(product);
  
    if (products.length > 5) {
      products.pop(); 
    }

    localStorage.setItem('recentlyViewed', JSON.stringify(products));
}