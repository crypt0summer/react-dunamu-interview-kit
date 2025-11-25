import { useEffect, useState, useCallback } from 'react';
import ProductDetail from '../interface/ProductDetail';

interface State {
  data: ProductDetail | null;
  loading: boolean;
  error: string | null;
}  

export function useProductDetail(id: number | string) {
    const [state, setState] = useState<State>({
        data: null,
        loading: false,
        error: null,
    })


    const execute = useCallback(()=>{
        if (!id || id === "") {
            setState({ data: null, loading: false, error: null });
            return;
        }

        let isCurrent = true;
        setState({ data: null, loading: true, error: null });


        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data: ProductDetail = await res.json();

                if (isCurrent) {
                setState({ data, loading: false, error: null });
                }

            } catch (err) {
                if (isCurrent) {
                    
                const message = err instanceof Error ? err.message : "상품을 불러오지 못했습니다.";

                setState({ data: null, loading: false, error: message });

                }
            }
        };

        fetchProduct();
        
        return () => {
            isCurrent = false;
        };

    }, [id])

    useEffect(()=>{
        const cleanup = execute();
        return cleanup;
    }, [execute])

    return{
        data: state.data,
        loading: state.loading,
        error: state.error
    }

}