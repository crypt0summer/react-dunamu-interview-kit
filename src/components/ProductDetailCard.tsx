import { ProductCardProps } from "../interface/ProductDetail";

export function ProductDetailCard({ title, price, image, rating }: ProductCardProps) {
  return (
    <div>
      <img src={image} alt={title} />
      <h2>상품명: {title}</h2>
      <p>가격: {price}</p>
      <p> {rating.rate} / ( {rating.count} )</p>
    </div>
  );
}