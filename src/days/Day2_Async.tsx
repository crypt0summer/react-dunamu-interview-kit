import React, { useEffect, useState, useReducer, useMemo, useCallback } from 'react';
// 타입 정의 (fake store api, 사용하는 필드만 선언)
import Product from '../interface/Product';
// 상태 타입
// Tagged union vs Flag
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Product[] }
  | { status: 'error'; error: string };

  // 액션 타입
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_ERROR'; error: string };

// reducer
function productsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload };
    case 'FETCH_ERROR':
      return { status: 'error', error: action.error };
    default:
      return state;
  }
}


export default function Day2() {
    const [state, dispatch] = useReducer(productsReducer, {status: 'loading'}); // 초기 렌더 시 바로 API를 호출하기 때문
    const [searchTerm, setSearchTerm] = useState('');// 검색어

    useEffect(() => {
        /**
         * 시간 제한이 있는 경우 
         * happy path (가장 단순하고 정상적인 경우)가정,
         * 에러, 타임아웃, 언마운트 시 race condition 같은 건 일단 무시
         * -> AbortController() 생략
         */
        // const controller = new AbortController(); //네트워크 중단
        let isCurrent = true; // FETCH_START 대응용 (언마운트시 stale response 방어)

        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products", {
                    // signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("서버 응답 에러");
                }

                const data: Product[] = await response.json();            

                if (isCurrent) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data });
                }
            }catch (err: any) {
                if (err.name === 'AbortError') { //사용자가 의도적으로 요청을 취소한 경우
                    // 아예 아무것도 안 함 -> 이전 상태 그대로 유지
                    return;
                }
                
                if (isCurrent) {
                    dispatch({ type: 'FETCH_ERROR', error: err.message });
                }
            }
        }

        fetchProducts();

        return () => {
            isCurrent = false;  // 언마운트 시 이 요청은 "과거 요청" 으로 처리됨
            // controller.abort();
        };

    }, []);

    // success일 때만 data 추출 -> 안정적인 참조 보장 (useMemo로 최적화)
    const resData = state.status === 'success' ? state.data : null;

    const visibleProducts = useMemo<Product[]>(() => {
        if(!resData) return [];
        if(!searchTerm) return resData;

        const lowerTerm = searchTerm.toLowerCase();
        return resData.filter(product =>
            product.title.toLowerCase().includes(lowerTerm)
        );

    }, [resData, searchTerm])

    const handleSearch = useCallback ((e: React.ChangeEvent<HTMLInputElement>) => { // 필요하면 자식 분리할 수 있음
        setSearchTerm(e.target.value);
    }, []);

    // early return 
    if (state.status === 'loading') {
        return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            <p className="text-2xl text-gray-600">Loading...</p>
        </div>
        );
    }

    if (state.status === 'error') {
        return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            <p className="text-2xl text-red-600">Error occurred: {state.error}</p>
        </div>
        );
    }

    return (
        <div>
            <input
                type="text"
                placeholder="상품명을 검색하세요..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {visibleProducts.length === 0 ? (
                    <p>{searchTerm ? '검색 결과가 없습니다.' : '상품이 없습니다.'}</p>
                ) : (visibleProducts.map((product)=>(
                    <div key={product.id}>
                        <div>상품: {product.title}</div>
                        <div>가격: ${product.price}</div>
                    </div>
                ))
            )}
        </div>
    )
}