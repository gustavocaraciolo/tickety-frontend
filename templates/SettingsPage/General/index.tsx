import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Item from "../Item";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";
import { maskTaxId, isValidUrl } from "@/lib/utils/masks";

const General = ({}) => {
    const { user, refreshUser } = useAuth();
    
    const [companyName, setCompanyName] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [taxId, setTaxId] = useState("");
    const [taxIdMasked, setTaxIdMasked] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Verificar se o usuário é organizador ou admin
    if (!user || (user.role !== 'organizer' && user.role !== 'admin')) {
        return (
            <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                    <div className="text-h4 text-gray-900 mb-2">Acesso Restrito</div>
                    <div className="text-body-md text-gray-500">
                        Esta página é exclusiva para organizadores.
                    </div>
                </div>
            </div>
        );
    }

    // Carregar dados iniciais do organizador
    useEffect(() => {
        if (user?.organizer_profile) {
            const profile = user.organizer_profile;
            setCompanyName(profile.company_name || "");
            setBio(profile.bio || "");
            setWebsite(profile.website || "");
            
            if (profile.tax_id) {
                const masked = maskTaxId(profile.tax_id);
                setTaxIdMasked(masked);
                setTaxId(profile.tax_id);
            }

            if (profile.social_links) {
                setFacebook(profile.social_links.facebook || "");
                setInstagram(profile.social_links.instagram || "");
                setTwitter(profile.social_links.twitter || "");
                setLinkedin(profile.social_links.linkedin || "");
            }
        }
    }, [user]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (website && !isValidUrl(website)) {
            newErrors.website = "URL inválida";
        }

        if (facebook && !isValidUrl(facebook)) {
            newErrors.facebook = "URL inválida";
        }

        if (instagram && !isValidUrl(instagram)) {
            newErrors.instagram = "URL inválida";
        }

        if (twitter && !isValidUrl(twitter)) {
            newErrors.twitter = "URL inválida";
        }

        if (linkedin && !isValidUrl(linkedin)) {
            newErrors.linkedin = "URL inválida";
        }

        if (bio && bio.length > 500) {
            newErrors.bio = "Bio deve ter no máximo 500 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const masked = maskTaxId(value);
        const unmasked = value.replace(/\D/g, '');
        
        setTaxIdMasked(masked);
        setTaxId(unmasked);
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const socialLinks: any = {};
            if (facebook) socialLinks.facebook = facebook;
            if (instagram) socialLinks.instagram = instagram;
            if (twitter) socialLinks.twitter = twitter;
            if (linkedin) socialLinks.linkedin = linkedin;

            const response = await apiClient.updateOrganizerProfile({
                company_name: companyName || undefined,
                bio: bio || undefined,
                website: website || undefined,
                tax_id: taxId || undefined,
                social_links: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
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
                title="Informações da Empresa"
                description="Seus usuários usarão essas informações para entrar em contato com você."
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <Field
                            label="Nome da Empresa"
                            placeholder="Digite o nome da empresa"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                        {errors.company_name && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.company_name}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Bio/Sobre"
                            placeholder="Digite a bio ou descrição"
                            textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={500}
                        />
                        {errors.bio && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.bio}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Website"
                            placeholder="https://example.com"
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        {errors.website && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.website}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Tax ID (NIF/CNPJ/CPF)"
                            placeholder="Digite o Tax ID"
                            type="text"
                            value={taxIdMasked}
                            onChange={handleTaxIdChange}
                            maxLength={18}
                        />
                        {errors.tax_id && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.tax_id}
                            </div>
                        )}
                    </div>
                </div>
            </Item>
            <Item
                title="Redes Sociais"
                description="Adicione seus links de redes sociais para ajudar os usuários a encontrá-lo."
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <Field
                            label="Facebook"
                            placeholder="https://facebook.com/yourpage"
                            type="url"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                        />
                        {errors.facebook && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.facebook}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Instagram"
                            placeholder="https://instagram.com/yourprofile"
                            type="url"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                        {errors.instagram && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.instagram}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="Twitter/X"
                            placeholder="https://twitter.com/yourprofile"
                            type="url"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                        {errors.twitter && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.twitter}
                            </div>
                        )}
                    </div>
                    <div>
                        <Field
                            label="LinkedIn"
                            placeholder="https://linkedin.com/company/yourcompany"
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                        />
                        {errors.linkedin && (
                            <div className="mt-1 text-body-sm text-error-100">
                                {errors.linkedin}
                            </div>
                        )}
                    </div>
                </div>
            </Item>
            {errors.submit && (
                <div className="px-6 text-body-sm text-error-100">
                    {errors.submit}
                </div>
            )}
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

export default General;
