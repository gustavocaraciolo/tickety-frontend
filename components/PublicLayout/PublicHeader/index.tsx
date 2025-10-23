"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import LocationFilter from "@/components/LocationFilter";
import { useCart } from "@/contexts/CartContext";

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
                        className="hidden md:flex items-center space-x-3 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition-all duration-200 hover:border-gray-400"
                    >
                        <Image
                            src="/images/icons/location.png"
                            alt="Localização"
                            width={20}
                            height={20}
                            className="w-5 h-5 object-cover"
                        />
                        <span className="text-gray-900 font-bold text-lg">Onde?</span>
                    </button>

                    {/* Cart */}
                    <div className="flex items-center space-x-4">

                        {/* Cart */}
                        <Link href="/shop/cart" className="relative group">
                            <div className="relative p-2 hover:bg-primary-50 rounded-lg transition-colors border border-gray-200 hover:border-primary-300">
                                <Image
                                    src="/images/icons/Activities Blueprint/Shopping and Retail _ discount tag, price tag, sale, shopping, Vector illustration.png"
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
                        <button 
                            onClick={() => setIsLocationFilterOpen(true)}
                            className="flex items-center space-x-3 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition-all duration-200 hover:border-gray-400"
                        >
                            <Image
                                src="/images/icons/location.png"
                                alt="Localização"
                                width={20}
                                height={20}
                                className="w-5 h-5 object-cover"
                            />
                            <span className="text-gray-900 font-bold text-lg">Onde?</span>
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
