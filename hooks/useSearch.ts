import { useState, useEffect } from "react";

export interface Product {
    id: number,
    title: string,
    price: number,
    category: string,
    image: string
}

const useSearch = (products: Product[]) => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        const trimmedQuery = query.trim().toLocaleLowerCase();

        if (trimmedQuery === "") {
            setResults([]);
            return;
        }

        const filtered = products.filter((product) => {
            return product.title.toLocaleLowerCase().includes(trimmedQuery);
        });

        setResults(filtered);
    }, [query, products]);

    return {
        query,
        setQuery,
        results
    }
}

export default useSearch;