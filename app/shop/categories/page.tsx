import { tableContent } from "@/templates/Events/CategoriesPage/content";
import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const CategoriesPage = () => {
    const categories = tableContent.map(category => ({
        ...category,
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
                        <SimpleCard key={category.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <Icon name={category.icon} className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {category.categoryName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {category.eventsCount} eventos
                                    </p>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                                {category.description}
                            </p>
                            
                            <Link href={`/shop/events?category=${category.slug}`}>
                                <Button 
                                    className="w-full" 
                                    isPrimary 
                                    isMedium
                                >
                                    Ver Eventos
                                </Button>
                            </Link>
                        </SimpleCard>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <SimpleCard className="p-8 bg-blue-50 border-blue-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Não encontrou o que procura?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Explore todos os nossos eventos ou entre em contato conosco
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop/events">
                                <Button isPrimary isLarge>
                                    Ver Todos os Eventos
                                </Button>
                            </Link>
                            <Link href="/shop/contact">
                                <Button isSecondary isLarge>
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
function getCategoryDescription(slug: string): string {
    const descriptions: Record<string, string> = {
        'music': 'Concertos, festivais, shows e eventos musicais de todos os gêneros',
        'business-networking': 'Conferências, workshops, networking e eventos corporativos',
        'sports-fitness': 'Corridas, maratonas, competições esportivas e eventos fitness',
        'arts-culture': 'Exposições, teatro, dança, arte e eventos culturais',
        'technology': 'Conferências tech, hackathons, meetups e eventos de inovação',
        'food-drink': 'Degustações, festivais gastronômicos, wine tastings e eventos culinários',
        'education-workshops': 'Cursos, workshops, palestras e eventos educacionais',
        'health-wellness': 'Yoga, meditação, retiros e eventos de bem-estar',
        'charity-causes': 'Eventos beneficentes, campanhas e ações sociais',
        'family-kids': 'Eventos familiares, atividades infantis e entretenimento para todas as idades'
    };
    return descriptions[slug] || 'Eventos incríveis esperando por você';
}

function getCategoryIcon(slug: string): string {
    const icons: Record<string, string> = {
        'music': 'music',
        'business-networking': 'users',
        'sports-fitness': 'activity',
        'arts-culture': 'palette',
        'technology': 'cpu',
        'food-drink': 'coffee',
        'education-workshops': 'book-open',
        'health-wellness': 'heart',
        'charity-causes': 'gift',
        'family-kids': 'smile'
    };
    return icons[slug] || 'calendar';
}

export default CategoriesPage;
