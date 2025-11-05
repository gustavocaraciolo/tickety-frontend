"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openItems, setOpenItems] = useState<number[]>([]);

    const faqCategories = [
        {
            title: "Compra de Ingressos",
            icon: "cart",
            questions: [
                {
                    id: 1,
                    question: "Como comprar ingressos?",
                    answer: "É muito simples! Navegue pelos eventos, escolha os ingressos desejados, adicione ao carrinho e finalize a compra. Você receberá os ingressos por email."
                },
                {
                    id: 2,
                    question: "Posso cancelar minha compra?",
                    answer: "Sim, você pode cancelar sua compra até 24 horas antes do evento. O reembolso será processado em até 5 dias úteis."
                },
                {
                    id: 3,
                    question: "Quais formas de pagamento são aceitas?",
                    answer: "Aceitamos cartões de crédito, débito, PIX, boleto bancário e PayPal. Todas as transações são 100% seguras."
                }
            ]
        },
        {
            title: "Eventos",
            icon: "calendar",
            questions: [
                {
                    id: 4,
                    question: "Como recebo meus ingressos?",
                    answer: "Os ingressos são enviados por email imediatamente após a confirmação do pagamento. Você também pode acessá-los em sua conta."
                },
                {
                    id: 5,
                    question: "Posso transferir meus ingressos?",
                    answer: "Sim, você pode transferir seus ingressos para outra pessoa através da sua conta, até 2 horas antes do evento."
                },
                {
                    id: 6,
                    question: "O que acontece se o evento for cancelado?",
                    answer: "Em caso de cancelamento, você será reembolsado automaticamente em até 5 dias úteis. Também oferecemos a opção de troca por outro evento."
                }
            ]
        },
        {
            title: "Conta e Perfil",
            icon: "user",
            questions: [
                {
                    id: 7,
                    question: "Como criar uma conta?",
                    answer: "Clique em 'Criar Conta' no canto superior direito, preencha seus dados e confirme seu email. É gratuito e leva apenas alguns minutos."
                },
                {
                    id: 8,
                    question: "Esqueci minha senha, o que fazer?",
                    answer: "Clique em 'Esqueci minha senha' na página de login e siga as instruções enviadas por email para redefinir sua senha."
                },
                {
                    id: 9,
                    question: "Como atualizar meus dados?",
                    answer: "Acesse sua conta, vá em 'Configurações' e atualize suas informações. Lembre-se de salvar as alterações."
                }
            ]
        },
        {
            title: "Suporte",
            icon: "question",
            questions: [
                {
                    id: 10,
                    question: "Como entrar em contato com o suporte?",
                    answer: "Você pode nos contatar através do chat online, email (suporte@tickety.com) ou telefone (0800-123-4567). Estamos disponíveis 24/7."
                },
                {
                    id: 11,
                    question: "Qual o horário de atendimento?",
                    answer: "Nosso atendimento é 24 horas por dia, 7 dias por semana. Para questões urgentes, use o chat online."
                },
                {
                    id: 12,
                    question: "Como reportar um problema?",
                    answer: "Use o formulário de contato em nossa página de suporte ou envie um email para suporte@tickety.com com detalhes do problema."
                }
            ]
        }
    ];

    const toggleItem = (id: number) => {
        setOpenItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar perguntas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-11 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors bg-white"
                            />
                            <Icon name="search" className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-12">
                    {filteredCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-4 border border-gray-100">
                                    <Icon name={category.icon} className="w-5 h-5 text-gray-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {category.title}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {category.questions.map((item) => (
                                    <div key={item.id} className="border border-gray-100 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleItem(item.id)}
                                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-medium text-gray-900 pr-4">
                                                {item.question}
                                            </span>
                                            <svg 
                                                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                                                    openItems.includes(item.id) ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {openItems.includes(item.id) && (
                                            <div className="px-6 pb-4 border-t border-gray-100">
                                                <p className="pt-4 text-gray-600 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {searchQuery && filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <Icon name="search" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma pergunta encontrada
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Tente usar palavras-chave diferentes ou entre em contato conosco.
                        </p>
                        <Button 
                            isSecondary 
                            onClick={() => setSearchQuery("")}
                        >
                            Limpar Busca
                        </Button>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            Não encontrou o que procura?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Nossa equipe de suporte está pronta para ajudar você
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button isPrimary isLarge>
                                    Entrar em Contato
                                </Button>
                            </Link>
                            <Link href="/help">
                                <Button isSecondary isLarge>
                                    Central de Ajuda
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
