// Definição completa dos menus com roles
const allNavigation = [
    {
        title: "Home",
        items: [
            {
                title: "Dashboard",
                icon: "home",
                href: "/dashboard",
                roles: ["buyer", "organizer", "admin"], // Todos podem ver
            },
            {
                title: "Calendários",
                icon: "calendar",
                href: "/dashboard/calendars",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Promoções",
                icon: "sale",
                href: "/dashboard/promotions",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Pagamentos",
                icon: "bank",
                href: "/dashboard/payouts",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
        ],
    },
    {
        title: "Gerenciamento",
        items: [
            {
                title: "Usuários",
                icon: "user",
                href: "/dashboard/users",
                roles: ["admin"], // Apenas admin
            },
            {
                title: "Eventos",
                icon: "music",
                href: "/dashboard/events",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Ingressos",
                icon: "ticket",
                href: "/dashboard/tickets",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Meus Ingressos",
                icon: "ticket",
                href: "/dashboard/my-tickets",
                roles: ["buyer"], // Apenas compradores
            },
            {
                title: "Ganhos",
                icon: "coins",
                href: "/dashboard/earnings",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Avaliações",
                icon: "message",
                href: "/dashboard/reviews",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
        ],
    },
    {
        title: "Outros",
        items: [
            {
                title: "Relatórios",
                icon: "chart",
                href: "/dashboard/reports",
                roles: ["organizer", "admin"], // Apenas organizadores
            },
            {
                title: "Configurações",
                icon: "gear",
                href: "/dashboard/settings",
                roles: ["buyer", "organizer", "admin"], // Todos podem ver
            },
        ],
    },
];

// Função para filtrar menus baseado no role do usuário
export const getNavigationByRole = (userRole: 'buyer' | 'organizer' | 'admin' | null) => {
    if (!userRole) return [];

    return allNavigation.map(section => ({
        ...section,
        items: section.items.filter(item => 
            item.roles.includes(userRole)
        )
    })).filter(section => section.items.length > 0); // Remove seções vazias
};

// Exportar também a navegação completa para compatibilidade
export const navigation = allNavigation;
