import { Product } from "@/hooks/useSearch";

interface Props {
    openSuggestions: boolean;
    results: Product[];
    query: string;
}

const SearchSuggestions = ({ openSuggestions, results, query }: Props) => {


    return (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-3xl py-1 bg-white rounded-b-2xl transition-all duration-500 ease-out z-40 max-h-96 overflow-y-auto scrollbar-hide
        ${openSuggestions ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}>
            <div className="w-[95%] mx-auto">
                {
                    query.length > 0 ? (
                        results.length > 0 ? (
                            results.map((product, index) => (
                                <div key={product.id || `product-${index}`}>
                                    <p>{product.title}</p>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron resultados</p>
                        )
                    ) : (
                        <p>Busca</p>
                    )
                }
            </div>
        </div >
    );

}

export default SearchSuggestions;