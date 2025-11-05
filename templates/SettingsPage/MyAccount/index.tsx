import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Item from "../Item";
import { SelectOption } from "@/types/select";
import { useAuth } from "@/contexts/AuthContext";
import { useSystem } from "@/contexts/SystemContext";
import apiClient from "@/lib/api";
import { maskPhone, unmaskPhone, isValidEmail } from "@/lib/utils/masks";

const MyAccount = ({}) => {
    const { user, refreshUser } = useAuth();
    const { countries, getStatesByCountry } = useSystem();
    
    const [fullName, setFullName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneMasked, setPhoneMasked] = useState("");
    const [country, setCountry] = useState<SelectOption | null>(null);
    const [state, setState] = useState<SelectOption | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Carregar dados iniciais do usuário
    useEffect(() => {
        if (user) {
            setFullName(user.name || "");
            setEmailAddress(user.email || "");
            setPhoneMasked(user.phone ? maskPhone(user.phone) : "");
            setPhoneNumber(user.phone || "");
            
            if (user.country) {
                setCountry({ id: user.country.id, name: user.country.name });
            }
            if (user.state) {
                setState({ id: user.state.id, name: user.state.name });
            }
        }
    }, [user]);

    // Filtrar estados baseado no país selecionado
    const availableStates = country
        ? getStatesByCountry(country.id).map((s) => ({ id: s.id, name: s.name }))
        : [];

    // Converter países para SelectOption
    const countryOptions = countries.map((c) => ({ id: c.id, name: c.name }));

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!fullName.trim()) {
            newErrors.name = "Nome completo é obrigatório";
        }

        if (!emailAddress.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!isValidEmail(emailAddress)) {
            newErrors.email = "Email inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const masked = maskPhone(value);
        const unmasked = unmaskPhone(value);
        
        setPhoneMasked(masked);
        setPhoneNumber(unmasked);
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});
        
        try {
            const response = await apiClient.updateProfile({
                name: fullName.trim(),
                email: emailAddress.trim(),
                phone: phoneNumber || undefined,
                country_id: country?.id,
                state_id: state?.id,
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
                title="Detalhes da Conta"
                description="Visualize e atualize os detalhes da sua conta, perfil e mais."
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <Field
                            label="Nome Completo"
                            placeholder="Digite o nome completo"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        {errors.name && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Endereço de Email"
                            placeholder="Digite o endereço de email"
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Número de Telefone (opcional)"
                            placeholder="(00) 00000-0000"
                            type="tel"
                            value={phoneMasked}
                            onChange={handlePhoneChange}
                            maxLength={15}
                        />
                        {errors.phone && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.phone}
                            </div>
                        )}
                    </div>
                    <div>
                        <Select
                            label="País"
                            value={country}
                            onChange={setCountry}
                            options={countryOptions}
                            placeholder="Selecione o país"
                        />
                        {errors.country_id && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.country_id}
                            </div>
                        )}
                    </div>
                    <div>
                        <Select
                            label="Estado/Província"
                            value={state}
                            onChange={setState}
                            options={availableStates}
                            placeholder={
                                country
                                    ? "Selecione o estado"
                                    : "Selecione o país primeiro"
                            }
                            required={false}
                        />
                        {errors.state_id && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.state_id}
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

export default MyAccount;
