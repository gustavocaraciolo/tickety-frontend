import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";
import Item from "../Item";
import Table from "./Table";

const countries = [
    { id: 0, name: "United States" },
    { id: 1, name: "Germany" },
    { id: 2, name: "United Kingdom" },
];

const TaxAndDuties = ({}) => {
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState<SelectOption>(countries[0]);
    const [permanentResidence, setPermanentResidence] = useState("");
    const [mailingAddress, setMailingAddress] = useState("");

    return (
        <>
            <Item
                title="Impostos e taxas"
                description="Revise os impostos e taxas associados às suas compras e assinaturas."
            >
                <Table />
            </Item>
            <Item
                title="Impostos da revisão"
                description="Gerencie onde você coleta impostos e taxas. Consulte um especialista em impostos se não tiver certeza de onde tem uma obrigação fiscal."
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
                    <Select
                        label="País do Tratado"
                        value={country}
                        onChange={setCountry}
                        options={countries}
                        required
                    />
                    <Field
                        label="Residência Permanente"
                        placeholder="Digite a residência"
                        type="text"
                        value={permanentResidence}
                        onChange={(e) => setPermanentResidence(e.target.value)}
                        required
                    />
                    <Field
                        label="Endereço de Correspondência"
                        placeholder="Digite o endereço"
                        type="email"
                        value={mailingAddress}
                        onChange={(e) => setMailingAddress(e.target.value)}
                        required
                    />
                </div>
            </Item>
        </>
    );
};

export default TaxAndDuties;
