"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import LocationFilter from "@/components/LocationFilter";
import { useCart } from "@/contexts/CartContext";
import { AuthButtons } from "@/components/PublicAuth";

const PublicHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-1">
                        <Image
                            src="/images/logo.svg"
                            alt="Tickety"
                            width={80}
                            height={40}
                            className="h-10"
                        />
                        <span className="text-2xl font-bold text-gray-900">Tickety</span>
                    </Link>

                    {/* Location Filter */}
                    <button 
                        onClick={() => setIsLocationFilterOpen(true)}
                        className="hidden md:flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-full hover:shadow-md transition-all duration-200 hover:bg-gray-50"
                    >
                        <Image
                            src="/images/icons/Target.png"
                            alt="Localização"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover"
                        />
                        <span className="text-gray-900 font-bold text-sm">Onde?</span>
                    </button>

                    {/* Auth & Cart */}
                    <div className="flex items-center gap-3">
                        {/* Cart - Separado e destacado */}
                        <Link 
                            href="/cart" 
                            className="relative group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all duration-200 border border-gray-200 hover:border-primary-300 hover:shadow-sm"
                        >
                            <div className="relative">
                                <Image
                                    src="/images/icons/Activities Blueprint/Shopping and Retail _ discount tag, price tag, sale, shopping, Vector illustration.png"
                                    alt="Carrinho"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-cover group-hover:opacity-80 transition-opacity"
                                />
                            </div>
                            {/* Label no desktop */}
                            <span className="hidden lg:block text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                                Carrinho
                            </span>
                            {totalItems > 0 && (
                                <span className="hidden lg:block text-xs text-gray-500">
                                    ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                                </span>
                            )}
                        </Link>

                        {/* Divisor visual */}
                        <div className="h-6 w-px bg-gray-200"></div>

                        {/* Auth Buttons - Menu de perfil */}
                        <AuthButtons />

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menu"
                        >
                            <Icon name="burger" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">
                        <button 
                            onClick={() => setIsLocationFilterOpen(true)}
                            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-full hover:shadow-md transition-all duration-200 hover:bg-gray-50"
                        >
                            <Image
                                src="/images/icons/Target.png"
                                alt="Localização"
                                width={32}
                                height={32}
                                className="w-8 h-8 object-cover"
                            />
                            <span className="text-gray-900 font-bold text-sm">Onde?</span>
                        </button>
                    </div>
                )}
            </div>
            
            {/* Location Filter Modal */}
            <LocationFilter 
                isOpen={isLocationFilterOpen} 
                onClose={() => setIsLocationFilterOpen(false)} 
            />
        </header>
    );
};

export default PublicHeader;
