"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { TicketType } from "@/types/event";
import { useCart } from "@/contexts/CartContext";

type TicketSelectorProps = {
    eventId: string;
    eventTitle: string;
    eventImage: string;
    eventDate: string;
    eventLocation: string;
    tickets: TicketType[];
    className?: string;
};

const TicketSelector = ({ 
    eventId, 
    eventTitle, 
    eventImage, 
    eventDate, 
    eventLocation, 
    tickets, 
    className 
}: TicketSelectorProps) => {
    const { addItem, getItemQuantity } = useCart();
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

    const handleQuantityChange = (ticketId: string, quantity: number) => {
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        // Validar quantidade máxima disponível
        const maxAvailable = ticket.available || 0;
        const newQuantity = Math.max(0, Math.min(quantity, maxAvailable));
        
        setSelectedTickets(prev => ({
            ...prev,
            [ticketId]: newQuantity
        }));
    };

    const handleAddToCart = () => {
        Object.entries(selectedTickets).forEach(([ticketId, quantity]) => {
            if (quantity > 0) {
                const ticket = tickets.find(t => t.id === ticketId);
                if (ticket) {
                    addItem({
                        eventId,
                        eventTitle,
                        eventImage,
                        eventDate,
                        eventLocation,
                        ticketType: ticket,
                        quantity
                    });
                }
            }
        });
        
        // Clear selections after adding to cart
        setSelectedTickets({});
    };

    const formatPrice = (price: number, currency?: string) => {
        const currencySymbol = currency || 'Kz';
        return `${currencySymbol} ${Number(price).toFixed(2)}`;
    };

    const getTotalPrice = () => {
        return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
            const ticket = tickets.find(t => t.id === ticketId);
            return total + (ticket ? ticket.price * quantity : 0);
        }, 0);
    };

    const getTotalQuantity = () => {
        return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
    };

    const hasSelectedTickets = getTotalQuantity() > 0;

    return (
        <div className={`bg-white border border-gray-100 rounded-2xl p-6 ${className || ""}`}>
            <h3 className="text-body-xl font-semibold text-gray-900 mb-6">
                Selecione seus Ingressos
            </h3>

            <div className="space-y-4">
                {tickets.map((ticket) => {
                    const currentQuantity = selectedTickets[ticket.id] || 0;
                    const cartQuantity = getItemQuantity(eventId, ticket.id);
                    const maxAvailable = ticket.available;

                    return (
                        <div 
                            key={ticket.id}
                            className="border border-gray-100 rounded-xl p-4 hover:border-primary-200 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h4 className="text-body-lg font-semibold text-gray-900 mb-1">
                                        {ticket.name}
                                    </h4>
                                    <p className="text-body-sm text-gray-600 mb-2">
                                        {ticket.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-body-sm text-gray-500">
                                        <span>Disponível: {ticket.available}</span>
                                        {cartQuantity > 0 && (
                                            <span className="text-primary-500">
                                                No carrinho: {cartQuantity}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-body-xl font-semibold text-gray-900">
                                        {formatPrice(ticket.price, ticket.currency)}
                                    </div>
                                    {ticket.type === 'vip' && (
                                        <span className="text-body-sm text-primary-500 font-medium">
                                            VIP
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Benefits */}
                            {ticket.benefits.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="text-body-sm font-medium text-gray-700 mb-2">
                                        Inclui:
                                    </h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        {ticket.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-center gap-2 text-body-sm text-gray-600">
                                                <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(ticket.id, currentQuantity - 1)}
                                        disabled={currentQuantity <= 0}
                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                        {currentQuantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(ticket.id, currentQuantity + 1)}
                                        disabled={currentQuantity >= maxAvailable}
                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-body-lg font-semibold text-gray-900">
                                    {formatPrice(ticket.price * currentQuantity, ticket.currency)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total and Add to Cart */}
            {hasSelectedTickets && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-body-lg font-medium text-gray-700">
                            Total ({getTotalQuantity()} ingresso{getTotalQuantity() !== 1 ? 's' : ''}):
                        </span>
                        <span className="text-body-xl font-semibold text-gray-900">
                            {formatPrice(getTotalPrice(), 'BRL')}
                        </span>
                    </div>
                    <Button 
                        className="w-full" 
                        isPrimary 
                        isLarge
                        onClick={handleAddToCart}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TicketSelector;
