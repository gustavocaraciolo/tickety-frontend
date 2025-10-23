"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import { useCart } from "@/contexts/CartContext";

const PublicHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/logo.svg"
                            alt="Tickety"
                            width={120}
                            height={40}
                            className="h-8"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/shop/events" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Eventos
                        </Link>
                        <Link 
                            href="/shop/categories" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Categorias
                        </Link>
                        <Link 
                            href="/shop/about" 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Sobre
                        </Link>
                    </nav>

                    {/* Search and Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="hidden lg:block">
                            <Search
                                className="w-64"
                                placeholder="Buscar eventos..."
                                value=""
                                onChange={() => {}}
                            />
                        </div>

                        {/* Cart */}
                        <Link href="/shop/cart" className="relative group">
                            <div className="relative p-2 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200 hover:border-primary-300">
                                <Image
                                    src="/images/icons/cart-icon.png"
                                    alt="Carrinho"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-cover group-hover:opacity-80 transition-opacity"
                                />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Icon name="menu" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link 
                                href="/shop/events" 
                                className="text-gray-600 hover:text-gray-900 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Eventos
                            </Link>
                            <Link 
                                href="/shop/categories" 
                                className="text-gray-600 hover:text-gray-900 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Categorias
                            </Link>
                            <Link 
                                href="/shop/about" 
                                className="text-gray-600 hover:text-gray-900 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default PublicHeader;
