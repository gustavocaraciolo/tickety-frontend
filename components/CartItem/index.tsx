"use client";

import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";

type CartItemProps = {
    item: CartItemType;
    className?: string;
};

const CartItem = ({ item, className }: CartItemProps) => {
    const { updateQuantity, removeItem } = useCart();

    const formatPrice = (price: number) => {
        return `R$ ${price.toFixed(2)}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(item.id);
        } else {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className={`flex gap-4 p-4 border border-gray-100 rounded-xl ${className || ""}`}>
            {/* Event Image */}
            <div className="w-20 h-20 flex-shrink-0">
                <Image
                    src={item.eventImage}
                    alt={item.eventTitle}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
                <h3 className="text-body-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {item.eventTitle}
                </h3>
                <div className="flex items-center gap-4 text-body-sm text-gray-500 mb-2">
                    <span>{formatDate(item.eventDate)}</span>
                    <span>•</span>
                    <span className="line-clamp-1">{item.eventLocation}</span>
                </div>
                
                {/* Ticket Type */}
                <div className="mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-body-md font-medium text-gray-700">
                            {item.ticketType.name}
                        </span>
                        {item.ticketType.type === 'vip' && (
                            <span className="bg-primary-100 text-primary-600 text-body-sm font-medium px-2 py-1 rounded">
                                VIP
                            </span>
                        )}
                    </div>
                    <p className="text-body-sm text-gray-600 mt-1">
                        {item.ticketType.description}
                    </p>
                </div>

                {/* Benefits */}
                {item.ticketType.benefits.length > 0 && (
                    <div className="mb-3">
                        <ul className="flex flex-wrap gap-2">
                            {item.ticketType.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="text-body-sm text-gray-500">
                                    • {benefit}
                                </li>
                            ))}
                            {item.ticketType.benefits.length > 3 && (
                                <li className="text-body-sm text-gray-500">
                                    +{item.ticketType.benefits.length - 3} mais
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Quantity and Price */}
            <div className="flex flex-col items-end justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mb-2">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                        -
                    </button>
                    <span className="w-8 text-center font-medium text-body-md">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        disabled={item.quantity >= item.ticketType.available}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>

                {/* Price */}
                <div className="text-right">
                    <div className="text-body-lg font-semibold text-gray-900">
                        {formatPrice(item.subtotal)}
                    </div>
                    <div className="text-body-sm text-gray-500">
                        {formatPrice(item.ticketType.price)} cada
                    </div>
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 p-1 text-gray-400 hover:text-error-100 transition-colors"
                    title="Remover item"
                >
                    <Icon name="trash" className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
