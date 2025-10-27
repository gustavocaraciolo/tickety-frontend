/**
 * Mapeamento de categorias para ícones da pasta Activities Blueprint
 * Usado em toda a aplicação para manter consistência visual
 */

export const categoryIcons: Record<string, string> = {
    // Categorias principais (inglês)
    'Music': '/images/icons/Activities Blueprint/Music and Entertainment _ electric guitar, music, rock and roll, music instrument, Vector illustration.png',
    'Technology': '/images/icons/Activities Blueprint/Security and Privacy _ security camera, surveillance, cctv, monitoring, vector illustration.png',
    'Art': '/images/icons/Activities Blueprint/Creative Design _ paint splatter, blue paint, messy painting, creative process.png',
    'Sports': '/images/icons/Activities Blueprint/Sports and Fitness _ soccer cleats, sports equipment, athletic shoes, footwear, Vector illustration.png',
    'Food': '/images/icons/Activities Blueprint/Food and Cuisine _ wine glass, celebration, party, drink, Vector illustration.png',
    'Business': '/images/icons/Activities Blueprint/Business and Finance _ dollar sign, currency, exchange, risk, investment.png',
    'Education': '/images/icons/Activities Blueprint/Education and training _ open book, literature, learning, knowledge, Vector illustration.png',
    'Health': '/images/icons/Activities Blueprint/Health and Wellness _ yoga, meditation, mindfulness, serenity, health.png',
    'Travel': '/images/icons/Activities Blueprint/Travel and Adventure _ beach umbrella, summer vacation, beach leisure, Vector illustration.png',
    'Gaming': '/images/icons/Activities Blueprint/Gaming Industry _ game controller, video games, gaming, joystick, Vector illustration.png',
    'Outdoor': '/images/icons/Activities Blueprint/Travel and Adventure _ hiking, mountain climbing, adventure, backpacking, Vector illustration.png',
    'Creative': '/images/icons/Activities Blueprint/Creative Design _ writing hand, pen, stylized, creativity, Vector illustration.png',
    'Relationships': '/images/icons/Activities Blueprint/Relationships _ tea set, love message, teapot, tea cup, romance.png',
    
    // Categorias em português (usado nos eventos)
    'Música': '/images/icons/Activities Blueprint/Music and Entertainment _ electric guitar, music, rock and roll, music instrument, Vector illustration.png',
    'Tecnologia': '/images/icons/Activities Blueprint/Security and Privacy _ security camera, surveillance, cctv, monitoring, vector illustration.png',
    'Arte': '/images/icons/Activities Blueprint/Creative Design _ paint splatter, blue paint, messy painting, creative process.png',
    'Esportes': '/images/icons/Activities Blueprint/Sports and Fitness _ soccer cleats, sports equipment, athletic shoes, footwear, Vector illustration.png',
    'Gastronomia': '/images/icons/Activities Blueprint/Food and Cuisine _ wine glass, celebration, party, drink, Vector illustration.png',
    'Negócios': '/images/icons/Activities Blueprint/Business and Finance _ dollar sign, currency, exchange, risk, investment.png',
    'Educação': '/images/icons/Activities Blueprint/Education and training _ open book, literature, learning, knowledge, Vector illustration.png',
    'Saúde': '/images/icons/Activities Blueprint/Health and Wellness _ yoga, meditation, mindfulness, serenity, health.png',
    'Viagem': '/images/icons/Activities Blueprint/Travel and Adventure _ beach umbrella, summer vacation, beach leisure, Vector illustration.png',
    'Ar Livre': '/images/icons/Activities Blueprint/Travel and Adventure _ hiking, mountain climbing, adventure, backpacking, Vector illustration.png',
    'Criativo': '/images/icons/Activities Blueprint/Creative Design _ writing hand, pen, stylized, creativity, Vector illustration.png',
    'Relacionamentos': '/images/icons/Activities Blueprint/Relationships _ tea set, love message, teapot, tea cup, romance.png',
    
    // Slugs das categorias (usado na página de categorias e API)
    'music': '/images/icons/Activities Blueprint/Music and Entertainment _ electric guitar, music, rock and roll, music instrument, Vector illustration.png',
    'technology': '/images/icons/Activities Blueprint/Security and Privacy _ security camera, surveillance, cctv, monitoring, vector illustration.png',
    'sports': '/images/icons/Activities Blueprint/Sports and Fitness _ soccer cleats, sports equipment, athletic shoes, footwear, Vector illustration.png',
    'business': '/images/icons/Activities Blueprint/Business and Finance _ dollar sign, currency, exchange, risk, investment.png',
    'education': '/images/icons/Activities Blueprint/Education and training _ open book, literature, learning, knowledge, Vector illustration.png',
    'arts': '/images/icons/Activities Blueprint/Creative Design _ paint splatter, blue paint, messy painting, creative process.png',
    'food': '/images/icons/Activities Blueprint/Food and Cuisine _ wine glass, celebration, party, drink, Vector illustration.png',
    'health': '/images/icons/Activities Blueprint/Health and Wellness _ yoga, meditation, mindfulness, serenity, health.png'
};

/**
 * Função para obter o ícone de uma categoria
 * @param category - Nome da categoria ou slug
 * @returns Caminho para o ícone da categoria
 */
export const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '/images/icons/Activities Blueprint/Search _ binoculars, magnification, vision, seeing, Vector illustration.png';
};

/**
 * Função para obter o ícone de uma categoria com fallback customizado
 * @param category - Nome da categoria ou slug
 * @param fallback - Ícone de fallback customizado
 * @returns Caminho para o ícone da categoria
 */
export const getCategoryIconWithFallback = (category: string, fallback: string): string => {
    return categoryIcons[category] || fallback;
};
