"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import CategoryFilter from "@/components/CategoryFilter";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import Image from "@/components/Image";
import apiClient from "@/lib/api";
import { getCategoryIcon } from "@/utils/categoryIcons";

interface Event {
    id: number;
    title: string;
    slug: string;
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
        color: string;
    };
    country: {
        id: number;
        name: string;
        code: string;
        currency_code?: string;
        currency_symbol?: string;
    };
    state: {
        id: number;
        name: string;
        code: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    tickets?: Array<{
        id: number;
        name: string;
        price: number;
        currency?: string;
        is_active: boolean;
        quantity_available: number;
        quantity_sold: number;
    }>;
}

interface EventsResponse {
    success: boolean;
    data: {
        data: Event[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const EventsPageContent = () => {
    const searchParams = useSearchParams();
    
    // Ler parâmetros da URL e atualizar estado quando mudarem
    const searchQueryFromUrl = searchParams.get('search') || "";
    const categoryFromUrl = searchParams.get('category') || null;
    const countryFromUrl = searchParams.get('country') ? parseInt(searchParams.get('country') || '0') : null;
    const stateFromUrl = searchParams.get('state') ? parseInt(searchParams.get('state') || '0') : null;
    const pageFromUrl = searchParams.get('page') ? parseInt(searchParams.get('page') || '1') : 1;
    
    const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(countryFromUrl);
    const [selectedStateId, setSelectedStateId] = useState<number | null>(stateFromUrl);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 9,
        total: 0
    });

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.getCategories();
                if (response.success) {
                    setCategories(response.data);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    // Sincronizar estado com parâmetros da URL quando mudarem
    useEffect(() => {
        setSearchQuery(searchQueryFromUrl);
        setSelectedCategory(categoryFromUrl);
        setSelectedCountryId(countryFromUrl);
        setSelectedStateId(stateFromUrl);
        setCurrentPage(pageFromUrl);
    }, [searchQueryFromUrl, categoryFromUrl, countryFromUrl, stateFromUrl, pageFromUrl]);

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    per_page: '9'
                });

                if (searchQuery) {
                    params.append('search', searchQuery);
                }

                if (selectedCategory) {
                    // Find category ID by slug
                    const categories = await apiClient.getCategories();
                    const category = categories.data.find((cat: any) => cat.slug === selectedCategory);
                    if (category) {
                        params.append('category_id', category.id.toString());
                    }
                }

                // Adicionar filtro de país se presente
                if (selectedCountryId) {
                    params.append('country_id', selectedCountryId.toString());
                }

                // Adicionar filtro de estado se presente
                if (selectedStateId) {
                    params.append('state_id', selectedStateId.toString());
                }

                const response = await apiClient.getEvents(params.toString());
                
                if (response.success) {
                    console.log('Setting events:', response.data.data.length);
                    setEvents(response.data.data);
                    setPagination({
                        current_page: response.data.current_page,
                        last_page: response.data.last_page,
                        per_page: response.data.per_page,
                        total: response.data.total
                    });
                } else {
                    setError('Erro ao carregar eventos');
                }
            } catch (err) {
                setError('Erro ao carregar eventos');
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentPage, searchQuery, selectedCategory, selectedCountryId, selectedStateId]);

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const handleCategoryChange = (categorySlug: string | null) => {
        setSelectedCategory(categorySlug);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Transform events to match EventCard interface (igual à home)
    const transformedEvents = events.map(event => {
        const startDate = new Date(event.start_date);
        const isValidDate = !isNaN(startDate.getTime());
        
        // Calcular preços mínimo e máximo dos tickets
        const tickets = event.tickets || [];
        const prices = tickets
            .filter((ticket: any) => ticket.is_active && ticket.quantity_available > 0)
            .map((ticket: any) => parseFloat(ticket.price) || 0)
            .filter((price: number) => price > 0);
        
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
        
        // Obter moeda do país do evento
        const currency = event.country?.currency_symbol || event.country?.currency_code || 'Kz';
        const currencyCode = event.country?.currency_code || 'AOA';
        
        return {
            id: event.slug,
            title: event.title,
            description: event.description,
            shortDescription: event.description?.substring(0, 100) || '',
            image: event.image_url || '/images/placeholder-event.jpg',
            location: `${event.venue_name}, ${event.venue_address}`,
            address: event.venue_address || '',
            city: event.state?.name || event.country?.name || '',
            date: isValidDate ? startDate.toLocaleDateString('pt-BR') : 'Data a definir',
            time: isValidDate ? startDate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }) : '',
            price: {
                min: minPrice,
                max: maxPrice,
                currency: currency,
                currencyCode: currencyCode
            },
            category: event.category.slug,
            categorySlug: event.category.slug,
            categoryName: event.category.name,
            categoryIcon: event.category.icon || getCategoryIcon(event.category.slug),
            organizer: event.user.name,
            status: event.status === 'published' ? 'active' : event.status,
            featured: event.featured,
            rating: undefined, // Não definir rating se não houver avaliações
            reviewsCount: undefined, // Não definir reviewsCount se não houver avaliações
            tickets: [],
            tags: [],
            capacity: 0,
            sold: 0
        };
    });

    const selectedCategoryData = transformedEvents.find(event => event.categorySlug === selectedCategory);

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
                                categories={categories}
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
                            {loading ? 'Carregando...' : `${pagination.total} evento${pagination.total !== 1 ? 's' : ''} encontrado${pagination.total !== 1 ? 's' : ''}`}
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
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
                                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">{error}</div>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    ) : transformedEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {transformedEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Image
                                    src="/images/icons/activities-blueprint/search-binoculars-magnification-vision-seeing-vector-illustration.png"
                                    alt="Nenhum evento encontrado"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover"
                                />
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
                                    setSelectedCountryId(null);
                                    setSelectedStateId(null);
                                    setCurrentPage(1);
                                    // Limpar URL params
                                    window.history.pushState({}, '', '/events');
                                }}
                                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && !error && pagination.last_page > 1 && (
                    <div className="flex justify-center">
                        <Pagination 
                            currentPage={pagination.current_page}
                            totalPages={pagination.last_page}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const EventsPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
                                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <EventsPageContent />
        </Suspense>
    );
};

export default EventsPage;
