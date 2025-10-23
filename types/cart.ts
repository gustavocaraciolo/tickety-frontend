import { TicketType } from './event';

export interface CartItem {
    id: string;
    eventId: string;
    eventTitle: string;
    eventImage: string;
    eventDate: string;
    eventLocation: string;
    ticketType: TicketType;
    quantity: number;
    subtotal: number;
}

export interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (item: Omit<CartItem, 'id' | 'subtotal'>) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (eventId: string, ticketTypeId: string) => number;
}
