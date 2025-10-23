import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { PublicEvent } from "@/types/event";

type EventCardProps = {
    event: PublicEvent;
    className?: string;
};

const EventCard = ({ event, className }: EventCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatPrice = (min: number, max: number, currency: string) => {
        if (min === max) {
            return `R$ ${min.toFixed(2)}`;
        }
        return `R$ ${min.toFixed(2)} - R$ ${max.toFixed(2)}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'status-green';
            case 'sold-out':
                return 'status-red';
            case 'cancelled':
                return 'status-red';
            case 'upcoming':
                return 'status-blue';
            default:
                return 'status-gray';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Disponível';
            case 'sold-out':
                return 'Esgotado';
            case 'cancelled':
                return 'Cancelado';
            case 'upcoming':
                return 'Em breve';
            default:
                return 'Indisponível';
        }
    };

    return (
        <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${className || ""}`}>
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                {event.featured && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-primary-500 text-white text-body-sm font-medium px-2 py-1 rounded-lg">
                            Destaque
                        </span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className={`status ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                    </span>
                </div>
            </div>

            {/* Event Content */}
            <div className="p-4">
                {/* Category */}
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="tag" className="w-4 h-4 fill-gray-400" />
                    <span className="text-body-sm text-gray-500">{event.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-body-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-gray-600 mb-4 line-clamp-2">
                    {event.shortDescription}
                </p>

                {/* Date and Location */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                        <Icon name="calendar" className="w-4 h-4 fill-gray-400" />
                        <span className="text-body-sm text-gray-600">
                            {formatDate(event.date)} às {event.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="location" className="w-4 h-4 fill-gray-400" />
                        <span className="text-body-sm text-gray-600 line-clamp-1">
                            {event.location}
                        </span>
                    </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-body-lg font-semibold text-gray-900">
                        {formatPrice(event.price.min, event.price.max, event.price.currency)}
                    </div>
                    {event.rating && (
                        <div className="flex items-center gap-1">
                            <Icon name="star" className="w-4 h-4 fill-warning-100" />
                            <span className="text-body-sm text-gray-600">
                                {event.rating} ({event.reviewsCount})
                            </span>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <Link href={`/shop/events/${event.id}`}>
                    <Button 
                        className="w-full" 
                        isPrimary 
                        isMedium
                        disabled={event.status !== 'active'}
                    >
                        {event.status === 'active' ? 'Ver Detalhes' : getStatusText(event.status)}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
