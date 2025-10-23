"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const helpCategories = [
        {
            icon: "shopping-cart",
            title: "Comprando Ingressos",
            description: "Aprenda como navegar, comprar e gerenciar seus ingressos",
            articles: [
                "Como comprar ingressos",
                "Gerenciar minha conta",
                "Problemas com pagamento",
                "Transferir ingressos"
            ],
            color: "blue"
        },
        {
            icon: "calendar",
            title: "Eventos",
            description: "Tudo sobre eventos, datas e localizações",
            articles: [
                "Encontrar eventos",
                "Filtrar por categoria",
                "Informações do evento",
                "Cancelamentos"
            ],
            color: "green"
        },
        {
            icon: "credit-card",
            title: "Pagamentos",
            description: "Formas de pagamento e problemas financeiros",
            articles: [
                "Formas de pagamento aceitas",
                "Problemas com cartão",
                "Reembolsos",
                "Faturas e comprovantes"
            ],
            color: "purple"
        },
        {
            icon: "user",
            title: "Minha Conta",
            description: "Gerenciar perfil e configurações",
            articles: [
                "Criar conta",
                "Alterar senha",
                "Atualizar dados",
                "Excluir conta"
            ],
            color: "orange"
        },
        {
            icon: "smartphone",
            title: "App Mobile",
            description: "Usando o aplicativo Tickety",
            articles: [
                "Baixar o app",
                "Fazer login",
                "Notificações",
                "Sincronização"
            ],
            color: "pink"
        },
        {
            icon: "shield",
            title: "Segurança",
            description: "Proteção de dados e privacidade",
            articles: [
                "Privacidade dos dados",
                "Conta segura",
                "Denunciar problemas",
                "LGPD e direitos"
            ],
            color: "red"
        }
    ];

    const tutorials = [
        {
            title: "Primeiro Acesso - Guia Completo",
            description: "Aprenda a usar a plataforma desde o início",
            duration: "5 min",
            difficulty: "Iniciante",
            icon: "play-circle"
        },
        {
            title: "Como Comprar Ingressos",
            description: "Passo a passo para sua primeira compra",
            duration: "3 min",
            difficulty: "Iniciante",
            icon: "shopping-bag"
        },
        {
            title: "Gerenciando sua Conta",
            description: "Configure seu perfil e preferências",
            duration: "4 min",
            difficulty: "Intermediário",
            icon: "settings"
        },
        {
            title: "Troubleshooting Comum",
            description: "Resolva problemas frequentes",
            duration: "6 min",
            difficulty: "Avançado",
            icon: "tool"
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600",
            pink: "bg-pink-100 text-pink-600",
            red: "bg-red-100 text-red-600"
        };
        return colors[color] || "bg-gray-100 text-gray-600";
    };

    const filteredCategories = helpCategories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.articles.some(article => 
            article.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Central de Ajuda"]}
                />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Central de Ajuda
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Encontre respostas rápidas e tutoriais para usar nossa plataforma
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar ajuda..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Icon name="search" className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Acesso Rápido
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/shop/faq">
                            <SimpleCard className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center">
                                    <Icon name="help-circle" className="w-8 h-8 text-blue-600 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">FAQ</h3>
                                        <p className="text-sm text-gray-600">Perguntas frequentes</p>
                                    </div>
                                </div>
                            </SimpleCard>
                        </Link>
                        
                        <Link href="/shop/contact">
                            <SimpleCard className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center">
                                    <Icon name="mail" className="w-8 h-8 text-green-600 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Contato</h3>
                                        <p className="text-sm text-gray-600">Fale conosco</p>
                                    </div>
                                </div>
                            </SimpleCard>
                        </Link>
                        
                        <Link href="/shop/events">
                            <SimpleCard className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center">
                                    <Icon name="calendar" className="w-8 h-8 text-purple-600 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Eventos</h3>
                                        <p className="text-sm text-gray-600">Explorar eventos</p>
                                    </div>
                                </div>
                            </SimpleCard>
                        </Link>
                    </div>
                </div>

                {/* Help Categories */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Categorias de Ajuda
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((category, index) => (
                            <SimpleCard key={index} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${getColorClasses(category.color)}`}>
                                        <Icon name={category.icon} className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    {category.articles.map((article, articleIndex) => (
                                        <div key={articleIndex} className="flex items-center text-sm text-gray-600">
                                            <Icon name="chevron-right" className="w-4 h-4 mr-2 text-gray-400" />
                                            {article}
                                        </div>
                                    ))}
                                </div>
                                
                                <Button 
                                    isSecondary 
                                    isMedium 
                                    className="w-full mt-4"
                                >
                                    Ver Artigos
                                </Button>
                            </SimpleCard>
                        ))}
                    </div>
                </div>

                {/* Tutorials */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Tutoriais em Destaque
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tutorials.map((tutorial, index) => (
                            <SimpleCard key={index} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center mb-4">
                                    <Icon name={tutorial.icon} className="w-8 h-8 text-blue-600 mr-3" />
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                                {tutorial.difficulty}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {tutorial.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {tutorial.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {tutorial.description}
                                </p>
                                
                                <Button isSecondary isSmall className="w-full">
                                    Assistir Tutorial
                                </Button>
                            </SimpleCard>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center">
                    <SimpleCard className="p-8 bg-blue-50 border-blue-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Ainda Precisa de Ajuda?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop/contact">
                                <Button isPrimary isLarge>
                                    Entrar em Contato
                                </Button>
                            </Link>
                            <Link href="/shop/faq">
                                <Button isSecondary isLarge>
                                    Ver FAQ Completo
                                </Button>
                            </Link>
                        </div>
                    </SimpleCard>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
