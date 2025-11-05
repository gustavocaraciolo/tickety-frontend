"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Link from "next/link";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: "mail",
            title: "Email",
            value: "contato@tickety.com",
            description: "Resposta em até 24 horas"
        },
        {
            icon: "headphone",
            title: "Telefone",
            value: "0800-123-4567",
            description: "Segunda a sexta, 8h às 18h"
        },
        {
            icon: "message",
            title: "Chat Online",
            value: "Disponível 24/7",
            description: "Atendimento instantâneo"
        },
        {
            icon: "location",
            title: "Endereço",
            value: "São Paulo, SP",
            description: "Brasil"
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="check" className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Mensagem Enviada!
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Obrigado pelo seu contato! Nossa equipe responderá em até 24 horas.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                isPrimary 
                                isLarge
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({ name: "", email: "", subject: "", message: "" });
                                }}
                            >
                                Enviar Nova Mensagem
                            </Button>
                            <Link href="/">
                                <Button isSecondary isLarge>
                                    Voltar ao Início
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Entre em Contato
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Estamos aqui para ajudar! Entre em contato conosco através do formulário 
                        abaixo ou use uma de nossas outras formas de contato.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Envie sua Mensagem
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Field
                                    label="Nome Completo"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Field
                                label="Assunto"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Ex: Dúvida sobre compra de ingressos"
                            />

                            <Field
                                label="Mensagem"
                                name="message"
                                textarea
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Descreva sua dúvida ou solicitação..."
                            />

                            <Button
                                type="submit"
                                isPrimary
                                isLarge
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Enviar Mensagem'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Outras Formas de Contato
                            </h2>
                            
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                                        <div className="mr-4 flex-shrink-0">
                                            <Icon name={info.icon} className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900 mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-gray-900 font-medium mb-1">
                                                {info.value}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center mb-3">
                                <Icon name="question" className="w-5 h-5 text-gray-600 mr-3" />
                                <h3 className="text-lg font-medium text-gray-900">
                                    Perguntas Frequentes
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm">
                                Muitas dúvidas já têm resposta em nossa seção de FAQ.
                            </p>
                            <Link href="/faq">
                                <Button isSecondary isMedium className="w-full sm:w-auto">
                                    Ver FAQ
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
