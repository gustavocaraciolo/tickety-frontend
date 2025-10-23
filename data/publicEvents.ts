import { PublicEvent } from '@/types/event';

export const publicEvents: PublicEvent[] = [
    {
        id: '1',
        title: 'Cultural Fusion Fest',
        description: 'Um festival multicultural que celebra a diversidade através da música, arte e gastronomia. Venha viver uma experiência única com artistas de diferentes partes do mundo.',
        shortDescription: 'Festival multicultural com música, arte e gastronomia',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
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
                description: 'Acesso a todas as atrações do festival',
                price: 89,
                currency: 'BRL',
                quantity: 1000,
                available: 472,
                type: 'general',
                benefits: ['Acesso a todas as atrações', 'Área de alimentação', 'Estacionamento']
            },
            {
                id: 't2',
                name: 'VIP Experience',
                description: 'Área VIP com vista privilegiada e benefícios exclusivos',
                price: 299,
                currency: 'BRL',
                quantity: 200,
                available: 125,
                type: 'vip',
                benefits: ['Área VIP', 'Open bar', 'Meet & Greet com artistas', 'Estacionamento VIP']
            }
        ],
        status: 'active',
        featured: true,
        tags: ['música', 'cultura', 'festival', 'multicultural'],
        capacity: 1200,
        sold: 597,
        rating: 4.8,
        reviewsCount: 124
    },
    {
        id: '2',
        title: 'Tech Innovation Summit',
        description: 'O maior evento de tecnologia e inovação do Brasil. Palestras com os maiores especialistas, networking e oportunidades de negócio.',
        shortDescription: 'Summit de tecnologia e inovação com palestras e networking',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center',
        date: '2024-03-22',
        time: '09:00',
        location: 'Centro de Convenções Anhembi',
        address: 'Av. Olavo Fontoura, 1209 - Santana',
        city: 'São Paulo',
        category: 'Technology',
        categorySlug: 'technology',
        organizer: 'Tech Brasil',
        organizerLogo: '/images/organizers/tech-brasil.png',
        price: {
            min: 199,
            max: 599,
            currency: 'BRL'
        },
        tickets: [
            {
                id: 't3',
                name: 'Early Bird',
                description: 'Desconto especial para os primeiros inscritos',
                price: 199,
                currency: 'BRL',
                quantity: 500,
                available: 407,
                type: 'early-bird',
                benefits: ['Acesso a todas as palestras', 'Material digital', 'Coffee break', 'Networking']
            },
            {
                id: 't4',
                name: 'Standard',
                description: 'Ingresso padrão com acesso completo',
                price: 399,
                currency: 'BRL',
                quantity: 800,
                available: 165,
                type: 'general',
                benefits: ['Acesso a todas as palestras', 'Material digital', 'Almoço', 'Networking', 'Certificado']
            },
            {
                id: 't5',
                name: 'Premium',
                description: 'Experiência premium com benefícios exclusivos',
                price: 599,
                currency: 'BRL',
                quantity: 200,
                available: 180,
                type: 'vip',
                benefits: ['Acesso VIP', 'Jantar de gala', 'Meet & Greet', 'Material exclusivo', 'Certificado premium']
            }
        ],
        status: 'active',
        featured: true,
        tags: ['tecnologia', 'inovação', 'palestras', 'networking'],
        capacity: 1500,
        sold: 752,
        rating: 4.9,
        reviewsCount: 89
    },
    {
        id: '3',
        title: 'Yoga & Wellness Retreat',
        description: 'Um retiro de bem-estar em meio à natureza. Práticas de yoga, meditação, alimentação saudável e conexão com a natureza.',
        shortDescription: 'Retiro de bem-estar com yoga, meditação e natureza',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center',
        date: '2024-04-05',
        time: '07:00',
        location: 'Sítio Zen',
        address: 'Estrada do Retiro, Km 15',
        city: 'Campos do Jordão',
        category: 'Health & Wellness',
        categorySlug: 'health-wellness',
        organizer: 'Zen Life',
        organizerLogo: '/images/organizers/zen-life.png',
        price: {
            min: 299,
            max: 499,
            currency: 'BRL'
        },
        tickets: [
            {
                id: 't6',
                name: 'Retiro Completo',
                description: 'Acesso completo ao retiro com hospedagem',
                price: 499,
                currency: 'BRL',
                quantity: 50,
                available: 25,
                type: 'general',
                benefits: ['Hospedagem', 'Todas as refeições', 'Aulas de yoga', 'Meditação', 'Trilhas na natureza']
            },
            {
                id: 't7',
                name: 'Dia de Prática',
                description: 'Apenas o dia de práticas sem hospedagem',
                price: 299,
                currency: 'BRL',
                quantity: 30,
                available: 15,
                type: 'general',
                benefits: ['Aulas de yoga', 'Meditação', 'Almoço saudável', 'Trilha na natureza']
            }
        ],
        status: 'active',
        featured: false,
        tags: ['yoga', 'bem-estar', 'natureza', 'meditação'],
        capacity: 80,
        sold: 40,
        rating: 4.7,
        reviewsCount: 23
    },
    {
        id: '4',
        title: 'Food & Wine Festival',
        description: 'O melhor da gastronomia e enologia em um só lugar. Chefs renomados, vinhos premiados e experiências únicas.',
        shortDescription: 'Festival de gastronomia e enologia com chefs renomados',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        date: '2024-04-12',
        time: '19:00',
        location: 'Mercado Municipal',
        address: 'Rua da Cantareira, 306 - Centro',
        city: 'São Paulo',
        category: 'Food & Drink',
        categorySlug: 'food-drink',
        organizer: 'Gourmet Events',
        organizerLogo: '/images/organizers/gourmet-events.png',
        price: {
            min: 149,
            max: 399,
            currency: 'BRL'
        },
        tickets: [
            {
                id: 't8',
                name: 'Degustação Básica',
                description: 'Acesso às degustações e palestras',
                price: 149,
                currency: 'BRL',
                quantity: 300,
                available: 200,
                type: 'general',
                benefits: ['Degustações', 'Palestras', 'Material do evento']
            },
            {
                id: 't9',
                name: 'Experiência Premium',
                description: 'Degustações exclusivas e jantar com chefs',
                price: 399,
                currency: 'BRL',
                quantity: 100,
                available: 60,
                type: 'vip',
                benefits: ['Degustações exclusivas', 'Jantar com chefs', 'Vinhos premium', 'Kit exclusivo']
            }
        ],
        status: 'active',
        featured: true,
        tags: ['gastronomia', 'vinho', 'chefs', 'degustação'],
        capacity: 400,
        sold: 260,
        rating: 4.6,
        reviewsCount: 67
    },
    {
        id: '5',
        title: 'Art Exhibition Opening',
        description: 'Abertura da exposição de arte contemporânea com obras de artistas emergentes e consagrados.',
        shortDescription: 'Exposição de arte contemporânea com artistas emergentes',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        date: '2024-03-28',
        time: '18:30',
        location: 'Galeria de Arte Moderna',
        address: 'Rua das Artes, 123 - Centro',
        city: 'São Paulo',
        category: 'Arts & Culture',
        categorySlug: 'arts-culture',
        organizer: 'Arte Contemporânea',
        organizerLogo: '/images/organizers/arte-contemporanea.png',
        price: {
            min: 0,
            max: 0,
            currency: 'BRL'
        },
        tickets: [
            {
                id: 't10',
                name: 'Entrada Gratuita',
                description: 'Acesso gratuito à exposição',
                price: 0,
                currency: 'BRL',
                quantity: 200,
                available: 150,
                type: 'general',
                benefits: ['Acesso à exposição', 'Catálogo digital', 'Coffee break']
            }
        ],
        status: 'active',
        featured: false,
        tags: ['arte', 'exposição', 'contemporânea', 'cultura'],
        capacity: 200,
        sold: 50,
        rating: 4.5,
        reviewsCount: 12
    }
];

export const featuredEvents = publicEvents.filter(event => event.featured);
export const upcomingEvents = publicEvents.filter(event => event.status === 'active');
