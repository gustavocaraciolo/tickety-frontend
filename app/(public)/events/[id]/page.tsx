"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useCart } from "@/contexts/CartContext";
import apiClient from "@/lib/api";
import { getCategoryIcon } from "@/utils/categoryIcons";

interface Event {
    id: number;
    slug: string;
    title: string;
    description: string;
    image_url: string;
    venue_name: string;
    venue_address: string;
    start_date: string;
    end_date: string;
    status: string;
    featured: boolean;
    category: {
        id: number;
        slug: string;
        name: string;
        icon: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    tickets: Array<{
        id: number;
        name: string;
        description: string;
        price: number;
        currency: string;
        quantity_available: number;
        quantity_sold: number;
        is_active: boolean;
    }>;
}

const EventDetailsPage = () => {
    const params = useParams();
    const eventId = params.id as string;
    const [activeTab, setActiveTab] = useState<'details' | 'tickets'>('details');
    const [standardQuantity, setStandardQuantity] = useState(0);
    const [vipQuantity, setVipQuantity] = useState(0);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addItem } = useCart();

    // Carregar dados do evento
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await apiClient.getEvent(eventId);
                
                if (response.success) {
                    setEvent(response.data);
                } else {
                    setError('Evento não encontrado');
                }
            } catch (err) {
                setError('Erro ao carregar evento');
                console.error('Error fetching event:', err);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const handleAddToCart = () => {
        if (!event) return;
        
        // Adicionar tickets Standard
        if (standardQuantity > 0) {
            const standardTicket = event.tickets.find(t => t.name === 'Pista');
            if (standardTicket) {
                addItem({
                    eventId: event.slug,
                    eventTitle: event.title,
                    eventImage: event.image_url,
                    eventDate: new Date(event.start_date).toLocaleDateString('pt-BR'),
                    eventLocation: `${event.venue_name}, ${event.venue_address}`,
                    ticketType: {
                        id: standardTicket.id.toString(),
                        name: standardTicket.name,
                        price: standardTicket.price,
                        currency: standardTicket.currency,
                        quantity: standardQuantity,
                        available: standardTicket.quantity_available,
                        type: 'general' as const,
                        benefits: [standardTicket.description],
                        description: standardTicket.description
                    },
                    quantity: standardQuantity
                });
            }
        }
        
        // Adicionar tickets VIP
        if (vipQuantity > 0) {
            const vipTicket = event.tickets.find(t => t.name === 'VIP');
            if (vipTicket) {
                addItem({
                    eventId: event.slug,
                    eventTitle: event.title,
                    eventImage: event.image_url,
                    eventDate: new Date(event.start_date).toLocaleDateString('pt-BR'),
                    eventLocation: `${event.venue_name}, ${event.venue_address}`,
                    ticketType: {
                        id: vipTicket.id.toString(),
                        name: vipTicket.name,
                        price: vipTicket.price,
                        currency: vipTicket.currency,
                        quantity: vipQuantity,
                        available: vipTicket.quantity_available,
                        type: 'vip' as const,
                        benefits: [vipTicket.description],
                        description: vipTicket.description
                    },
                    quantity: vipQuantity
                });
            }
        }
        
        // Reset quantities
        setStandardQuantity(0);
        setVipQuantity(0);
    };

    // Calcular preço total baseado nos tickets reais
    const totalPrice = event ? 
        (standardQuantity * (event.tickets.find(t => t.name === 'Pista')?.price || 0)) + 
        (vipQuantity * (event.tickets.find(t => t.name === 'VIP')?.price || 0)) : 0;
    const hasItems = standardQuantity > 0 || vipQuantity > 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs Skeleton */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Skeleton */}
                        <div className="lg:col-span-2">
                            {/* Event Image Skeleton */}
                            <div className="h-96 bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
                            
                            {/* Event Header Skeleton */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex-1">
                                    <div className="h-8 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="text-right">
                                    <div className="h-6 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Tabs Skeleton */}
                            <div className="flex border-b border-gray-200 mb-8">
                                <div className="h-8 w-20 bg-gray-200 rounded mr-8 animate-pulse"></div>
                                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Sidebar Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                                <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
                                
                                <div className="space-y-3 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex justify-between">
                                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        {error || 'Evento não encontrado'}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        O evento que você está procurando não existe ou foi removido.
                    </p>
                    <Button isPrimary isLarge href="/events">
                        Ver Todos os Eventos
                    </Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (min: number, max: number, currency: string) => {
        if (min === max) {
            return `R$ ${Number(min).toFixed(2)}`;
        }
        return `R$ ${Number(min).toFixed(2)} - R$ ${Number(max).toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-body-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-gray-700">Home</Link>
                            <Icon name="chevron-right" className="w-4 h-4" />
                            <Link href="/events" className="hover:text-gray-700">Eventos</Link>
                    <Icon name="chevron-right" className="w-4 h-4" />
                    <span className="text-gray-900">{event.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Event Image */}
                        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                            <Image
                                src={event.image_url || '/images/placeholder-event.jpg'}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            {event.featured && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-500 text-white text-body-sm font-medium px-3 py-1 rounded-lg">
                                        Destaque
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Event Info */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {event.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-body-md text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Icon name="calendar" className="w-5 h-5 fill-gray-400" />
                                            <span>{formatDate(event.start_date)} às {new Date(event.start_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon name="location" className="w-5 h-5 fill-gray-400" />
                                            <span>{event.venue_name}, {event.venue_address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {event.tickets.length > 0 ? 
                                            `${event.tickets[0].currency} ${Number(event.tickets[0].price).toFixed(2)}` : 
                                            'Preço não disponível'}
                                    </div>
                                    {event.rating && (
                                        <div className="flex items-center gap-1 justify-end">
                                            <Icon name="star" className="w-4 h-4 fill-warning-100" />
                                            <span className="text-body-sm text-gray-600">
                                                {event.rating} ({event.reviewsCount} avaliações)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-gray-100 mb-6">
                                <nav className="flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`py-2 px-1 border-b-2 font-medium text-body-md ${
                                            activeTab === 'details'
                                                ? 'border-primary-500 text-primary-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Detalhes
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('tickets')}
                                        className={`py-2 px-1 border-b-2 font-medium text-body-md ${
                                            activeTab === 'tickets'
                                                ? 'border-primary-500 text-primary-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Ingressos
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'details' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-body-lg font-semibold text-gray-900 mb-3">
                                            Sobre o Evento
                                        </h3>
                                        <p className="text-body-md text-gray-600 leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-body-lg font-semibold text-gray-900 mb-3">
                                            Localização
                                        </h3>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <Icon name="location" className="w-5 h-5 fill-gray-400 mt-1" />
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">
                                                        {event.venue_name}, {event.venue_address}
                                                    </div>
                                                    <div className="text-body-sm text-gray-600">
                                                        {event.venue_name}, {event.venue_address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-body-lg font-semibold text-gray-900 mb-3">
                                            Organizador
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {event.user.name}
                                                </div>
                                                <div className="text-body-sm text-gray-500">
                                                    Organizador
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tickets' && (
                                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                                    <h3 className="text-body-xl font-semibold text-gray-900 mb-6">
                                        Ingressos Disponíveis
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="border border-gray-100 rounded-xl p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="text-body-lg font-semibold text-gray-900 mb-1">
                                                        Ingresso Padrão
                                                    </h4>
                                                    <p className="text-body-sm text-gray-600 mb-2">
                                                        Acesso completo ao evento
                                                    </p>
                                                    <div className="flex items-center gap-4 text-body-sm text-gray-500">
                                                        <span>Disponível: {event.tickets.find(t => t.name === 'Pista')?.quantity_available || 0}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-body-xl font-semibold text-gray-900">
                                                        {event.tickets.find(t => t.name === 'Pista')?.currency || event.tickets[0]?.currency || 'MZN'} {Number(event.tickets.find(t => t.name === 'Pista')?.price || 0).toFixed(2) || '0.00'}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        onClick={() => setStandardQuantity(Math.max(0, standardQuantity - 1))}
                                                        disabled={standardQuantity === 0}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{standardQuantity}</span>
                                                    <button 
                                                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                                        onClick={() => setStandardQuantity(standardQuantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-body-lg font-semibold text-gray-900">
                                                    {event.tickets.find(t => t.name === 'Pista')?.currency || event.tickets[0]?.currency || 'MZN'} {(standardQuantity * (event.tickets.find(t => t.name === 'Pista')?.price || 0)).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {event.tickets.find(t => t.name === 'VIP') && (
                                            <div className="border border-gray-100 rounded-xl p-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h4 className="text-body-lg font-semibold text-gray-900 mb-1">
                                                            Ingresso VIP
                                                        </h4>
                                                        <p className="text-body-sm text-gray-600 mb-2">
                                                            Acesso VIP com benefícios exclusivos
                                                        </p>
                                                        <div className="flex items-center gap-4 text-body-sm text-gray-500">
                                                            <span>Disponível: {event.tickets.find(t => t.name === 'VIP')?.quantity_available || 0}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-body-xl font-semibold text-gray-900">
                                                            {event.tickets.find(t => t.name === 'VIP')?.currency || event.tickets[0]?.currency || 'MZN'} {Number(event.tickets.find(t => t.name === 'VIP')?.price || 0).toFixed(2) || '0.00'}
                                                        </div>
                                                        <span className="text-body-sm text-primary-500 font-medium">
                                                            VIP
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <button 
                                                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            onClick={() => setVipQuantity(Math.max(0, vipQuantity - 1))}
                                                            disabled={vipQuantity === 0}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{vipQuantity}</span>
                                                        <button 
                                                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                                            onClick={() => setVipQuantity(vipQuantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="text-body-lg font-semibold text-gray-900">
                                                        {event.tickets.find(t => t.name === 'VIP')?.currency || event.tickets[0]?.currency || 'MZN'} {(vipQuantity * (event.tickets.find(t => t.name === 'VIP')?.price || 0)).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-body-lg font-semibold text-gray-900">
                                                Total:
                                            </span>
                                            <span className="text-body-xl font-bold text-gray-900">
                                                {event.tickets[0]?.currency || 'MZN'} {totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        <Button 
                                            className="w-full" 
                                            isPrimary 
                                            isLarge
                                            disabled={!hasItems}
                                            onClick={handleAddToCart}
                                        >
                                            {hasItems ? 'Adicionar ao Carrinho' : 'Selecione os ingressos'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Event Summary */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
                                <h3 className="text-body-lg font-semibold text-gray-900 mb-4">
                                    Resumo do Evento
                                </h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Data:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {formatDate(event.start_date)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Horário:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {new Date(event.start_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Local:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {event.venue_name}, {event.venue_address}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Categoria:</span>
                                        <span className="text-body-sm font-medium text-gray-900 flex items-center gap-2">
                                            <Image
                                                src={getCategoryIcon(event.category.slug)}
                                                alt={event.category.name}
                                                width={16}
                                                height={16}
                                                className="w-4 h-4 object-cover"
                                            />
                                            {event.category.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-body-lg font-semibold text-gray-900">
                                            A partir de:
                                        </span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            {event.tickets.length > 0 ? 
                                            `${event.tickets[0].currency} ${Number(event.tickets[0].price).toFixed(2)}` : 
                                            'Preço não disponível'}
                                        </span>
                                    </div>
                                    
                                    <Button 
                                        className="w-full" 
                                        isPrimary 
                                        isLarge
                                        onClick={() => setActiveTab('tickets')}
                                    >
                                        Selecionar Ingressos
                                    </Button>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                                <h3 className="text-body-lg font-semibold text-gray-900 mb-4">
                                    Compartilhar
                                </h3>
                                <div className="flex gap-3">
                                    <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Icon name="facebook" className="w-5 h-5 fill-gray-400 mx-auto" />
                                    </button>
                                    <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Icon name="twitter" className="w-5 h-5 fill-gray-400 mx-auto" />
                                    </button>
                                    <button className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Icon name="whatsapp" className="w-5 h-5 fill-gray-400 mx-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
