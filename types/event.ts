export interface PublicEvent {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    date: string;
    time: string;
    location: string;
    address: string;
    city: string;
    category: string;
    categorySlug: string;
    organizer: string;
    organizerLogo?: string;
    price: {
        min: number;
        max: number;
        currency: string;
    };
    tickets: TicketType[];
    status: 'active' | 'sold-out' | 'cancelled' | 'upcoming';
    featured: boolean;
    tags: string[];
    capacity: number;
    sold: number;
    rating?: number;
    reviewsCount?: number;
}

export interface TicketType {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    available: number;
    type: 'general' | 'vip' | 'early-bird' | 'group';
    benefits: string[];
    salesStart?: string;
    salesEnd?: string;
}

export interface EventCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    eventCount: number;
}

export interface EventFilter {
    category?: string;
    date?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    location?: string;
    search?: string;
}
