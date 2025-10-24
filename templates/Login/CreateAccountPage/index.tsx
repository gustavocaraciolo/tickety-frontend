"use client";

import { useState } from "react";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Button from "@/components/Button";

const CreateAccountPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Login
            title="Criar Nova Conta"
            description="Digite seus dados para se cadastrar"
            image="/images/icons/profile.svg"
        >
            <div className="flex flex-col gap-4 max-md:gap-3">
                <Field
                    label="Nome Completo"
                    placeholder="Digite seu nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Field
                    label="Endereço de Email"
                    placeholder="Digite seu email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Field
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <Button
                className="w-full mt-8 max-md:mt-5"
                isPrimary
                as="link"
                href="/verification"
            >
                Cadastrar
            </Button>
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
