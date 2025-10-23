import { tableContent } from "@/templates/Events/CategoriesPage/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Link from "next/link";

const CategoriesPage = () => {
    const categories = tableContent.map(category => ({
        ...category,
        categoryName: getCategoryNamePT(category.slug),
        description: getCategoryDescription(category.slug),
        icon: getCategoryIcon(category.slug)
    }));

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
                    {categories.map((category) => (
                        <SimpleCard key={category.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                                    <Image
                                        src={`/images/icons/${category.icon}.png`}
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
                                        {category.eventsCount} eventos disponíveis
                                    </p>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {category.description}
                            </p>
                            
                            <Link href={`/shop/events?category=${category.slug}`}>
                                <Button 
                                    className="w-full group-hover:bg-primary-600 transition-colors" 
                                    isPrimary 
                                    isMedium
                                >
                                    Explorar Eventos
                                </Button>
                            </Link>
                        </SimpleCard>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <SimpleCard className="p-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Não encontrou o que procura?
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Explore todos os nossos eventos disponíveis ou entre em contato conosco para sugestões personalizadas
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop/events">
                                <Button isPrimary isLarge className="hover:scale-105 transition-transform">
                                    Ver Todos os Eventos
                                </Button>
                            </Link>
                            <Link href="/shop/contact">
                                <Button isSecondary isLarge className="hover:scale-105 transition-transform">
                                    Entrar em Contato
                                </Button>
                            </Link>
                        </div>
                    </SimpleCard>
                </div>
            </div>
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
        'family-kids': 'Família & Crianças'
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
        'family-kids': 'Eventos familiares, atividades infantis, brincadeiras educativas e entretenimento para todas as idades.'
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
        'family-kids': 'family'
    };
    return icons[slug] || 'calendar';
}

export default CategoriesPage;
