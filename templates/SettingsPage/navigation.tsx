type Role = 'buyer' | 'organizer' | 'admin';

export interface NavigationItem {
    id: number;
    title: string;
    roles: Role[];
}

export const allNavigation: NavigationItem[] = [
    {
        id: 0,
        title: "Geral",
        roles: ['organizer', 'admin'],
    },
    {
        id: 1,
        title: "Minha Conta",
        roles: ['buyer', 'organizer', 'admin'],
    },
    {
        id: 2,
        title: "Pagamento e Cobrança",
        roles: ['organizer', 'admin'],
    },
    {
        id: 3,
        title: "Impostos e Taxas",
        roles: ['organizer', 'admin'],
    },
    {
        id: 4,
        title: "Vincular Conta",
        roles: ['buyer', 'organizer', 'admin'],
    },
    {
        id: 5,
        title: "Hora e Idioma",
        roles: ['buyer', 'organizer', 'admin'],
    },
    {
        id: 6,
        title: "Senha",
        roles: ['buyer', 'organizer', 'admin'],
    },
    {
        id: 7,
        title: "Notificações",
        roles: ['buyer', 'organizer', 'admin'],
    },
];

export const getNavigationByRole = (role: Role | undefined): NavigationItem[] => {
    if (!role) return [];
    return allNavigation.filter((item) => item.roles.includes(role));
};
