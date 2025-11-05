import { useState } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Item from "../Item";
import apiClient from "@/lib/api";

const Password = ({}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!currentPassword) {
            newErrors.current_password = "Senha atual é obrigatória";
        }

        if (!newPassword) {
            newErrors.new_password = "Nova senha é obrigatória";
        } else if (newPassword.length < 8) {
            newErrors.new_password = "Senha deve ter pelo menos 8 caracteres";
        }

        if (!confirmPassword) {
            newErrors.new_password_confirmation = "Confirmação de senha é obrigatória";
        } else if (newPassword !== confirmPassword) {
            newErrors.new_password_confirmation = "Senhas não coincidem";
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
            const response = await apiClient.updatePassword({
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            });

            if (response.success) {
                // Limpar campos após sucesso
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
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
            <Item title="Senha" description="Altere ou visualize sua senha">
                <div className="flex flex-col gap-4">
                    <div>
                        <Field
                            label="Senha Atual"
                            placeholder="Digite a senha atual"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        {errors.current_password && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.current_password}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Nova Senha"
                            placeholder="Digite a nova senha"
                            note="Deve ter pelo menos 8 caracteres"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {errors.new_password && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.new_password}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Confirmar Nova Senha"
                            placeholder="Digite novamente a nova senha"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.new_password_confirmation && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.new_password_confirmation}
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

export default Password;
