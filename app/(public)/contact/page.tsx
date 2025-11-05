"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Field from "@/components/Field";

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
            icon: "phone",
            title: "Telefone",
            value: "0800-123-4567",
            description: "Segunda a sexta, 8h às 18h"
        },
        {
            icon: "clock",
            title: "Chat Online",
            value: "Disponível 24/7",
            description: "Atendimento instantâneo"
        },
        {
            icon: "map-pin",
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
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/shop" },
                            { label: "Contato", href: "/shop/contact" }
                        ]}
                    />

                    <div className="text-center">
                        <SimpleCard className="p-12 max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon name="check" className="w-8 h-8 text-success-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Mensagem Enviada!
                            </h1>
                            <p className="text-body-lg text-gray-600 mb-8">
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
                                <Button 
                                    isSecondary 
                                    isLarge
                                    onClick={() => window.location.href = "/shop"}
                                >
                                    Voltar ao Início
                                </Button>
                            </div>
                        </SimpleCard>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Contato"]}
                />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Entre em Contato
                    </h1>
                    <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                        Estamos aqui para ajudar! Entre em contato conosco através do formulário
                        abaixo ou use uma de nossas outras formas de contato.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <SimpleCard className="p-8 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                                    type="select"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: "", label: "Selecione um assunto" },
                                        { value: "suporte", label: "Suporte Técnico" },
                                        { value: "vendas", label: "Vendas e Parcerias" },
                                        { value: "eventos", label: "Dúvidas sobre Eventos" },
                                        { value: "conta", label: "Problemas com Conta" },
                                        { value: "outros", label: "Outros" }
                                    ]}
                                />

                                <Field
                                    label="Mensagem"
                                    name="message"
                                    type="textarea"
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
                                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                                </Button>
                            </form>
                        </SimpleCard>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Outras Formas de Contato
                            </h2>
                            
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <SimpleCard key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                                                <Icon name={info.icon} className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                                    {info.title}
                                                </h3>
                                                <p className="text-gray-900 font-medium mb-1">
                                                    {info.value}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    </SimpleCard>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <SimpleCard className="p-6 bg-primary-50 border-primary-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                            <div className="flex items-center mb-4">
                                <Icon name="help-circle" className="w-6 h-6 text-primary-600 mr-3 group-hover:text-primary-700 transition-colors" />
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                    Perguntas Frequentes
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Muitas dúvidas já têm resposta em nossa seção de FAQ.
                            </p>
                            <Button
                                isPrimary
                                isMedium
                                onClick={() => window.location.href = "/shop/faq"}
                            >
                                Ver FAQ
                            </Button>
                        </SimpleCard>

                        {/* Social Media */}
                        <SimpleCard className="p-6 hover:shadow-lg transition-all duration-300 group">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 group-hover:text-primary-600 transition-colors">
                                Siga-nos nas Redes Sociais
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <Button
                                    isSecondary
                                    isMedium
                                    className="w-full hover:bg-primary-600 hover:text-white hover:border-primary-600"
                                >
                                    <Icon name="facebook" className="w-5 h-5 mr-2" />
                                    Facebook
                                </Button>
                                <Button
                                    isSecondary
                                    isMedium
                                    className="w-full hover:bg-primary-600 hover:text-white hover:border-primary-600"
                                >
                                    <Icon name="twitter" className="w-5 h-5 mr-2" />
                                    Twitter
                                </Button>
                                <Button
                                    isSecondary
                                    isMedium
                                    className="w-full hover:bg-primary-600 hover:text-white hover:border-primary-600"
                                >
                                    <Icon name="instagram" className="w-5 h-5 mr-2" />
                                    Instagram
                                </Button>
                            </div>
                        </SimpleCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
