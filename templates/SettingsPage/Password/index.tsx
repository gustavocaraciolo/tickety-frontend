import { useState } from "react";
import Field from "@/components/Field";
import Item from "../Item";

const Password = ({}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <Item title="Senha" description="Altere ou visualize sua senha">
            <div className="flex flex-col gap-4">
                <Field
                    label="Senha Atual"
                    placeholder="Digite a senha atual"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <Field
                    label="Nova Senha"
                    placeholder="Digite a nova senha"
                    note="Deve ter pelo menos 8 caracteres"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
        </Item>
    );
};

export default Password;
