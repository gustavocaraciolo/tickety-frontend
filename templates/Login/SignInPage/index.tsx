"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // Validação básica
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Email inválido' }));
            setLoading(false);
            return;
        }

        if (!password || password.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Senha deve ter no mínimo 6 caracteres' }));
            setLoading(false);
            return;
        }

        const result = await login(email, password);
        
        if (result.success) {
            router.push('/dashboard');
        } else {
            setErrors({ general: result.message || 'Falha no login' });
        }
        
        setLoading(false);
    };

    return (
        <Login
            title="Bem-vindo de Volta"
            description="Ficamos felizes em vê-lo novamente. Faça login em sua conta."
            image="/images/icons/profile.svg"
        >
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
                        label="Endereço de Email"
                        placeholder="Digite seu email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        note={errors.email}
                        required
                    />
                    <Field
                        label="Senha"
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        note={errors.password}
                        required
                    />
                    <div className="flex justify-between items-center">
                        <Checkbox
                            label="Manter-me logado"
                            checked={remember}
                            onChange={(value) => setRemember(value)}
                        />
                        <Link
                            className="text-body-md font-medium text-primary-400 transition-colors hover:text-primary-600"
                            href="/forgot-password"
                        >
                            Esqueceu a Senha?
                        </Link>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full mt-8 max-md:mt-5"
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
                        'Entrar'
                    )}
                </Button>
            </form>
            <div className="mt-8 text-center text-body-lg text-gray-500 max-md:mt-5">
                Não tem uma conta?{" "}
                <Link
                    className="font-medium text-primary-400 transition-colors hover:text-primary-600"
                    href="/create-account"
                >
                    Cadastrar
                </Link>
            </div>
        </Login>
    );
};

export default SignInPage;
