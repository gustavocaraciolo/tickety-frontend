"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Button from "@/components/Button";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    return (
        <Login
            title="Esqueceu a Senha"
            description="Digite seu endereço de email e enviaremos instruções para redefinir sua senha."
            image="/images/icons/lock.svg"
        >
            <Field
                label="Endereço de Email"
                placeholder="Digite seu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                className="w-full mt-5"
                isPrimary
                as="link"
                href="/create-new-password"
            >
                Esqueceu a Senha
            </Button>
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
