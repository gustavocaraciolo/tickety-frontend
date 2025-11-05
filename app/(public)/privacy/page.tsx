import Button from "@/components/Button";
import Link from "next/link";

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Política de Privacidade
                    </h1>
                    <p className="text-base text-gray-500">
                        Última atualização: {new Date().toLocaleDateString('pt-BR', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                        })}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            1. Introdução
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                A Tickety ("nós", "nosso" ou "empresa") está comprometida em proteger sua 
                                privacidade e dados pessoais. Esta Política de Privacidade explica como 
                                coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                            </p>
                            <p>
                                Esta política está em conformidade com a Lei Geral de Proteção de Dados 
                                (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 2 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            2. Informações que Coletamos
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    2.1 Informações Fornecidas por Você
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Nome completo e dados de identificação</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Endereço de email e telefone</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Data de nascimento</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Informações de pagamento (processadas de forma segura)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Preferências de eventos e interesses</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    2.2 Informações Coletadas Automaticamente
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Endereço IP e localização aproximada</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Dados de navegação e comportamento na plataforma</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Informações do dispositivo e navegador</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Cookies e tecnologias similares</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 3 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            3. Como Usamos suas Informações
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    3.1 Finalidades Principais
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Processar e gerenciar suas compras de ingressos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Fornecer suporte ao cliente</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Enviar confirmações e atualizações sobre eventos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Melhorar nossos serviços e experiência do usuário</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    3.2 Finalidades Secundárias
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Enviar comunicações de marketing (com seu consentimento)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Realizar análises e pesquisas de mercado</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Detectar e prevenir fraudes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Cumprir obrigações legais</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            4. Compartilhamento de Informações
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
                            terceiros, exceto nas seguintes situações:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Com organizadores de eventos (apenas informações necessárias)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Com prestadores de serviços que nos auxiliam (processadores de pagamento, etc.)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Quando exigido por lei ou autoridades competentes</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Para proteger nossos direitos ou segurança</span>
                            </li>
                        </ul>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            5. Cookies e Tecnologias Similares
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                                na plataforma. Os cookies nos ajudam a:
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-400">•</span>
                                    <span>Lembrar suas preferências</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-400">•</span>
                                    <span>Analisar o tráfego e uso da plataforma</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-400">•</span>
                                    <span>Personalizar conteúdo e anúncios</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 text-gray-400">•</span>
                                    <span>Garantir a segurança da plataforma</span>
                                </li>
                            </ul>
                            <p>
                                Você pode gerenciar suas preferências de cookies através das configurações 
                                do seu navegador.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            6. Segurança dos Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Implementamos medidas de segurança técnicas e organizacionais para proteger 
                            suas informações pessoais contra acesso não autorizado, alteração, divulgação 
                            ou destruição.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-900 mb-3">
                                Medidas de Segurança:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <span className="mr-2 text-gray-400">•</span>
                                    <span>Criptografia SSL/TLS para transmissão de dados</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-gray-400">•</span>
                                    <span>Armazenamento seguro em servidores protegidos</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-gray-400">•</span>
                                    <span>Acesso restrito a informações pessoais</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-gray-400">•</span>
                                    <span>Monitoramento contínuo de segurança</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            7. Seus Direitos (LGPD)
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Conforme a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">Acesso</h4>
                                <p className="text-sm text-gray-600">Solicitar informações sobre seus dados</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">Correção</h4>
                                <p className="text-sm text-gray-600">Corrigir dados incorretos ou incompletos</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">Exclusão</h4>
                                <p className="text-sm text-gray-600">Solicitar a exclusão de seus dados</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">Portabilidade</h4>
                                <p className="text-sm text-gray-600">Transferir seus dados para outro serviço</p>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            8. Retenção de Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                            as finalidades descritas nesta política, incluindo:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Dados de conta: enquanto sua conta estiver ativa</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Dados de transações: conforme exigido por lei (geralmente 5 anos)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Dados de marketing: até você retirar o consentimento</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-gray-400">•</span>
                                <span>Dados de suporte: por 2 anos após o último contato</span>
                            </li>
                        </ul>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            9. Menores de Idade
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Nossa plataforma não é direcionada a menores de 18 anos. Não coletamos 
                                intencionalmente informações pessoais de menores de idade.
                            </p>
                            <p>
                                Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos 
                                medidas para excluir essas informações de nossos sistemas.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            10. Alterações nesta Política
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Podemos atualizar esta Política de Privacidade periodicamente. Quando 
                                fizermos alterações significativas, notificaremos você por email ou 
                                através de um aviso em nossa plataforma.
                            </p>
                            <p>
                                Recomendamos que você revise esta política regularmente para se manter 
                                informado sobre como protegemos suas informações.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 11 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            11. Contato e DPO
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                            entre em contato conosco:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p className="text-sm font-medium text-gray-900 mb-2">
                                Encarregado de Dados (DPO)
                            </p>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Email: dpo@tickety.com</p>
                                <p>Telefone: 0800-123-4567</p>
                                <p>Endereço: São Paulo, SP - Brasil</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Você também pode entrar em contato através de nossa página de contato 
                            ou enviar uma solicitação formal para exercer seus direitos.
                        </p>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/terms">
                            <Button isSecondary isLarge>
                                Termos de Uso
                            </Button>
                        </Link>
                        <Link href="/contact">
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
