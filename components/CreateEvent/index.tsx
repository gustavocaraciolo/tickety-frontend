import { useState } from "react";
import UploadImage from "@/components/UploadImage";
import Field from "@/components/Field";

const CreateEvent = ({}) => {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const handleChange = (file: File) => {
        setImages([...images, file]);
    };

    return (
        <div className="flex flex-col gap-4">
            <UploadImage label="Miniatura" onChange={handleChange} required />
            <Field
                label="Título"
                placeholder="Digite o título"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Field
                label="Descrição"
                placeholder="Digite a descrição"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                textarea
            />
            <Field
                label="Local"
                placeholder="Digite o local"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <Field
                label="Data"
                placeholder="Digite a data"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
        </div>
    );
};

export default CreateEvent;
