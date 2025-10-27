"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Search from "@/components/Search";
import EventCard from "@/components/EventCard";
import ElegantCarousel from "@/components/ElegantCarousel";
import SimpleCard from "@/components/SimpleCard";
import CarouselSkeleton from "@/components/Skeleton/CarouselSkeleton";
import EventCardSkeleton from "@/components/Skeleton/EventCardSkeleton";
import CategoryCardSkeleton from "@/components/Skeleton/CategoryCardSkeleton";
import apiClient from "@/lib/api";
import { getCategoryIcon } from "@/utils/categoryIcons";

interface HomeData {
    featured_events: any[];
    categories: any[];
    stats: {
        total_events: number;
        total_categories: number;
        total_orders: number;
        featured_events: number;
    };
}

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carregar dados da home
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await apiClient.getHomeData();
                
                if (response.success) {
                    setHomeData(response.data);
                } else {
                    setError('Erro ao carregar dados da home');
                }
            } catch (err) {
                setError('Erro ao carregar dados da home');
                console.error('Error fetching home data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const handleSearch = () => {
        // Redirect to events page with search query
        window.location.href = `/events?search=${encodeURIComponent(searchQuery)}`;
    };

    // Transformar eventos para o formato esperado pelo carousel
    const transformedFeaturedEvents = homeData?.featured_events?.map(event => {
        const startDate = new Date(event.start_date);
        const isValidDate = !isNaN(startDate.getTime());
        
        return {
            id: event.slug,
            title: event.title,
            description: event.description,
            image: event.image_url || '/images/placeholder-event.jpg',
            location: `${event.venue_name}, ${event.venue_address}`,
            date: isValidDate ? startDate.toLocaleDateString('pt-BR') : 'Data a definir',
            time: isValidDate ? startDate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }) : '',
            price: {
                min: 50,
                max: 50,
                currency: "BRL"
            },
            categorySlug: event.category.slug,
            categoryName: event.category.name,
            categoryIcon: event.category.icon,
            organizer: event.user.name,
            status: event.status === 'published' ? 'active' : event.status,
            featured: event.featured
        };
    }) || [];

    // Transformar categorias para o formato esperado
    const popularCategories = homeData?.categories?.slice(0, 6).map(category => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        description: category.description || getCategoryDescription(category.slug), // fallback
        icon: category.icon, // Usar o ícone real da API
        eventCount: category.events_count || 0
    })) || [];

    // Funções auxiliares
    function getCategoryDescription(slug: string): string {
        const descriptions: Record<string, string> = {
            'music': 'Descubra os melhores eventos musicais da sua cidade',
            'technology': 'Conferências e workshops de tecnologia e inovação',
            'sports': 'Eventos esportivos e atividades físicas',
            'business': 'Networking e eventos corporativos',
            'education': 'Cursos, palestras e eventos educacionais',
            'arts': 'Exposições, shows e eventos culturais',
            'food': 'Festivais gastronômicos e eventos culinários',
            'health': 'Eventos de bem-estar e saúde'
        };
        return descriptions[slug] || 'Descubra eventos incríveis nesta categoria';
    }

    if (loading) {
        return (
            <div className="min-h-screen">
                {/* Carousel Skeleton */}
                <section className="relative">
                    <CarouselSkeleton />
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
                            {[...Array(6)].map((_, i) => (
                                <EventCardSkeleton key={i} />
                            ))}
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
                                Encontre eventos que combinam com seus interesses
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <CategoryCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-body-lg text-red-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section with Carousel */}
            <section className="relative">
                <ElegantCarousel events={transformedFeaturedEvents} />
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
                        {transformedFeaturedEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/events">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularCategories.map((category) => (
                            <SimpleCard key={category.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer flex flex-col h-full">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                                        <Image
                                            src={category.icon}
                                            alt={category.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {category.eventCount} eventos disponíveis
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                    {category.description}
                                </p>
                                
                                <div className="mt-auto">
                                    <Link href={`/events?category=${category.slug}`}>
                                        <Button 
                                            className="w-full group-hover:bg-primary-600 transition-colors" 
                                            isPrimary 
                                            isMedium
                                        >
                                            Explorar Eventos
                                        </Button>
                                    </Link>
                                </div>
                            </SimpleCard>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/categories">
                            <Button isSecondary isLarge>
                                Ver Todas as Categorias
                            </Button>
                        </Link>
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
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                <Image
                                    src="/images/icons/Activities Blueprint/Search _ binoculars, magnification, vision, seeing, Vector illustration.png"
                                    alt="Buscar Eventos"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover"
                                />
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-3">
                                1. Escolha seu Evento
                            </h3>
                            <p className="text-body-md text-gray-600">
                                Navegue pelos eventos disponíveis e encontre aquele que mais combina com você.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                <Image
                                    src="/images/icons/Activities Blueprint/Shopping and Retail _ discount tag, price tag, sale, shopping, Vector illustration.png"
                                    alt="Selecionar Ingressos"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover"
                                />
                            </div>
                            <h3 className="text-body-xl font-semibold text-gray-900 mb-3">
                                2. Selecione os Ingressos
                            </h3>
                            <p className="text-body-md text-gray-600">
                                Escolha o tipo de ingresso e a quantidade desejada para sua experiência.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                <Image
                                    src="/images/icons/Activities Blueprint/Achievement and Success _ celebration, happiness, motivation, success, Vector illustration.png"
                                    alt="Finalizar Compra"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover"
                                />
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
                    <Link href="/events">
                        <Button isWhite isLarge>
                            Explorar Eventos
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

// Helper functions
function getCategoryNamePT(slug: string): string {
    const names: Record<string, string> = {
        'music': 'Música',
        'business-networking': 'Negócios & Networking',
        'sports-fitness': 'Esportes & Fitness',
        'arts-culture': 'Arte & Cultura',
        'technology': 'Tecnologia',
        'food-drink': 'Gastronomia & Bebidas',
        'education-workshops': 'Educação & Workshops',
        'health-wellness': 'Saúde & Bem-estar',
        'charity-causes': 'Causas Sociais',
        'family-kids': 'Família & Crianças',
        'travel-adventure': 'Viagem & Aventura',
        'gaming-entertainment': 'Gaming & Entretenimento',
        'outdoor-nature': 'Ar Livre & Natureza',
        'creative-design': 'Criativo & Design',
        'relationships-dating': 'Relacionamentos & Encontros'
    };
    return names[slug] || 'Categoria';
}

function getCategoryDescription(slug: string): string {
    const descriptions: Record<string, string> = {
        'music': 'Concertos, festivais, shows e eventos musicais de todos os gêneros. Rock, pop, jazz, clássica e muito mais.',
        'business-networking': 'Conferências, workshops, networking e eventos corporativos para profissionais e empreendedores.',
        'sports-fitness': 'Corridas, maratonas, competições esportivas, yoga, crossfit e eventos de fitness para todos os níveis.',
        'arts-culture': 'Exposições, teatro, dança, arte contemporânea, museus e eventos culturais enriquecedores.',
        'technology': 'Conferências tech, hackathons, meetups, workshops de programação e eventos de inovação digital.',
        'food-drink': 'Degustações, festivais gastronômicos, wine tastings, culinária internacional e experiências gastronômicas únicas.',
        'education-workshops': 'Cursos, workshops, palestras, treinamentos e eventos educacionais para desenvolvimento pessoal e profissional.',
        'health-wellness': 'Yoga, meditação, retiros, terapias alternativas e eventos focados no bem-estar físico e mental.',
        'charity-causes': 'Eventos beneficentes, campanhas solidárias, ações sociais e oportunidades de fazer a diferença.',
        'family-kids': 'Eventos familiares, atividades infantis, brincadeiras educativas e entretenimento para todas as idades.',
        'travel-adventure': 'Trekking, camping, escalada, aventuras ao ar livre, viagens em grupo e experiências de exploração únicas.',
        'gaming-entertainment': 'Torneios de e-sports, lançamentos de jogos, convenções de gaming, reality shows e entretenimento digital.',
        'outdoor-nature': 'Acampamentos, trilhas, observação de pássaros, fotografia da natureza, yoga ao ar livre e conexão com a natureza.',
        'creative-design': 'Workshops de arte, design thinking, fotografia criativa, artesanato, ilustração e expressão artística.',
        'relationships-dating': 'Speed dating, jantares românticos, workshops de relacionamento, encontros temáticos e conexões especiais.'
    };
    return descriptions[slug] || 'Eventos incríveis esperando por você';
}

function getCategoryIcon(slug: string): string {
    const icons: Record<string, string> = {
        'music': 'music',
        'business-networking': 'business',
        'sports-fitness': 'sports',
        'arts-culture': 'arts',
        'technology': 'technology',
        'food-drink': 'food',
        'education-workshops': 'education',
        'health-wellness': 'wellness',
        'charity-causes': 'charity',
        'family-kids': 'family',
        'travel-adventure': 'travel',
        'gaming-entertainment': 'gaming',
        'outdoor-nature': 'outdoor',
        'creative-design': 'creative',
        'relationships-dating': 'relationships'
    };
    return icons[slug] || 'calendar';
}

export default HomePage;