import { useState } from "react";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";
import Item from "../Item";

const timeZones = [
    { id: 0, name: "Pacific Standard Time (PST)" },
    { id: 1, name: "Eastern Standard Time (EST)" },
    { id: 2, name: "Central Standard Time (CST)" },
];

const languages = [
    { id: 0, name: "Português (Brasil)" },
    { id: 1, name: "English (United States)" },
    { id: 2, name: "Español (México)" },
];

const TimeAndLanguage = ({}) => {
    const [timeZone, setTimeZone] = useState<SelectOption>(timeZones[0]);
    const [language, setLanguage] = useState<SelectOption>(languages[0]);

    return (
        <>
            <Item
                title="Hora"
                description="Defina seu fuso horário preferido para garantir que todas as atividades se alinhem com sua hora local."
            >
                <Select
                    label="Fuso Horário"
                    note="A hora atual é 15:45."
                    value={timeZone}
                    onChange={setTimeZone}
                    options={timeZones}
                />
            </Item>
            <Item
                title="Definir seu idioma"
                description="Escolha o idioma. Todo o texto e comunicação serão exibidos no idioma que você selecionar."
            >
                <Select
                    label="Idioma"
                    value={language}
                    onChange={setLanguage}
                    options={languages}
                />
            </Item>
        </>
    );
};

export default TimeAndLanguage;
