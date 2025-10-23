"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import Field from "@/components/Field";
import Button from "@/components/Button";
import CheckoutSteps from "@/components/CheckoutSteps";
import OrderSummary from "@/components/OrderSummary";
import { CustomerInfo, PaymentInfo } from "@/types/order";

const CheckoutPage = () => {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const [currentStep, setCurrentStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        document: '',
        birthDate: ''
    });
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        method: 'credit-card',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
        installments: 1
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const fees = totalPrice * 0.1; // 10% fee
    const total = totalPrice + fees;

    // Redirect to cart if empty (client-side only)
    useEffect(() => {
        if (items.length === 0) {
            router.push('/shop/cart');
        }
    }, [items.length, router]);

    // Show loading while redirecting
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecionando...</p>
                </div>
            </div>
        );
    }

    const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handlePaymentInfoChange = (field: keyof PaymentInfo, value: string | number) => {
        setPaymentInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            // Clear previous errors
            setErrors({});
            
            // Validate customer info
            const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
            const newErrors: {[key: string]: string} = {};
            
            requiredFields.forEach(field => {
                const value = customerInfo[field as keyof CustomerInfo];
                if (!value || value.trim() === '') {
                    newErrors[field] = 'Este campo é obrigatório';
                }
            });
            
            // Additional email validation
            if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
                newErrors.email = 'Por favor, insira um email válido';
            }
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return; // Don't advance if there are errors
            }
            
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Validate payment info
            if (paymentInfo.method === 'credit-card') {
                if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.cardExpiry || !paymentInfo.cardCvv) {
                    return; // Don't advance if payment fields are missing
                }
            }
            
            setCurrentStep(3);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleCompleteOrder = () => {
        // Simulate order completion
        const orderId = `ORD-${Date.now()}`;
        clearCart();
        router.push(`/shop/confirmation/${orderId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Finalizar Compra
                    </h1>
                    <p className="text-body-lg text-gray-600">
                        Complete suas informações para finalizar o pedido
                    </p>
                </div>

                {/* Checkout Steps */}
                <div className="mb-8">
                    <CheckoutSteps currentStep={currentStep} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6">
                            {/* Step 1: Customer Information */}
                            {currentStep === 1 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-body-xl font-semibold text-gray-900 mb-6">
                                        Informações Pessoais
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <Field
                                                label="Nome"
                                                required
                                                value={customerInfo.firstName}
                                                onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                                                error={!!errors.firstName}
                                            />
                                            {errors.firstName && (
                                                <p className="text-error-100 text-body-sm mt-1">{errors.firstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Field
                                                label="Sobrenome"
                                                required
                                                value={customerInfo.lastName}
                                                onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                                                error={!!errors.lastName}
                                            />
                                            {errors.lastName && (
                                                <p className="text-error-100 text-body-sm mt-1">{errors.lastName}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <Field
                                                label="Email"
                                                type="email"
                                                required
                                                value={customerInfo.email}
                                                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                                                error={!!errors.email}
                                            />
                                            {errors.email && (
                                                <p className="text-error-100 text-body-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Field
                                                label="Telefone"
                                                required
                                                value={customerInfo.phone}
                                                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                                                error={!!errors.phone}
                                            />
                                            {errors.phone && (
                                                <p className="text-error-100 text-body-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Field
                                            label="CPF"
                                            required
                                            value={customerInfo.document}
                                            onChange={(e) => handleCustomerInfoChange('document', e.target.value)}
                                        />
                                        <Field
                                            label="Data de Nascimento"
                                            type="date"
                                            value={customerInfo.birthDate}
                                            onChange={(e) => handleCustomerInfoChange('birthDate', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Information */}
                            {currentStep === 2 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-body-xl font-semibold text-gray-900 mb-6">
                                        Informações de Pagamento
                                    </h2>
                                    
                                    {/* Payment Method */}
                                    <div className="mb-6">
                                        <label className="block text-body-md font-medium text-gray-700 mb-3">
                                            Método de Pagamento
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <button
                                                onClick={() => handlePaymentInfoChange('method', 'credit-card')}
                                                className={`p-4 border rounded-xl text-center transition-colors ${
                                                    paymentInfo.method === 'credit-card'
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="w-8 h-8 bg-primary-500 rounded mx-auto mb-2"></div>
                                                <div className="text-body-sm font-medium">Cartão de Crédito</div>
                                            </button>
                                            <button
                                                onClick={() => handlePaymentInfoChange('method', 'pix')}
                                                className={`p-4 border rounded-xl text-center transition-colors ${
                                                    paymentInfo.method === 'pix'
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="w-8 h-8 bg-primary-500 rounded mx-auto mb-2"></div>
                                                <div className="text-body-sm font-medium">PIX</div>
                                            </button>
                                            <button
                                                onClick={() => handlePaymentInfoChange('method', 'bank-transfer')}
                                                className={`p-4 border rounded-xl text-center transition-colors ${
                                                    paymentInfo.method === 'bank-transfer'
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="w-8 h-8 bg-primary-500 rounded mx-auto mb-2"></div>
                                                <div className="text-body-sm font-medium">Transferência</div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Credit Card Form */}
                                    {paymentInfo.method === 'credit-card' && (
                                        <div className="space-y-4">
                                            <Field
                                                label="Número do Cartão"
                                                placeholder="0000 0000 0000 0000"
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                                            />
                                            <Field
                                                label="Nome no Cartão"
                                                value={paymentInfo.cardName}
                                                onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field
                                                    label="Validade"
                                                    placeholder="MM/AA"
                                                    value={paymentInfo.cardExpiry}
                                                    onChange={(e) => handlePaymentInfoChange('cardExpiry', e.target.value)}
                                                />
                                                <Field
                                                    label="CVV"
                                                    placeholder="000"
                                                    value={paymentInfo.cardCvv}
                                                    onChange={(e) => handlePaymentInfoChange('cardCvv', e.target.value)}
                                                />
                                            </div>
                                            <Field
                                                label="Parcelas"
                                                type="select"
                                                value={paymentInfo.installments}
                                                onChange={(e) => handlePaymentInfoChange('installments', parseInt(e.target.value))}
                                            >
                                                <option value={1}>1x sem juros</option>
                                                <option value={2}>2x sem juros</option>
                                                <option value={3}>3x sem juros</option>
                                                <option value={6}>6x com juros</option>
                                                <option value={12}>12x com juros</option>
                                            </Field>
                                        </div>
                                    )}

                                    {/* PIX Info */}
                                    {paymentInfo.method === 'pix' && (
                                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                            <div className="text-body-md text-primary-700">
                                                <strong>PIX:</strong> Você receberá o código PIX após confirmar o pedido.
                                            </div>
                                        </div>
                                    )}

                                    {/* Bank Transfer Info */}
                                    {paymentInfo.method === 'bank-transfer' && (
                                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                            <div className="text-body-md text-primary-700">
                                                <strong>Transferência:</strong> Você receberá os dados bancários após confirmar o pedido.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Confirmation */}
                            {currentStep === 3 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-body-xl font-semibold text-gray-900 mb-6">
                                        Confirmação do Pedido
                                    </h2>
                                    
                                    <div className="bg-success-50 border border-success-200 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-2 text-success-700">
                                            <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                                            </div>
                                            <span className="font-medium">Tudo pronto para finalizar!</span>
                                        </div>
                                        <p className="text-body-sm text-success-600 mt-2">
                                            Revise suas informações e clique em "Confirmar Pedido" para finalizar a compra.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-body-md font-semibold text-gray-900 mb-2">
                                                Informações Pessoais
                                            </h3>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-body-sm text-gray-700">
                                                    {customerInfo.firstName} {customerInfo.lastName}
                                                </div>
                                                <div className="text-body-sm text-gray-600">
                                                    {customerInfo.email} • {customerInfo.phone}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-body-md font-semibold text-gray-900 mb-2">
                                                Método de Pagamento
                                            </h3>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-body-sm text-gray-700">
                                                    {paymentInfo.method === 'credit-card' && 'Cartão de Crédito'}
                                                    {paymentInfo.method === 'pix' && 'PIX'}
                                                    {paymentInfo.method === 'bank-transfer' && 'Transferência Bancária'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                                {currentStep > 1 && (
                                    <Button
                                        isSecondary
                                        isLarge
                                        onClick={handlePreviousStep}
                                    >
                                        Voltar
                                    </Button>
                                )}
                                
                                <div className="ml-auto">
                                    {currentStep < 3 ? (
                                        <Button
                                            isPrimary
                                            isLarge
                                            onClick={handleNextStep}
                                        >
                                            Continuar
                                        </Button>
                                    ) : (
                                        <Button
                                            isPrimary
                                            isLarge
                                            onClick={handleCompleteOrder}
                                        >
                                            Confirmar Pedido
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            items={items}
                            subtotal={totalPrice}
                            fees={fees}
                            total={total}
                            showCheckoutButton={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
