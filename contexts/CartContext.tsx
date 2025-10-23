"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '@/types/cart';

type CartAction =
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'subtotal'> }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { eventId, ticketType } = action.payload;
            const existingItemIndex = state.findIndex(
                item => item.eventId === eventId && item.ticketType.id === ticketType.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...state];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
                    subtotal: (updatedItems[existingItemIndex].quantity + action.payload.quantity) * ticketType.price
                };
                return updatedItems;
            }

            const newItem: CartItem = {
                ...action.payload,
                id: `${eventId}-${ticketType.id}-${Date.now()}`,
                subtotal: action.payload.quantity * ticketType.price
            };

            return [...state, newItem];
        }

        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);

        case 'UPDATE_QUANTITY': {
            const { itemId, quantity } = action.payload;
            if (quantity <= 0) {
                return state.filter(item => item.id !== itemId);
            }

            return state.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        quantity,
                        subtotal: quantity * item.ticketType.price
                    };
                }
                return item;
            });
        }

        case 'CLEAR_CART':
            return [];

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, dispatch] = useReducer(cartReducer, []);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('tickety-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('tickety-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, 'id' | 'subtotal'>) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (itemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getItemQuantity = (eventId: string, ticketTypeId: string): number => {
        const item = items.find(
            item => item.eventId === eventId && item.ticketType.id === ticketTypeId
        );
        return item ? item.quantity : 0;
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

    const value: CartContextType = {
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
