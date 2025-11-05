"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const helpCategories = [
        {
            icon: "cart",
            title: "Comprando Ingressos",
            description: "Aprenda como navegar, comprar e gerenciar seus ingressos",
            articles: [
                "Como comprar ingressos",
                "Gerenciar minha conta",
                "Problemas com pagamento",
                "Transferir ingressos"
            ]
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
            ]
        },
        {
            icon: "coins",
            title: "Pagamentos",
            description: "Formas de pagamento e problemas financeiros",
            articles: [
                "Formas de pagamento aceitas",
                "Problemas com cartão",
                "Reembolsos",
                "Faturas e comprovantes"
            ]
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
            ]
        },
        {
            icon: "lock",
            title: "Segurança",
            description: "Proteção de dados e privacidade",
            articles: [
                "Privacidade dos dados",
                "Conta segura",
                "Denunciar problemas",
                "LGPD e direitos"
            ]
        }
    ];

    const tutorials = [
        {
            title: "Primeiro Acesso - Guia Completo",
            description: "Aprenda a usar a plataforma desde o início",
            duration: "5 min",
            difficulty: "Iniciante"
        },
        {
            title: "Como Comprar Ingressos",
            description: "Passo a passo para sua primeira compra",
            duration: "3 min",
            difficulty: "Iniciante"
        },
        {
            title: "Gerenciando sua Conta",
            description: "Configure seu perfil e preferências",
            duration: "4 min",
            difficulty: "Intermediário"
        },
        {
            title: "Troubleshooting Comum",
            description: "Resolva problemas frequentes",
            duration: "6 min",
            difficulty: "Avançado"
        }
    ];

    const filteredCategories = helpCategories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.articles.some(article => 
            article.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Central de Ajuda
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
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
                                className="w-full px-4 py-3 pl-11 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white"
                            />
                            <Icon name="search" className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Acesso Rápido
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/faq">
                            <div className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <Icon name="question" className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">FAQ</h3>
                                        <p className="text-sm text-gray-500">Perguntas frequentes</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        
                        <Link href="/contact">
                            <div className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <Icon name="mail" className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Contato</h3>
                                        <p className="text-sm text-gray-500">Fale conosco</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        
                        <Link href="/events">
                            <div className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <Icon name="calendar" className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Eventos</h3>
                                        <p className="text-sm text-gray-500">Explorar eventos</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Help Categories */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Categorias de Ajuda
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((category, index) => (
                            <div key={index} className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors">
                                <div className="flex items-start mb-4">
                                    <div className="mr-4 flex-shrink-0">
                                        <Icon name={category.icon} className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mb-4">
                                    {category.articles.map((article, articleIndex) => (
                                        <div key={articleIndex} className="flex items-center text-sm text-gray-600">
                                            <span className="mr-2 text-gray-400">•</span>
                                            {article}
                                        </div>
                                    ))}
                                </div>
                                
                                <Button 
                                    isSecondary 
                                    isMedium 
                                    className="w-full"
                                >
                                    Ver Artigos
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tutorials */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Tutoriais em Destaque
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tutorials.map((tutorial, index) => (
                            <div key={index} className="p-6 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
                                            {tutorial.difficulty}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {tutorial.duration}
                                        </span>
                                    </div>
                                </div>
                                
                                <h3 className="font-medium text-gray-900 mb-2">
                                    {tutorial.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {tutorial.description}
                                </p>
                                
                                <Button isSecondary isSmall className="w-full">
                                    Assistir Tutorial
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="pt-8 border-t border-gray-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            Ainda Precisa de Ajuda?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button isPrimary isLarge>
                                    Entrar em Contato
                                </Button>
                            </Link>
                            <Link href="/faq">
                                <Button isSecondary isLarge>
                                    Ver FAQ Completo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
