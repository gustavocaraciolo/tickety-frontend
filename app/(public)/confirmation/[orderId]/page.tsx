"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const ConfirmationPage = () => {
    const params = useParams();
    const orderId = params.orderId as string;
    const [orderDetails, setOrderDetails] = useState({
        id: orderId,
        customerName: 'João Silva',
        email: 'joao@email.com',
        total: 299.00,
        items: [
            {
                eventTitle: 'Cultural Fusion Fest',
                eventDate: '2024-03-15',
                eventLocation: 'Parque Ibirapuera',
                ticketType: 'VIP Experience',
                quantity: 1,
                price: 299.00
            }
        ],
        createdAt: new Date().toISOString()
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return `R$ ${Number(price).toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon name="check" className="w-10 h-10 fill-success-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Pedido Confirmado!
                    </h1>
                    <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
                        Seu pedido foi processado com sucesso. Você receberá um email com os detalhes dos seus ingressos.
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-body-xl font-semibold text-gray-900">
                            Detalhes do Pedido
                        </h2>
                        <div className="text-body-sm text-gray-500">
                            Pedido #{orderDetails.id}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-body-md font-semibold text-gray-900 mb-3">
                                Informações do Cliente
                            </h3>
                            <div className="space-y-2">
                                <div className="text-body-sm text-gray-600">
                                    <strong>Nome:</strong> {orderDetails.customerName}
                                </div>
                                <div className="text-body-sm text-gray-600">
                                    <strong>Email:</strong> {orderDetails.email}
                                </div>
                                <div className="text-body-sm text-gray-600">
                                    <strong>Data do Pedido:</strong> {formatDate(orderDetails.createdAt)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-body-md font-semibold text-gray-900 mb-3">
                                Resumo do Pedido
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-body-sm">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="text-gray-900">{formatPrice(orderDetails.total * 0.9)}</span>
                                </div>
                                <div className="flex justify-between text-body-sm">
                                    <span className="text-gray-600">Taxas:</span>
                                    <span className="text-gray-900">{formatPrice(orderDetails.total * 0.1)}</span>
                                </div>
                                <div className="flex justify-between text-body-lg font-semibold pt-2 border-t border-gray-100">
                                    <span className="text-gray-900">Total:</span>
                                    <span className="text-gray-900">{formatPrice(orderDetails.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <h3 className="text-body-md font-semibold text-gray-900 mb-4">
                            Ingressos Adquiridos
                        </h3>
                        <div className="space-y-4">
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <Icon name="ticket" className="w-8 h-8 fill-primary-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-body-md font-semibold text-gray-900">
                                            {item.eventTitle}
                                        </h4>
                                        <div className="text-body-sm text-gray-600 mb-1">
                                            {formatDate(item.eventDate)} • {item.eventLocation}
                                        </div>
                                        <div className="text-body-sm text-gray-500">
                                            {item.ticketType} x{item.quantity}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-body-md font-semibold text-gray-900">
                                            {formatPrice(item.price)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-8">
                    <h3 className="text-body-lg font-semibold text-primary-900 mb-4">
                        Próximos Passos
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            </div>
                            <div>
                                <div className="text-body-md font-medium text-primary-900">
                                    Email de Confirmação
                                </div>
                                <div className="text-body-sm text-primary-700">
                                    Enviamos os detalhes do seu pedido para {orderDetails.email}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            </div>
                            <div>
                                <div className="text-body-md font-medium text-primary-900">
                                    Ingressos Digitais
                                </div>
                                <div className="text-body-sm text-primary-700">
                                    Seus ingressos serão enviados por email 24h antes do evento
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            </div>
                            <div>
                                <div className="text-body-md font-medium text-primary-900">
                                    Check-in no Evento
                                </div>
                                <div className="text-body-sm text-primary-700">
                                    Apresente o QR code do seu ingresso na entrada do evento
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/events">
                        <Button isPrimary isLarge>
                            Explorar Mais Eventos
                        </Button>
                    </Link>
                    <Button isSecondary isLarge>
                        Baixar Ingressos
                    </Button>
                </div>

                {/* Support */}
                <div className="text-center mt-12">
                    <p className="text-body-sm text-gray-500 mb-4">
                        Precisa de ajuda? Entre em contato conosco
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="mailto:suporte@tickety.com" className="text-body-sm text-primary-600 hover:text-primary-700">
                            suporte@tickety.com
                        </a>
                        <a href="tel:+5511999999999" className="text-body-sm text-primary-600 hover:text-primary-700">
                            (11) 99999-9999
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
