import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-evenly py-3 w-[90%] mx-auto gap-2">
            <Link href="/" >
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={80}
                    height={50}
                    priority
                    className="w-28 h-12"
                />
            </Link>

            <div className="flex items-center relative w-[60%] ">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full pl-2 pr-12 border py-2 border-gray-300 bg-white rounded-xl outline-none focus:ring-2 transition-all text-black" />

                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Search size={22} strokeWidth={2} className="text-black" />
                </button>
            </div>

            <div className="flex items-center gap-2">

                <Link href="/cart">
                    <button>
                        <ShoppingCart size={22} strokeWidth={2} className="text-white" />
                    </button>
                </Link>

                <button>
                    <Menu size={20} strokeWidth={2} className="text-white" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar;