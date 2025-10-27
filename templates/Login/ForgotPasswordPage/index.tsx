"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Button from "@/components/Button";
import apiClient from "@/lib/api";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await apiClient.request('/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            if (response.success) {
                setSuccess(true);
            } else {
                setError(response.message || 'Erro ao enviar email');
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao enviar email');
        }
        
        setLoading(false);
    };

    if (success) {
        return (
            <Login
                title="Email Enviado"
                description="Enviamos instruções para redefinir sua senha para o seu email."
                image="/images/icons/lock.svg"
            >
                <div className="text-center">
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md mb-4">
                        Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </div>
                    <Button
                        className="w-full"
                        isPrimary
                        as="link"
                        href="/sign-in"
                    >
                        Voltar ao Login
                    </Button>
                </div>
            </Login>
        );
    }

    return (
        <Login
            title="Esqueceu a Senha"
            description="Digite seu endereço de email e enviaremos instruções para redefinir sua senha."
            image="/images/icons/lock.svg"
        >
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}
                
                <Field
                    label="Endereço de Email"
                    placeholder="Digite seu email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    className="w-full mt-5"
                    isPrimary
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar Instruções'}
                </Button>
            </form>
            <div className="mt-8 text-center text-body-lg max-md:mt-5">
                <div className="text-gray-500">Não tem mais acesso?</div>
                <button className="font-medium text-primary-400 transition-colors hover:text-primary-600">
                    Tentar outro método
                </button>
            </div>
        </Login>
    );
};

export default ForgotPasswordPage;
