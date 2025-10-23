"use client";

import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import Button from "@/components/Button";
import Link from "next/link";

const CartPage = () => {
    const { items, totalPrice, clearCart } = useCart();

    const fees = totalPrice * 0.1; // 10% fee
    const total = totalPrice + fees;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <div className="w-12 h-12 bg-gray-400 rounded"></div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Seu carrinho está vazio
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Que tal explorar nossos eventos e encontrar algo incrível para você?
                    </p>
                    <Link href="/shop/events">
                        <Button isPrimary isLarge>
                            Explorar Eventos
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Carrinho de Compras
                    </h1>
                    <p className="text-body-lg text-gray-600">
                        Revise seus ingressos antes de finalizar a compra
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-body-xl font-semibold text-gray-900">
                                    Seus Ingressos ({items.length} item{items.length !== 1 ? 's' : ''})
                                </h2>
                                <button
                                    onClick={clearCart}
                                    className="text-body-sm text-error-100 hover:text-error-200 transition-colors"
                                >
                                    Limpar carrinho
                                </button>
                            </div>

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                        <Link href="/shop/events">
                            <Button isSecondary isLarge className="w-full">
                                Continuar Comprando
                            </Button>
                        </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            items={items}
                            subtotal={totalPrice}
                            fees={fees}
                            total={total}
                            showCheckoutButton={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
