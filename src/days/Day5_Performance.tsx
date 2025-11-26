import React, { useCallback, useState, useEffect, useMemo } from "react"
import ProductDetail from "@/interface/ProductDetail";

export default function  Day5(){
    const [data, setData] = useState<ProductDetail[]>([]);
    const [ search, setSearch ] = useState('');
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const jsonData: ProductDetail[] = await res.json();
            setData(jsonData);
        };
        fetchData();
    }, []);

    const visibleData = useMemo(() => {
        const term = search.trim().toLowerCase();

        const filtered = data.filter((product) =>
            product.title.toLowerCase().includes(term)
        );

        return filtered.sort((a, b) =>
            order === "asc" ? a.price - b.price : b.price - a.price
        );
    }, [data, order, search]);



    const handleSearch = useCallback ((e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }, []);

    const ProductItem = React.memo(function ProductItem({ product }: { product: ProductDetail }) {
        return (
            <div>
            <img src={product.image} />
            <div>상품: {product.title}</div>
            <div>가격: ${product.price}</div>
            </div>
        );
    });

    const handleOrderAsc = useCallback(() => setOrder("asc"), []);
    const handleOrderDesc = useCallback(() => setOrder("desc"), []);
   
    return(<div>
        <input 
            type = "text"
            placeholder= "검색어 입력"
            value= {search}
            onChange={handleSearch}
        />

        <button onClick={handleOrderAsc}> 오름차순 </button>
        <button onClick={handleOrderDesc}> 내림차순 </button>

        {visibleData.length===0 ?(<div>상품이 없습니다</div>):
        (
            visibleData?.map((product)=>(
                <ProductItem key={product.id} product={product} />
            ))
        )}

    </div>)
}