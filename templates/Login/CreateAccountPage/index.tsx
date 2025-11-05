"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useSystem } from "@/contexts/SystemContext";

const CreateAccountPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        country_id: '',
        state_id: '',
        preferred_language: 'pt-AO',
        role: 'buyer' as 'buyer' | 'organizer',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { countries, getStatesByCountry } = useSystem();
    const router = useRouter();

    const states = formData.country_id ? getStatesByCountry(Number(formData.country_id)) : [];

    const languageOptions = [
        { id: 'pt-AO', name: 'Português (Angola)' },
        { id: 'pt-BR', name: 'Português (Brasil)' },
        { id: 'en', name: 'English' }
    ];

    const roleOptions = [
        { id: 'buyer', name: 'Comprador' },
        { id: 'organizer', name: 'Organizador' }
    ];

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name) newErrors.name = 'Nome é obrigatório';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
        }
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'As senhas não coincidem';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const result = await register({
            ...formData,
            country_id: Number(formData.country_id),
            state_id: Number(formData.state_id),
        });
        
        if (result.success) {
            router.push('/dashboard');
        } else {
            // Tratar erros da API
            if (typeof result.message === 'object') {
                setErrors(result.message);
            } else {
                setErrors({ general: result.message });
            }
        }
        
        setLoading(false);
    };

    return (
        <Login
            title="Criar Nova Conta"
            description="Digite seus dados para se cadastrar"
            image="/images/icons/profile.svg"
        >
            {step === 1 && (
                <div>
                    <div className="flex flex-col gap-4 max-md:gap-3">
                        <div className="min-h-[3.5rem] max-md:min-h-[3rem]">
                            {errors.general && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                                    {errors.general}
                                </div>
                            )}
                        </div>
                        
                        <Field
                            label="Nome Completo"
                            placeholder="Digite seu nome"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            error={!!errors.name}
                            note={errors.name}
                            required
                        />
                        <Field
                            label="Endereço de Email"
                            placeholder="Digite seu email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            error={!!errors.email}
                            note={errors.email}
                            required
                        />
                        <Field
                            label="Senha"
                            placeholder="Digite sua senha"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            error={!!errors.password}
                            note={errors.password}
                            required
                        />
                        <Field
                            label="Confirmar Senha"
                            placeholder="Confirme sua senha"
                            type="password"
                            value={formData.password_confirmation}
                            onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                            error={!!errors.password_confirmation}
                            note={errors.password_confirmation}
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        className="w-full mt-8 max-md:mt-5"
                        isPrimary
                        onClick={handleNextStep}
                    >
                        Continuar
                    </Button>
                </div>
            )}
            
            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 max-md:gap-3">
                        <div className="min-h-[3.5rem] max-md:min-h-[3rem]">
                            {errors.general && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                                    {errors.general}
                                </div>
                            )}
                        </div>
                        
                        <Field
                            label="Telefone"
                            placeholder="Digite seu telefone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            error={!!errors.phone}
                            note={errors.phone}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="País"
                                value={countries.find(c => c.id === formData.country_id) || null}
                                onChange={(country) => setFormData(prev => ({ ...prev, country_id: country?.id || '', state_id: '' }))}
                                options={countries}
                                placeholder="Selecione o país"
                                error={!!errors.country_id}
                                note={errors.country_id}
                                required
                            />
                            
                            <Select
                                label="Estado/Província"
                                value={states.find(s => s.id === formData.state_id) || null}
                                onChange={(state) => setFormData(prev => ({ ...prev, state_id: state?.id || '' }))}
                                options={states}
                                placeholder="Selecione o estado"
                                error={!!errors.state_id}
                                note={errors.state_id}
                                required
                                disabled={!formData.country_id}
                            />
                        </div>
                        
                        <Select
                            label="Idioma preferido"
                            value={languageOptions.find(l => l.id === formData.preferred_language) || null}
                            onChange={(language) => setFormData(prev => ({ ...prev, preferred_language: language?.id || 'pt-AO' }))}
                            options={languageOptions}
                            placeholder="Selecione o idioma"
                            required
                        />
                        
                        <Select
                            label="Tipo de conta"
                            value={roleOptions.find(r => r.id === formData.role) || null}
                            onChange={(role) => setFormData(prev => ({ ...prev, role: role?.id as 'buyer' | 'organizer' || 'buyer' }))}
                            options={roleOptions}
                            placeholder="Selecione o tipo"
                            required
                        />
                    </div>
                    <div className="flex gap-3 mt-8">
                        <Button
                            type="button"
                            className="flex-1"
                            isWhite
                            onClick={() => setStep(1)}
                        >
                            Voltar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            isPrimary
                            disabled={loading}
                        >
                            {loading ? (
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
                                'Cadastrar'
                            )}
                        </Button>
                    </div>
                </form>
            )}
            
            <div className="mt-8 text-center text-body-lg text-gray-500 max-md:mt-5">
                Já tem uma conta?{" "}
                <Link
                    className="font-medium text-primary-400 transition-colors hover:text-primary-600"
                    href="/sign-in"
                >
                    Entrar
                </Link>
            </div>
        </Login>
    );
};

export default CreateAccountPage;
