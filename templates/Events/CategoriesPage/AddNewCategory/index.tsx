import { useState } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { SelectOption } from "@/types/select";

const statuses = [
    { id: 0, name: "Ativo" },
    { id: 1, name: "Inativo" },
];

const AddNewCategory = ({}) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [eventsCount, setEventsCount] = useState("");
    const [status, setStatus] = useState<SelectOption>(statuses[0]);

    return (
        <div className="flex flex-col gap-4">
            <Field
                label="Nome da Categoria"
                placeholder="Digite o nome da categoria"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Field
                label="Slug"
                placeholder="Digite o slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
            />
            <Field
                label="Contagem de Eventos"
                placeholder="Digite a contagem de eventos"
                type="number"
                value={eventsCount}
                onChange={(e) => setEventsCount(e.target.value)}
                required
            />
            <Select
                label="Status"
                value={status}
                onChange={setStatus}
                options={statuses}
                required
            />
        </div>
    );
};

export default AddNewCategory;
