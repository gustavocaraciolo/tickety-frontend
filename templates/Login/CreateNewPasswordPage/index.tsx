"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Field from "@/components/Field";
import Button from "@/components/Button";

const CreateNewPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    return (
        <Login
            title="Criar Nova Senha"
            description="Digite uma nova senha. Sua nova senha deve ser diferente da senha anterior."
            image="/images/icons/lock.svg"
        >
            <div className="flex flex-col gap-4 max-md:gap-3">
                <Field
                    label="Nova Senha"
                    placeholder="Digite a nova senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Field
                    label="Confirmar Nova Senha"
                    placeholder="Confirme a nova senha"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />
            </div>
            <Button
                className="w-full mt-8 max-md:mt-5"
                isPrimary
                as="link"
                href="/sign-in"
            >
                Redefinir Senha
            </Button>
        </Login>
    );
};

export default CreateNewPasswordPage;
