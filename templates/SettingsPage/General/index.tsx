import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";
import Item from "../Item";

const industries = [
    { id: 0, name: "Music" },
    { id: 1, name: "Technology" },
    { id: 2, name: "Sports" },
];

const currencies = [
    { id: 0, name: "US Dollar" },
    { id: 1, name: "EUR Euro" },
    { id: 2, name: "GBP Pound Sterling" },
];

const countries = [
    { id: 0, name: "United States" },
    { id: 1, name: "Germany" },
    { id: 2, name: "United Kingdom" },
];

const General = ({}) => {
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState<SelectOption>(industries[0]);
    const [currency, setCurrency] = useState<SelectOption>(currencies[0]);
    const [addressName, setAddressName] = useState("");
    const [country, setCountry] = useState<SelectOption>(countries[0]);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");

    return (
        <>
            <Item
                title="Detalhes da Conta"
                description="Seus usuários usarão essas informações para entrar em contato com você."
            >
                <div className="flex flex-col gap-4">
                    <Field
                        label="Nome da Empresa"
                        placeholder="Digite o nome da empresa"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                    <Select
                        label="Método de Pagamento"
                        value={industry}
                        onChange={setIndustry}
                        options={industries}
                        required
                    />
                    <Select
                        label="Moeda"
                        value={currency}
                        onChange={setCurrency}
                        options={currencies}
                        required
                    />
                </div>
            </Item>
            <Item
                title="Endereço"
                description="Este endereço aparecerá na sua fatura."
            >
                <div className="flex flex-col gap-4">
                    <Field
                        label="Nome do Endereço"
                        placeholder="Digite o nome do endereço"
                        type="text"
                        value={addressName}
                        onChange={(e) => setAddressName(e.target.value)}
                        required
                    />
                    <Select
                        label="País ou Região"
                        value={country}
                        onChange={setCountry}
                        options={countries}
                        required
                    />
                    <Field
                        label="Cidade"
                        placeholder="Digite a cidade"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <div className="flex gap-4 max-md:flex-col">
                        <Field
                            className="grow"
                            label="Endereço"
                            placeholder="Digite o endereço"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <Field
                            className="shrink-0 w-36 max-md:w-full"
                            label="Código Postal"
                            placeholder="Digite o código"
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </Item>
        </>
    );
};

export default General;
