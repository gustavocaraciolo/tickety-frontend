"use client";

import { CartItem } from "@/types/cart";
import Button from "@/components/Button";
import Link from "next/link";

type OrderSummaryProps = {
    items: CartItem[];
    subtotal: number;
    fees: number;
    total: number;
    className?: string;
    showCheckoutButton?: boolean;
};

const OrderSummary = ({ 
    items, 
    subtotal, 
    fees, 
    total, 
    className,
    showCheckoutButton = true 
}: OrderSummaryProps) => {
    const formatPrice = (price: number) => {
        return `R$ ${price.toFixed(2)}`;
    };

    const getTotalItems = () => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <div className={`bg-white border border-gray-100 rounded-2xl p-6 ${className || ""}`}>
            <h3 className="text-body-xl font-semibold text-gray-900 mb-6">
                Resumo do Pedido
            </h3>

            {/* Items List */}
            <div className="space-y-3 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                            <div className="text-body-sm font-medium text-gray-700 line-clamp-1">
                                {item.eventTitle}
                            </div>
                            <div className="text-body-sm text-gray-500">
                                {item.ticketType.name} x{item.quantity}
                            </div>
                        </div>
                        <div className="text-body-sm font-medium text-gray-900">
                            {formatPrice(item.subtotal)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="text-body-md text-gray-600">
                        Subtotal ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''})
                    </span>
                    <span className="text-body-md font-medium text-gray-900">
                        {formatPrice(subtotal)}
                    </span>
                </div>
                
                {fees > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-body-md text-gray-600">
                            Taxas e impostos
                        </span>
                        <span className="text-body-md font-medium text-gray-900">
                            {formatPrice(fees)}
                        </span>
                    </div>
                )}
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-body-lg font-semibold text-gray-900">
                        Total
                    </span>
                    <span className="text-body-lg font-semibold text-gray-900">
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            {/* Checkout Button */}
            {showCheckoutButton && items.length > 0 && (
                <Link href="/shop/checkout">
                    <Button 
                        className="w-full" 
                        isPrimary 
                        isLarge
                    >
                        Finalizar Compra
                    </Button>
                </Link>
            )}

            {/* Security Info */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-body-sm text-gray-500">
                    <div className="w-4 h-4 bg-success-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                    </div>
                    <span>Compra 100% segura</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
