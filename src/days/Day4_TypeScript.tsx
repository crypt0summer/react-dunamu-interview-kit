import { useState, useCallback } from "react" // 커스텀 훅 안에.
import { useProductDetail } from "@/hooks/useProductDetail";
import { ProductDetailCard } from "@/components/ProductDetailCard";

export default function Day4(){
    const [searchId, setSearchId] = useState('');

    const {data, loading, error} = useProductDetail(searchId);

    const handleSearch = useCallback ((e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchId(e.target.value);
        }, []);


    return(<div>
        <input
        type="number"
        placeholder="상품 id를 입력하세요"
        value={searchId}
        onChange={handleSearch}
        />
        
        {loading && <div>Loading…</div>}
        {error && <div>에러: {error}</div>}
        {data && <ProductDetailCard {...data} />}

    </div>)
}