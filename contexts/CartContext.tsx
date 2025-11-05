"use client";

import { createContext, useContext, useReducer, useEffect, useState, ReactNode, useRef } from 'react';
import { CartItem, CartContextType } from '@/types/cart';
import apiClient from '@/lib/api';
import { getOrCreateSessionId, clearSessionId } from '@/utils/sessionStorage';
import { useAuth } from '@/contexts/AuthContext';

type CartAction =
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'subtotal'> }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] }
    | { type: 'UPDATE_ITEM_BACKEND_ID'; payload: { tempId: string; backendItem: CartItem } }
    | { type: 'SET_LOADING'; payload: boolean };

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
                    subtotal: (updatedItems[existingItemIndex].quantity + action.payload.quantity) * ticketType.price,
                    currency: action.payload.ticketType.currency || action.payload.currency || updatedItems[existingItemIndex].currency
                };
                return updatedItems;
            }

            const newItem: CartItem = {
                ...action.payload,
                id: `${eventId}-${ticketType.id}-${Date.now()}`,
                subtotal: action.payload.quantity * ticketType.price,
                currency: action.payload.ticketType.currency || action.payload.currency,
                price: ticketType.price
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
                        subtotal: quantity * item.ticketType.price,
                        currency: item.currency || item.ticketType.currency
                    };
                }
                return item;
            });
        }

        case 'CLEAR_CART':
            return [];

        case 'LOAD_CART':
            return action.payload;

        case 'UPDATE_ITEM_BACKEND_ID': {
            const { tempId, backendItem } = action.payload;
            return state.map(item => {
                if (item.id === tempId) {
                    return {
                        ...item,
                        id: backendItem.id,
                        backendId: backendItem.backendId,
                    };
                }
                return item;
            });
        }

        default:
            return state;
    }
};

/**
 * Converte item do backend para formato do frontend
 */
