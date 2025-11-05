import { useState, useEffect } from "react";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { SelectOption } from "@/types/select";
import Item from "../Item";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";

const languages = [
    { id: 0, name: "Português (pt-AO)", value: "pt-AO" },
    { id: 1, name: "Português (pt-BR)", value: "pt-BR" },
    { id: 2, name: "English (United States)", value: "en" },
    { id: 3, name: "Español (México)", value: "es" },
    { id: 4, name: "Français (Canada)", value: "fr" },
];

const TimeAndLanguage = ({}) => {
    const { user, refreshUser } = useAuth();
    const [language, setLanguage] = useState<SelectOption | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Carregar dados iniciais do usuário
    useEffect(() => {
        if (user?.preferred_language) {
            const langOption = languages.find(
                (l) => l.value === user.preferred_language
            );
            if (langOption) {
                setLanguage({ id: langOption.id, name: langOption.name });
            }
        }
    }, [user]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!language) {
            newErrors.preferred_language = "Idioma é obrigatório";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const langOption = languages.find((l) => l.id === language!.id);
            if (!langOption) {
                setErrors({ submit: "Idioma inválido" });
                return;
            }

            const response = await apiClient.updateLanguage({
                preferred_language: langOption.value,
            });

            if (response.success) {
                await refreshUser();
                // TODO: Mostrar mensagem de sucesso
            } else {
                if (response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({ submit: response.message || "Erro ao salvar" });
                }
            }
        } catch (error: any) {
            setErrors({ submit: error.message || "Erro ao salvar" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Item
                title="Definir seu idioma"
                description="Escolha o idioma. Todo o texto e comunicação serão exibidos no idioma que você selecionar."
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <Select
                            label="Idioma"
                            value={language}
                            onChange={setLanguage}
                            options={languages.map((l) => ({
                                id: l.id,
                                name: l.name,
                            }))}
                            placeholder="Selecione o idioma"
                        />
                        {errors.preferred_language && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.preferred_language}
                            </div>
                        )}
                    </div>
                    {errors.submit && (
                        <div className="text-body-sm text-error-100">
                            {errors.submit}
                        </div>
                    )}
                </div>
            </Item>
            <div className="flex justify-end gap-3 px-6 pb-6">
                <Button
                    isPrimary
                    isMedium
                    onClick={handleSave}
                    isLoading={isLoading}
                >
                    Salvar
                </Button>
            </div>
        </div>
    );
};

export default TimeAndLanguage;
