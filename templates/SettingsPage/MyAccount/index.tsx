import { useState } from "react";
import Field from "@/components/Field";
import Item from "../Item";

const MyAccount = ({}) => {
    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <Item
            title="Detalhes da Conta"
            description="Visualize e atualize os detalhes da sua conta, perfil e mais."
        >
            <div className="flex flex-col gap-4">
                <Field
                    label="Nome Completo"
                    placeholder="Digite o nome completo"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <Field
                    label="Endereço de Email"
                    placeholder="Digite o endereço de email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                />
                <Field
                    label="Número de Telefone (opcional)"
                    placeholder="Digite o número de telefone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
        </Item>
    );
};

export default MyAccount;
