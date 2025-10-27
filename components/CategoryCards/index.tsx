"use client";

import Link from "next/link";
import Image from "@/components/Image";
import { getCategoryIcon } from "@/utils/categoryIcons";

const categories = [
    {
        name: "Música",
        slug: "music",
        description: "Concertos, festivais e shows",
        icon: "music"
    },
    {
        name: "Tecnologia",
        slug: "technology", 
        description: "Conferências e workshops tech",
        icon: "technology"
    },
    {
        name: "Esportes",
        slug: "sports",
        description: "Eventos esportivos e fitness",
        icon: "sports"
    },
    {
        name: "Arte",
        slug: "arts",
        description: "Exposições e eventos culturais",
        icon: "art"
    },
    {
        name: "Gastronomia",
        slug: "food",
        description: "Festivais e degustações",
        icon: "food"
    },
    {
        name: "Negócios",
        slug: "business",
        description: "Conferências e networking",
        icon: "business"
    },
    {
        name: "Educação",
        slug: "education",
        description: "Workshops e cursos",
        icon: "education"
    },
    {
        name: "Saúde",
        slug: "health",
        description: "Bem-estar e wellness",
        icon: "health"
    }
];

const CategoryCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
                <Link
                    key={category.slug}
                    href={`/events?category=${category.slug}`}
                    className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer"
                >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Image
                            src={getCategoryIcon(category.icon)}
                            alt={category.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover"
                        />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                    </p>
                    <div className="mt-auto">
                        <span className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium group-hover:bg-primary-100 transition-colors">
                            Explorar Eventos
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryCards;

