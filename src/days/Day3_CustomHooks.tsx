import { useAsync } from "@/hooks/useAsync";
import Product from '../interface/Product';

export default function Day3(){

    const { data, loading, error, refetch } = useAsync<Product[]>(
        () => fetch("https://fakestoreapi.com/products").then(res => res.json()),
        []
    );

    if(loading){
        return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            <p className="text-2xl text-gray-600">Loading...</p>
        </div>
        );
    }

    if(error){
        return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            <p className="text-2xl text-red-600">Error occurred: {error.name}</p>
        </div>
        );
    }


    return(
    <div>
        <button onClick={refetch}>다시 불러오기</button>
        {data?.length === 0 ? (
                    <p>{ '상품이 없습니다.'}</p>
                ) : (
                    data?.map((product)=>(
                            <div key={product.id}>
                                <div>상품: {product.title}</div>
                                <div>가격: ${product.price}</div>
                            </div>
                    )))}
    </div>)
}