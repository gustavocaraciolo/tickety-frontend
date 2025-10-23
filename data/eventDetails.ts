import { PublicEvent } from '@/types/event';

export const getEventDetails = (eventId: string): PublicEvent | null => {
    const events = [
        {
            id: '1',
            title: 'Cultural Fusion Fest',
            description: 'Um festival multicultural que celebra a diversidade através da música, arte e gastronomia. Venha viver uma experiência única com artistas de diferentes partes do mundo, apresentações culturais autênticas e uma gastronomia que representa a riqueza de cada região.',
            shortDescription: 'Festival multicultural com música, arte e gastronomia',
            image: '/images/events/cultural-fusion.jpg',
            date: '2024-03-15',
            time: '18:00',
            location: 'Parque Ibirapuera',
            address: 'Av. Pedro Álvares Cabral, s/n - Vila Mariana',
            city: 'São Paulo',
            category: 'Music',
            categorySlug: 'music',
            organizer: 'Fusion Events',
            organizerLogo: '/images/organizers/fusion-events.png',
            price: {
                min: 89,
                max: 299,
                currency: 'BRL'
            },
            tickets: [
                {
                    id: 't1',
                    name: 'Ingresso Geral',
                    description: 'Acesso a todas as atrações do festival, incluindo palcos musicais, área de gastronomia, exposições de arte e atividades culturais.',
                    price: 89,
                    currency: 'BRL',
                    quantity: 1000,
                    available: 472,
                    type: 'general',
                    benefits: [
                        'Acesso a todos os palcos musicais',
                        'Área de gastronomia multicultural',
                        'Exposições de arte',
                        'Atividades culturais interativas',
                        'Estacionamento gratuito',
                        'Área de descanso'
                    ],
                    salesStart: '2024-01-15',
                    salesEnd: '2024-03-14'
                },
                {
                    id: 't2',
                    name: 'VIP Experience',
                    description: 'Experiência VIP com acesso privilegiado, área exclusiva com vista para os palcos principais e benefícios especiais.',
                    price: 299,
                    currency: 'BRL',
                    quantity: 200,
                    available: 125,
                    type: 'vip',
                    benefits: [
                        'Área VIP com vista privilegiada',
                        'Open bar com drinks especiais',
                        'Meet & Greet com artistas',
                        'Estacionamento VIP',
                        'Kit exclusivo do evento',
                        'Acesso antecipado',
                        'Área de descanso privativa'
                    ],
                    salesStart: '2024-01-15',
                    salesEnd: '2024-03-14'
                }
            ],
            status: 'active',
            featured: true,
            tags: ['música', 'cultura', 'festival', 'multicultural'],
            capacity: 1200,
            sold: 597,
            rating: 4.8,
            reviewsCount: 124
        }
    ];

    return events.find(event => event.id === eventId) || null;
};
