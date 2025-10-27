"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Link from "next/link";
import { getCategoryIcon } from "@/utils/categoryIcons";
import apiClient from "@/lib/api";
import CategoryCardSkeleton from "@/components/Skeleton/CategoryCardSkeleton";

interface Category {
    id: number;
    slug: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    events_count: number;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carregar categorias da API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await apiClient.getCategories();
                
                if (response.success) {
                    setCategories(response.data);
                } else {
                    setError('Erro ao carregar categorias');
                }
            } catch (err) {
                setError('Erro ao carregar categorias');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Transformar categorias para o formato esperado
    const transformedCategories = categories.map(category => ({
        id: category.id,
        slug: category.slug,
        categoryName: category.name,
        description: category.description,
        icon: getCategoryIcon(category.slug),
        eventCount: category.events_count || 0
    }));

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={["Home", "Categorias"]}
                    />

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Categorias de Eventos
                        </h1>
                        <p className="text-lg text-gray-600">
                            Explore eventos por categoria e encontre exatamente o que você procura
                        </p>
                    </div>

                    {/* Categories Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <CategoryCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Categorias"]}
                />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Categorias de Eventos
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore eventos por categoria e encontre exatamente o que você procura
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {transformedCategories.map((category) => (
                        <SimpleCard key={category.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                                    <Image
                                        src={category.icon}
                                        alt={category.categoryName}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                        {category.categoryName}
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
                                        isPrimary 
                                        className="w-full group-hover:bg-primary-600 transition-colors"
                                    >
                                        Explorar Eventos
                                    </Button>
                                </Link>
                            </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;