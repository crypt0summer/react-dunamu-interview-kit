export interface Rating{
    rate: number;
    count: number;
}

export default interface ProductDetail{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating 
}

//필요한 필드가 적을떼 Pick
//불필요한 필드가 적을때 Omit
export type ProductCardProps = Pick<ProductDetail, "id" | "title" | "price" | "image" | "rating">;