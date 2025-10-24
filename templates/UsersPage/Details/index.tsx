import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";

const roles = [
    { id: 0, name: "Administrador" },
    { id: 1, name: "Organizador" },
    { id: 2, name: "Participante" },
];

const Details = ({}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<SelectOption>(roles[0]);

    return (
        <div className="flex flex-col gap-4">
            <Field
                label="Nome"
                placeholder="Digite o nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Field
                label="Endereço de Email"
                placeholder="Digite o endereço de email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                label="Número de Telefone"
                placeholder="Digite o número de telefone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <Field
                label="Senha"
                placeholder="Digite a senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Select
                label="Função"
                className="min-w-14.5"
                value={role}
                onChange={setRole}
                options={roles}
                required
            />
        </div>
    );
};

export default Details;
