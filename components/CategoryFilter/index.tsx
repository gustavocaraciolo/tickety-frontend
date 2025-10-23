"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { EventCategory } from "@/types/event";

type CategoryFilterProps = {
    categories: EventCategory[];
    selectedCategory?: string;
    onCategoryChange: (categorySlug: string | null) => void;
    className?: string;
};

const CategoryFilter = ({ 
    categories, 
    selectedCategory, 
    onCategoryChange, 
    className 
}: CategoryFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategorySelect = (categorySlug: string | null) => {
        onCategoryChange(categorySlug);
        setIsOpen(false);
    };

    const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);

    return (
        <div className={`relative ${className || ""}`}>
            <Button
                isSecondary
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between"
            >
                <span>
                    {selectedCategoryData ? selectedCategoryData.name : 'Todas as Categorias'}
                </span>
                <Icon 
                    name={isOpen ? "chevron-up" : "chevron-down"} 
                    className="w-4 h-4" 
                />
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
                        <div className="p-2">
                            <button
                                onClick={() => handleCategorySelect(null)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-body-md transition-colors ${
                                    !selectedCategory 
                                        ? 'bg-primary-50 text-primary-600' 
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Todas as Categorias
                            </button>
                            
                            {categories.map((category) => (
                                <button
                                    key={category.slug}
                                    onClick={() => handleCategorySelect(category.slug)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-body-md transition-colors flex items-center gap-3 ${
                                        selectedCategory === category.slug 
                                            ? 'bg-primary-50 text-primary-600' 
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div 
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                    />
                                    <span>{category.name}</span>
                                    <span className="ml-auto text-body-sm text-gray-500">
                                        ({category.eventCount})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryFilter;
