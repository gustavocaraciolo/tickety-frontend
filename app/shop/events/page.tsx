"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import CategoryFilter from "@/components/CategoryFilter";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { upcomingEvents } from "@/data/publicEvents";
import { tableContent as categoriesData } from "@/templates/Events/CategoriesPage/content";

const EventsPage = () => {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        searchParams.get('category') || null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter events based on search and category
    const filteredEvents = useMemo(() => {
        let filtered = upcomingEvents;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory) {
            filtered = filtered.filter(event => event.categorySlug === selectedCategory);
        }

        return filtered;
    }, [searchQuery, selectedCategory]);

    // Paginate events
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const handleCategoryChange = (categorySlug: string | null) => {
        setSelectedCategory(categorySlug);
        setCurrentPage(1);
    };

    const selectedCategoryData = categoriesData.find(cat => cat.slug === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {selectedCategoryData ? selectedCategoryData.categoryName : 'Todos os Eventos'}
                    </h1>
                    <p className="text-body-lg text-gray-600">
                        {selectedCategoryData 
                            ? `Encontre os melhores eventos de ${selectedCategoryData.categoryName.toLowerCase()}`
                            : 'Descubra eventos incríveis esperando por você'
                        }
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <Search
                                className="w-full"
                                placeholder="Buscar eventos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="lg:w-64">
                            <CategoryFilter
                                categories={categoriesData.map(cat => ({
                                    id: cat.slug,
                                    name: cat.categoryName,
                                    slug: cat.slug,
                                    description: '',
                                    icon: '',
                                    color: '#1565ff',
                                    eventCount: cat.eventsCount
                                }))}
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="h-13 px-6 bg-primary-500 text-white rounded-xl font-semibold text-body-lg hover:bg-primary-600 transition-colors"
                        >
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-body-md text-gray-600">
                            {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
                        </div>
                        
                        {/* Sort Options */}
                        <div className="flex items-center gap-2">
                            <span className="text-body-sm text-gray-500">Ordenar por:</span>
                            <select className="border border-gray-200 rounded-lg px-3 py-2 text-body-sm">
                                <option value="date">Data</option>
                                <option value="price">Preço</option>
                                <option value="popularity">Popularidade</option>
                                <option value="rating">Avaliação</option>
                            </select>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {paginatedEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <div className="w-8 h-8 bg-gray-400 rounded"></div>
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-2">
                                Nenhum evento encontrado
                            </h3>
                            <p className="text-body-md text-gray-600 mb-6">
                                Tente ajustar seus filtros ou buscar por outros termos.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory(null);
                                    setCurrentPage(1);
                                }}
                                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
