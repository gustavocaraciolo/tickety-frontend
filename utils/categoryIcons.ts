/**
 * Mapeamento de categorias para ícones da pasta Activities Blueprint
 * Usado em toda a aplicação para manter consistência visual
 * 
 * NOTA: Os caminhos usam hífens em vez de espaços para compatibilidade com produção
 */

/**
 * Função helper para normalizar caminhos de imagens (remover espaços e caracteres problemáticos)
 */
const normalizeImagePath = (path: string): string => {
    return path
        .replace(/\s+/g, '-')
        .replace(/,/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .toLowerCase();
};

export const categoryIcons: Record<string, string> = {
    // Categorias principais (inglês)
    'Music': '/images/icons/activities-blueprint/music-and-entertainment-electric-guitar-music-rock-and-roll-music-instrument-vector-illustration.png',
    'Technology': '/images/icons/activities-blueprint/security-and-privacy-security-camera-surveillance-cctv-monitoring-vector-illustration.png',
    'Art': '/images/icons/activities-blueprint/creative-design-paint-splatter-blue-paint-messy-painting-creative-process.png',
    'Sports': '/images/icons/activities-blueprint/sports-and-fitness-soccer-cleats-sports-equipment-athletic-shoes-footwear-vector-illustration.png',
    'Food': '/images/icons/activities-blueprint/food-and-cuisine-wine-glass-celebration-party-drink-vector-illustration.png',
    'Business': '/images/icons/activities-blueprint/business-and-finance-dollar-sign-currency-exchange-risk-investment.png',
    'Education': '/images/icons/activities-blueprint/education-and-training-open-book-literature-learning-knowledge-vector-illustration.png',
    'Health': '/images/icons/activities-blueprint/health-and-wellness-yoga-meditation-mindfulness-serenity-health.png',
    'Travel': '/images/icons/activities-blueprint/travel-and-adventure-beach-umbrella-summer-vacation-beach-leisure-vector-illustration.png',
    'Gaming': '/images/icons/activities-blueprint/gaming-industry-game-controller-video-games-gaming-joystick-vector-illustration.png',
    'Outdoor': '/images/icons/activities-blueprint/travel-and-adventure-hiking-mountain-climbing-adventure-backpacking-vector-illustration.png',
    'Creative': '/images/icons/activities-blueprint/creative-design-writing-hand-pen-stylized-creativity-vector-illustration.png',
    'Relationships': '/images/icons/activities-blueprint/relationships-tea-set-love-message-teapot-tea-cup-romance.png',
    
    // Categorias em português (usado nos eventos)
    'Música': '/images/icons/activities-blueprint/music-and-entertainment-electric-guitar-music-rock-and-roll-music-instrument-vector-illustration.png',
    'Tecnologia': '/images/icons/activities-blueprint/security-and-privacy-security-camera-surveillance-cctv-monitoring-vector-illustration.png',
    'Arte': '/images/icons/activities-blueprint/creative-design-paint-splatter-blue-paint-messy-painting-creative-process.png',
    'Esportes': '/images/icons/activities-blueprint/sports-and-fitness-soccer-cleats-sports-equipment-athletic-shoes-footwear-vector-illustration.png',
    'Gastronomia': '/images/icons/activities-blueprint/food-and-cuisine-wine-glass-celebration-party-drink-vector-illustration.png',
    'Negócios': '/images/icons/activities-blueprint/business-and-finance-dollar-sign-currency-exchange-risk-investment.png',
    'Educação': '/images/icons/activities-blueprint/education-and-training-open-book-literature-learning-knowledge-vector-illustration.png',
    'Saúde': '/images/icons/activities-blueprint/health-and-wellness-yoga-meditation-mindfulness-serenity-health.png',
    'Viagem': '/images/icons/activities-blueprint/travel-and-adventure-beach-umbrella-summer-vacation-beach-leisure-vector-illustration.png',
    'Ar Livre': '/images/icons/activities-blueprint/travel-and-adventure-hiking-mountain-climbing-adventure-backpacking-vector-illustration.png',
    'Criativo': '/images/icons/activities-blueprint/creative-design-writing-hand-pen-stylized-creativity-vector-illustration.png',
    'Relacionamentos': '/images/icons/activities-blueprint/relationships-tea-set-love-message-teapot-tea-cup-romance.png',
    
    // Slugs das categorias (usado na página de categorias e API)
    'music': '/images/icons/activities-blueprint/music-and-entertainment-electric-guitar-music-rock-and-roll-music-instrument-vector-illustration.png',
    'technology': '/images/icons/activities-blueprint/security-and-privacy-security-camera-surveillance-cctv-monitoring-vector-illustration.png',
    'sports': '/images/icons/activities-blueprint/sports-and-fitness-soccer-cleats-sports-equipment-athletic-shoes-footwear-vector-illustration.png',
    'business': '/images/icons/activities-blueprint/business-and-finance-dollar-sign-currency-exchange-risk-investment.png',
    'education': '/images/icons/activities-blueprint/education-and-training-open-book-literature-learning-knowledge-vector-illustration.png',
    'arts': '/images/icons/activities-blueprint/creative-design-paint-splatter-blue-paint-messy-painting-creative-process.png',
    'food': '/images/icons/activities-blueprint/food-and-cuisine-wine-glass-celebration-party-drink-vector-illustration.png',
    'health': '/images/icons/activities-blueprint/health-and-wellness-yoga-meditation-mindfulness-serenity-health.png'
};

/**
 * Função para obter o ícone de uma categoria
 * @param category - Nome da categoria ou slug
 * @returns Caminho para o ícone da categoria
 */
export const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '/images/icons/activities-blueprint/search-binoculars-magnification-vision-seeing-vector-illustration.png';
};

/**
 * Função para obter o ícone de uma categoria com fallback customizado
 * @param category - Nome da categoria ou slug
 * @param fallback - Ícone de fallback customizado
 * @returns Caminho para o ícone da categoria
 */
export const getCategoryIconWithFallback = (category: string, fallback: string): string => {
    return categoryIcons[category] || normalizeImagePath(fallback);
};
