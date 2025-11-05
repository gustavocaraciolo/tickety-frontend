"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { PublicEvent } from "@/types/event";
import { getCategoryIcon } from "@/utils/categoryIcons";

interface ElegantCarouselProps {
    events: PublicEvent[];
    className?: string;
}

const ElegantCarousel = ({ events, className }: ElegantCarouselProps) => {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === events.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, events.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1);
        setIsAutoPlaying(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatPrice = (min: number, max: number, currency?: string) => {
        const currencySymbol = currency || 'Kz';
        if (min === max) {
            return `${currencySymbol} ${Number(min).toFixed(2)}`;
        }
        return `${currencySymbol} ${Number(min).toFixed(2)} - ${currencySymbol} ${Number(max).toFixed(2)}`;
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

    if (!events.length) return null;

    const currentEvent = events[currentIndex];

    return (
        <div className={`relative w-full h-[70vh] min-h-[500px] overflow-hidden ${className || ""}`}>
            {/* Main Image */}
            <div className="relative w-full h-full">
                <Image
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    fill
                    className="object-cover transition-all duration-1000 ease-out"
                    priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-8 md:p-12">
                        <div className="max-w-4xl">
                            {/* Category Badge */}
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-body-sm font-medium">
                                    <Image
                                        src={getCategoryIcon(currentEvent.category)}
                                        alt={currentEvent.category}
                                        width={16}
                                        height={16}
                                        className="w-4 h-4 object-cover"
                                    />
                                    {currentEvent.category || currentEvent.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                {currentEvent.title}
                            </h1>

                            {/* Description */}
                            <p className="text-body-xl text-white/90 mb-6 max-w-2xl line-clamp-2">
                                {currentEvent.description}
                            </p>

                            {/* Event Details */}
                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                {/* Date */}
                                <div className="flex items-center gap-2 text-white">
                                    <Icon name="calendar" className="w-5 h-5 fill-white" />
                                    <span className="text-body-lg">
                                        {formatDate(currentEvent.date)} às {currentEvent.time}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-white">
                                    <Icon name="location" className="w-5 h-5 fill-white" />
                                    <span className="text-body-lg">
                                        {currentEvent.location}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2 text-white">
                                    <Icon name="dollar" className="w-5 h-5 fill-white" />
                                    <span className="text-body-lg font-semibold">
                                        {formatPrice(currentEvent.price.min, currentEvent.price.max, currentEvent.price.currency)}
                                    </span>
                                </div>
                            </div>

                            {/* Status and Action */}
                            <div className="flex items-center gap-4">
                                <span className={`status ${getStatusColor(currentEvent.status)}`}>
                                    {getStatusText(currentEvent.status)}
                                </span>
                                
                                <Button 
                                    isPrimary 
                                    isLarge
                                    disabled={currentEvent.status !== 'active'}
                                    className="px-8"
                                    onClick={() => {
                                        if (currentEvent.status === 'active') {
                                            router.push(`/events/${currentEvent.id}`);
                                        }
                                    }}
                                >
                                    {currentEvent.status === 'active' ? 'Comprar Ingressos' : getStatusText(currentEvent.status)}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                aria-label="Evento anterior"
            >
                <Icon name="chevron-left" className="w-6 h-6 fill-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                aria-label="Próximo evento"
            >
                <Icon name="chevron-right" className="w-6 h-6 fill-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {events.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Ir para evento ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                    aria-label={isAutoPlaying ? 'Pausar slideshow' : 'Iniciar slideshow'}
                >
                    <Icon 
                        name={isAutoPlaying ? "pause" : "play"} 
                        className="w-5 h-5 fill-white" 
                    />
                </button>
            </div>
        </div>
    );
};

export default ElegantCarousel;
