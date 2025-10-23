"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Search from "@/components/Search";
import EventCard from "@/components/EventCard";
import { featuredEvents, upcomingEvents } from "@/data/publicEvents";
import { tableContent as categoriesData } from "@/templates/Events/CategoriesPage/content";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        // Redirect to events page with search query
        window.location.href = `/shop/events?search=${encodeURIComponent(searchQuery)}`;
    };

    const popularCategories = categoriesData.slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Descubra os Melhores Eventos
                            <span className="block text-primary-600">da Sua Cidade</span>
                        </h1>
                        <p className="text-body-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Encontre e compre ingressos para shows, festivais, palestras, workshops e muito mais. 
                            Milhares de eventos esperando por você.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="flex gap-3">
                                <Search
                                    className="flex-1"
                                    placeholder="Buscar eventos, artistas, locais..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button 
                                    isPrimary 
                                    isLarge
                                    onClick={handleSearch}
                                    className="px-8"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">
                                    500+
                                </div>
                                <div className="text-body-sm text-gray-600">
                                    Eventos Disponíveis
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">
                                    50K+
                                </div>
                                <div className="text-body-sm text-gray-600">
                                    Usuários Ativos
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">
                                    98%
                                </div>
                                <div className="text-body-sm text-gray-600">
                                    Satisfação
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Eventos em Destaque
                        </h2>
                        <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                            Os eventos mais populares e aguardados da temporada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {featuredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/shop/events">
                            <Button isSecondary isLarge>
                                Ver Todos os Eventos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Explore por Categoria
                        </h2>
                        <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                            Encontre exatamente o tipo de evento que você procura
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularCategories.map((category) => (
                            <Link 
                                key={category.slug}
                                href={`/shop/events?category=${category.slug}`}
                                className="group"
                            >
                                <div className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow group-hover:border-primary-200">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                                        <div className="w-6 h-6 bg-primary-500 rounded"></div>
                                    </div>
                                    <h3 className="text-body-md font-semibold text-gray-900 mb-1">
                                        {category.categoryName}
                                    </h3>
                                    <p className="text-body-sm text-gray-500">
                                        {category.eventsCount} eventos
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Como Funciona
                        </h2>
                        <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                            Simples, rápido e seguro. Em poucos cliques você garante seu ingresso.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-3">
                                1. Escolha seu Evento
                            </h3>
                            <p className="text-body-md text-gray-600">
                                Navegue pelos eventos disponíveis e encontre aquele que mais combina com você.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-3">
                                2. Selecione os Ingressos
                            </h3>
                            <p className="text-body-md text-gray-600">
                                Escolha o tipo de ingresso e a quantidade desejada para sua experiência.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-3">
                                3. Finalize a Compra
                            </h3>
                            <p className="text-body-md text-gray-600">
                                Complete seu pedido de forma segura e receba seus ingressos por email.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Pronto para Descobrir Novos Eventos?
                    </h2>
                    <p className="text-body-lg text-primary-100 mb-8 max-w-2xl mx-auto">
                        Junte-se a milhares de pessoas que já descobriram eventos incríveis através da nossa plataforma.
                    </p>
                    <Link href="/shop/events">
                        <Button isWhite isLarge>
                            Explorar Eventos
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
