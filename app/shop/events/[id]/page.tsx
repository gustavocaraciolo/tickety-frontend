"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { expandedEvents } from "@/data/expandedEvents";

const EventDetailsPage = () => {
    const params = useParams();
    const eventId = params.id as string;
    const [activeTab, setActiveTab] = useState<'details' | 'tickets'>('details');

    const event = expandedEvents.find(e => e.id === eventId);

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Evento não encontrado
                    </h1>
                    <p className="text-gray-600 mb-6">
                        O evento que você está procurando não existe ou foi removido.
                    </p>
                    <Button isPrimary isLarge href="/shop/events">
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
            return `R$ ${min.toFixed(2)}`;
        }
        return `R$ ${min.toFixed(2)} - R$ ${max.toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-body-sm text-gray-500 mb-8">
                    <a href="/shop" className="hover:text-gray-700">Home</a>
                    <Icon name="chevron-right" className="w-4 h-4" />
                    <a href="/shop/events" className="hover:text-gray-700">Eventos</a>
                    <Icon name="chevron-right" className="w-4 h-4" />
                    <span className="text-gray-900">{event.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Event Image */}
                        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                            <Image
                                src={event.image}
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
                                            <span>{formatDate(event.date)} às {event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon name="location" className="w-5 h-5 fill-gray-400" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {formatPrice(event.price.min, event.price.max, event.price.currency)}
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
                                                        {event.location}
                                                    </div>
                                                    <div className="text-body-sm text-gray-600">
                                                        {event.location}
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
                                                    {event.organizer}
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
                                                        <span>Disponível: {event.ticketsAvailable || 100}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-body-xl font-semibold text-gray-900">
                                                        R$ {event.price.min.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">0</span>
                                                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-body-lg font-semibold text-gray-900">
                                                    R$ 0,00
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {event.price.min !== event.price.max && (
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
                                                            <span>Disponível: {Math.floor((event.ticketsAvailable || 100) * 0.3)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-body-xl font-semibold text-gray-900">
                                                            R$ {event.price.max.toFixed(2)}
                                                        </div>
                                                        <span className="text-body-sm text-primary-500 font-medium">
                                                            VIP
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium">0</span>
                                                        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="text-body-lg font-semibold text-gray-900">
                                                        R$ 0,00
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <Button 
                                            className="w-full" 
                                            isPrimary 
                                            isLarge
                                        >
                                            Adicionar ao Carrinho
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
                                            {formatDate(event.date)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Horário:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {event.time}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Local:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {event.location}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-body-sm text-gray-600">Categoria:</span>
                                        <span className="text-body-sm font-medium text-gray-900">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-body-lg font-semibold text-gray-900">
                                            A partir de:
                                        </span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            {formatPrice(event.price.min, event.price.max, event.price.currency)}
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
