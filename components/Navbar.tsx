"use client";
import Link from "next/link";
import Image from "next/image";
import { Ellipsis, Search, ShoppingCart, User, List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import useSearch from "@/hooks/useSearch";
import { getProducts } from "@/services/api";

const constrols = [
    {
        icon: <User size={22} strokeWidth={2} />,
        text: "Perfil"
    },
    {
        icon: <Search size={22} strokeWidth={2} />,
        text: "Buscar"
    },
    {
        icon: <List size={22} strokeWidth={2} />,
        text: "Categorías"
    },
    {
        icon: <ShoppingCart size={22} strokeWidth={2} />,
        text: "Carrito"
    },
    {
        icon: <Ellipsis size={20} strokeWidth={2} className="text-black" />,
        text: "Menú"
    }
];


const Navbar = ({ searchSuggestions }: { searchSuggestions: boolean }) => {
    const [activeTab, setActiveTab] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [allProducts, setAllProducts] = useState([]);
    const { query, setQuery, results } = useSearch(allProducts);

    // Manejo del input de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLocaleLowerCase();
        setQuery(query);
    }

    // Manejo de los tabs
    const handleTabClick = (tabName: string) => {
        if (activeTab === tabName) {
            setActiveTab("");
        } else {
            setActiveTab(tabName);
        }
    }
    useEffect(() => {
        if (activeTab === "Buscar") {
            searchInputRef.current?.focus();
        }
    }, [activeTab]);

    // Obtener todos los productos
    useEffect(() => {
        getProducts().then(data => setAllProducts(data));
    }, []);

    return (

        <>
            <header className="fixed top-0 left-0 right-0 z-50 pt-6 w-full">

                <div className="flex items-center relative w-[95%] mx-auto">
                    <Link href="/" >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={100}
                            height={50}
                            priority
                            className="w-40 h-14"
                        />
                    </Link>
                    <input
                        ref={searchInputRef}
                        value={query}
                        onChange={handleSearchChange}
                        onFocus={() => {
                            setActiveTab("Buscar");
                        }}
                        type="text"
                        placeholder="Buscar"
                        className="w-full pl-2 pr-12 border py-2 border-gray-300 bg-white rounded-xl outline-none focus:ring-2 transition-all text-black"
                    />

                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Search size={22} strokeWidth={2} className="text-black" />
                    </button>
                </div>

                <SearchSuggestions
                    openSuggestions={activeTab === "Buscar"}
                    results={results}
                    query={query}
                />

            </header>
            <nav className="fixed bottom-6 z-50 flex items-center justify-evenly py-3 w-full">

                <div
                    className="flex items-center gap-2 bg-white w-[85%] mx-auto rounded-3xl pt-1 min-w-[300px]">

                    <div className="w-[95%] mx-auto flex items-end justify-evenly gap-2">

                        {constrols.map((control, index) => {

                            const isActive = activeTab === control.text;
                            return <button key={index}
                                className="flex flex-col items-center gap-1 relative py-1 transition-all duration-300"
                                onClick={() => handleTabClick(control.text)}
                            >
                                <div className={`${isActive ? 'text-brand scale-110' : 'text-black'
                                    } transition-all`}>
                                    {control.icon}
                                </div>
                                <p className={`${isActive ? 'text-brand' : 'text-black'
                                    } transition-all`}>
                                    {control.text}
                                </p>

                                {isActive && (
                                    <div className="absolute bottom-0 w-full h-0.5 bg-brand rounded-full animate-in fade-in zoom-in duration-300"></div>
                                )}
                            </button>
                        })}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;