import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Link from "next/link";

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Política de Privacidade"]}
                />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Política de Privacidade
                    </h1>
                    <p className="text-lg text-gray-600">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            1. Introdução
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            A Tickety ("nós", "nosso" ou "empresa") está comprometida em proteger sua 
                            privacidade e dados pessoais. Esta Política de Privacidade explica como 
                            coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Esta política está em conformidade com a Lei Geral de Proteção de Dados 
                            (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            2. Informações que Coletamos
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    2.1 Informações Fornecidas por Você
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Nome completo e dados de identificação</li>
                                    <li>Endereço de email e telefone</li>
                                    <li>Data de nascimento</li>
                                    <li>Informações de pagamento (processadas de forma segura)</li>
                                    <li>Preferências de eventos e interesses</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    2.2 Informações Coletadas Automaticamente
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Endereço IP e localização aproximada</li>
                                    <li>Dados de navegação e comportamento na plataforma</li>
                                    <li>Informações do dispositivo e navegador</li>
                                    <li>Cookies e tecnologias similares</li>
                                </ul>
                            </div>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            3. Como Usamos suas Informações
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.1 Finalidades Principais
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Processar e gerenciar suas compras de ingressos</li>
                                    <li>Fornecer suporte ao cliente</li>
                                    <li>Enviar confirmações e atualizações sobre eventos</li>
                                    <li>Melhorar nossos serviços e experiência do usuário</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.2 Finalidades Secundárias
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Enviar comunicações de marketing (com seu consentimento)</li>
                                    <li>Realizar análises e pesquisas de mercado</li>
                                    <li>Detectar e prevenir fraudes</li>
                                    <li>Cumprir obrigações legais</li>
                                </ul>
                            </div>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            4. Compartilhamento de Informações
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
                            terceiros, exceto nas seguintes situações:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Com organizadores de eventos (apenas informações necessárias)</li>
                            <li>Com prestadores de serviços que nos auxiliam (processadores de pagamento, etc.)</li>
                            <li>Quando exigido por lei ou autoridades competentes</li>
                            <li>Para proteger nossos direitos ou segurança</li>
                        </ul>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            5. Cookies e Tecnologias Similares
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                                na plataforma. Os cookies nos ajudam a:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Lembrar suas preferências</li>
                                <li>Analisar o tráfego e uso da plataforma</li>
                                <li>Personalizar conteúdo e anúncios</li>
                                <li>Garantir a segurança da plataforma</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Você pode gerenciar suas preferências de cookies através das configurações 
                                do seu navegador.
                            </p>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            6. Segurança dos Dados
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Implementamos medidas de segurança técnicas e organizacionais para proteger 
                            suas informações pessoais contra acesso não autorizado, alteração, divulgação 
                            ou destruição.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <strong>Medidas de Segurança:</strong><br />
                                • Criptografia SSL/TLS para transmissão de dados<br />
                                • Armazenamento seguro em servidores protegidos<br />
                                • Acesso restrito a informações pessoais<br />
                                • Monitoramento contínuo de segurança
                            </p>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            7. Seus Direitos (LGPD)
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Conforme a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-900">Acesso</h4>
                                <p className="text-sm text-gray-700">Solicitar informações sobre seus dados</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-900">Correção</h4>
                                <p className="text-sm text-gray-700">Corrigir dados incorretos ou incompletos</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-900">Exclusão</h4>
                                <p className="text-sm text-gray-700">Solicitar a exclusão de seus dados</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-900">Portabilidade</h4>
                                <p className="text-sm text-gray-700">Transferir seus dados para outro serviço</p>
                            </div>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            8. Retenção de Dados
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                            as finalidades descritas nesta política, incluindo:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Dados de conta: enquanto sua conta estiver ativa</li>
                            <li>Dados de transações: conforme exigido por lei (geralmente 5 anos)</li>
                            <li>Dados de marketing: até você retirar o consentimento</li>
                            <li>Dados de suporte: por 2 anos após o último contato</li>
                        </ul>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            9. Menores de Idade
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Nossa plataforma não é direcionada a menores de 18 anos. Não coletamos 
                            intencionalmente informações pessoais de menores de idade.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos 
                            medidas para excluir essas informações de nossos sistemas.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            10. Alterações nesta Política
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Podemos atualizar esta Política de Privacidade periodicamente. Quando 
                            fizermos alterações significativas, notificaremos você por email ou 
                            através de um aviso em nossa plataforma.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Recomendamos que você revise esta política regularmente para se manter 
                            informado sobre como protegemos suas informações.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            11. Contato e DPO
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                            entre em contato conosco:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <strong>Encarregado de Dados (DPO):</strong><br />
                                Email: dpo@tickety.com<br />
                                Telefone: 0800-123-4567<br />
                                Endereço: São Paulo, SP - Brasil
                            </p>
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Você também pode entrar em contato através de nossa página de contato 
                            ou enviar uma solicitação formal para exercer seus direitos.
                        </p>
                    </SimpleCard>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop/terms">
                            <Button isSecondary isLarge>
                                Termos de Uso
                            </Button>
                        </Link>
                        <Link href="/shop/contact">
                            <Button isPrimary isLarge>
                                Entrar em Contato
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