function convertCartItemFromBackend(item: any): CartItem {
    const ticket = item.ticket;
    const event = ticket?.event;
    const country = event?.country;

    // Obter moeda do país do evento (preferir currency_symbol, depois currency_code)
    const currency = item.currency || 
                     ticket?.currency || 
                     country?.currency_symbol || 
                     country?.currency_code || 
                     'Kz';

    return {
        id: item.id.toString(),
        backendId: item.id, // ID do backend
        eventId: event?.slug || event?.id?.toString() || '',
        eventTitle: event?.title || '',
        eventImage: event?.image_url || '',
        eventDate: event?.start_date || '',
        eventLocation: `${event?.venue_name || ''}, ${event?.venue_address || ''}`,
        ticketType: {
            id: ticket?.id?.toString() || '',
            name: ticket?.name || '',
            description: ticket?.description || '',
            price: parseFloat(item.price || ticket?.price || 0),
            currency: currency,
            quantity: ticket?.quantity_available || 0,
            available: (ticket?.quantity_available || 0) - (ticket?.quantity_sold || 0),
            type: 'general' as const,
            benefits: [],
        },
        quantity: item.quantity || 0,
        subtotal: parseFloat(item.price || ticket?.price || 0) * (item.quantity || 0),
        currency: currency,
        price: parseFloat(item.price || ticket?.price || 0),
    };
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, dispatch] = useReducer(cartReducer, []);
    const [loading, setLoading] = useState(false);
    const sessionIdRef = useRef<string | null>(null);
    const isInitializedRef = useRef(false);
    const { user, isAuthenticated, loading: authLoading } = useAuth();

    // Inicializar session_id apenas para visitantes (não autenticados)
    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            sessionIdRef.current = getOrCreateSessionId();
        } else if (isAuthenticated) {
            // Limpar session_id do localStorage quando autenticado
            clearSessionId();
            sessionIdRef.current = null;
        }
    }, [isAuthenticated]);

    // Carregar carrinho do banco de dados na inicialização ou quando o usuário fizer login
    useEffect(() => {
        // Aguardar o AuthContext terminar de carregar
        if (authLoading) return;

        const loadCartFromDatabase = async () => {
            // Se não autenticado, usar session_id apenas na primeira vez
            if (!isAuthenticated && isInitializedRef.current && !sessionIdRef.current) {
                return; // Não recarregar se já foi inicializado e não tem session_id
            }
            
            try {
                setLoading(true);
                // Se autenticado, não passar session_id (backend usa user_id automaticamente via token)
                // Se não autenticado, passar session_id
                const sessionId = isAuthenticated ? undefined : sessionIdRef.current || undefined;
                const response = await apiClient.getCart(sessionId);
                
                if (response.success && response.data?.cart) {
                    // Sempre carregar items do banco (substituir o carrinho local)
                    if (response.data.cart.items && Array.isArray(response.data.cart.items)) {
                        if (response.data.cart.items.length > 0) {
                            const cartItems = response.data.cart.items.map(convertCartItemFromBackend);
                            dispatch({ type: 'LOAD_CART', payload: cartItems });
                        } else {
                            // Se não houver itens, limpar carrinho
                            dispatch({ type: 'LOAD_CART', payload: [] });
                        }
                    } else {
                        // Se não houver items, limpar carrinho
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                    
                    // Atualizar session_id apenas para visitantes
                    if (!isAuthenticated && response.data.session_id) {
                        sessionIdRef.current = response.data.session_id;
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('tickety_session_id', response.data.session_id);
                        }
                    }
                } else {
                    // Se a resposta não for sucesso, manter carrinho atual se já foi inicializado
                    if (!isInitializedRef.current) {
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                }
            } catch (error) {
                console.error('Error loading cart from database:', error);
                // Em caso de erro, manter carrinho atual se já foi inicializado
                if (!isInitializedRef.current) {
                    dispatch({ type: 'LOAD_CART', payload: [] });
                }
            } finally {
                setLoading(false);
                isInitializedRef.current = true;
            }
        };

        // Aguardar um pouco para garantir que o AuthContext está inicializado
        const timeoutId = setTimeout(() => {
            loadCartFromDatabase();
        }, isAuthenticated ? 300 : 200); // Aguardar mais tempo se autenticado

        return () => clearTimeout(timeoutId);
    }, [isAuthenticated, user?.id, authLoading]); // Recarregar quando o status de autenticação mudar ou quando o user mudar

    // Removido: salvamento automático no useEffect para evitar loops
    // O salvamento é feito diretamente nas ações (addItem, removeItem, updateQuantity)

    const addItem = async (item: Omit<CartItem, 'id' | 'subtotal'>) => {
        // Adicionar localmente primeiro
        const tempId = `${item.eventId}-${item.ticketType.id}-${Date.now()}`;
        const newItem: CartItem = {
            ...item,
            id: tempId,
            subtotal: item.quantity * item.ticketType.price,
            currency: item.ticketType.currency || item.currency,
            price: item.ticketType.price,
        };
        dispatch({ type: 'ADD_ITEM', payload: item });

        // Salvar no banco de dados e atualizar com o ID real
        try {
            const ticketId = parseInt(item.ticketType.id);
            if (!isNaN(ticketId)) {
                // Se autenticado, não passar session_id (backend usa user_id)
                // Se não autenticado, passar session_id
                const sessionId = isAuthenticated ? undefined : sessionIdRef.current || undefined;
                const response = await apiClient.addCartItem(
                    ticketId,
                    item.quantity,
                    sessionId
                );
                
                // Se a resposta incluir o carrinho completo, recarregar
                if (response.success && response.data?.cart) {
                    if (response.data.cart.items && Array.isArray(response.data.cart.items)) {
                        const cartItems = response.data.cart.items.map(convertCartItemFromBackend);
                        dispatch({ type: 'LOAD_CART', payload: cartItems });
                    } else {
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                    
                    // Atualizar session_id apenas para visitantes
                    if (!isAuthenticated && response.data.session_id) {
                        sessionIdRef.current = response.data.session_id;
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('tickety_session_id', response.data.session_id);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error adding item to database:', error);
        }
    };

    const removeItem = async (itemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });

        // Remover do banco de dados
        try {
            // Tentar encontrar o item no estado para pegar o ID do backend
            const item = items.find(i => i.id === itemId);
            if (item && item.backendId) {
                const sessionId = isAuthenticated ? undefined : sessionIdRef.current || undefined;
                const response = await apiClient.removeCartItem(item.backendId, sessionId);
                
                // Recarregar carrinho completo do backend
                if (response.success && response.data?.cart) {
                    if (response.data.cart.items && Array.isArray(response.data.cart.items)) {
                        const cartItems = response.data.cart.items.map(convertCartItemFromBackend);
                        dispatch({ type: 'LOAD_CART', payload: cartItems });
                    } else {
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                }
            }
        } catch (error) {
            console.error('Error removing item from database:', error);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });

        // Atualizar no banco de dados
        try {
            // Tentar encontrar o item no estado para pegar o ID do backend
            const item = items.find(i => i.id === itemId);
            if (item && item.backendId) {
                const sessionId = isAuthenticated ? undefined : sessionIdRef.current || undefined;
                const response = await apiClient.updateCartItem(item.backendId, quantity, sessionId);
                
                // Recarregar carrinho completo do backend
                if (response.success && response.data?.cart) {
                    if (response.data.cart.items && Array.isArray(response.data.cart.items)) {
                        const cartItems = response.data.cart.items.map(convertCartItemFromBackend);
                        dispatch({ type: 'LOAD_CART', payload: cartItems });
                    } else {
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                }
            }
        } catch (error) {
            console.error('Error updating item in database:', error);
        }
    };

    const clearCart = async () => {
        dispatch({ type: 'CLEAR_CART' });

        // Limpar no banco de dados
        try {
            const sessionId = isAuthenticated ? undefined : sessionIdRef.current || undefined;
            if (sessionId || isAuthenticated) {
                const response = await apiClient.clearCart(sessionId);
                
                // Recarregar carrinho vazio do backend
                if (response.success && response.data?.cart) {
                    // Verificar se items existe e é um array antes de fazer map
                    if (response.data.cart.items && Array.isArray(response.data.cart.items)) {
                        const cartItems = response.data.cart.items.map(convertCartItemFromBackend);
                        dispatch({ type: 'LOAD_CART', payload: cartItems });
                    } else {
                        // Se não houver items ou não for array, garantir que está vazio
                        dispatch({ type: 'LOAD_CART', payload: [] });
                    }
                } else {
                    // Se não houver resposta do backend, garantir que está vazio
                    dispatch({ type: 'LOAD_CART', payload: [] });
                }
            }
        } catch (error) {
            console.error('Error clearing cart in database:', error);
            // Em caso de erro, garantir que está vazio
            dispatch({ type: 'LOAD_CART', payload: [] });
        }
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
