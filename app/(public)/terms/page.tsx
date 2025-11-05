import Button from "@/components/Button";
import Link from "next/link";

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Termos de Uso
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
                            1. Aceitação dos Termos
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Ao acessar e utilizar a plataforma Tickety, você concorda em cumprir e estar 
                                sujeito aos seguintes termos e condições de uso. Se você não concordar com 
                                qualquer parte destes termos, não deve utilizar nossa plataforma.
                            </p>
                            <p>
                                Estes termos se aplicam a todos os visitantes, usuários e outras pessoas 
                                que acessam ou utilizam o serviço.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            2. Descrição do Serviço
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                O Tickety é uma plataforma online que permite a compra e venda de ingressos 
                                para eventos diversos, incluindo shows, conferências, esportes, cultura e 
                                entretenimento.
                            </p>
                            <p>
                                Nossa plataforma conecta organizadores de eventos com o público interessado, 
                                facilitando a descoberta, compra e gestão de ingressos de forma segura e confiável.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 3 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            3. Uso da Plataforma
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    3.1 Uso Permitido
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Navegar e pesquisar eventos disponíveis</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Comprar ingressos para eventos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Criar e gerenciar sua conta de usuário</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Participar de eventos organizados através da plataforma</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    3.2 Uso Proibido
                                </h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Usar a plataforma para atividades ilegais ou não autorizadas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Interferir no funcionamento normal da plataforma</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Tentar acessar contas de outros usuários</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Revender ingressos sem autorização expressa</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-gray-400">•</span>
                                        <span>Usar bots ou sistemas automatizados para compras</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            4. Contas de Usuário
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Para utilizar certas funcionalidades da plataforma, você deve criar uma conta 
                                fornecendo informações precisas e atualizadas.
                            </p>
                            <p>
                                Você é responsável por manter a confidencialidade de sua senha e por todas 
                                as atividades que ocorrem em sua conta.
                            </p>
                            <p>
                                Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 5 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            5. Pagamentos e Reembolsos
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    5.1 Formas de Pagamento
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Aceitamos cartões de crédito, débito, PIX, boleto bancário e outras 
                                    formas de pagamento seguras. Todas as transações são processadas de 
                                    forma segura e criptografada.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-3">
                                    5.2 Política de Reembolso
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Reembolsos são permitidos até 24 horas antes do evento, exceto em 
                                    casos de cancelamento do evento pelo organizador. O reembolso será 
                                    processado em até 5 dias úteis.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            6. Privacidade e Proteção de Dados
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Sua privacidade é importante para nós. Nossa Política de Privacidade explica 
                                como coletamos, usamos e protegemos suas informações pessoais.
                            </p>
                            <p>
                                Ao usar nossa plataforma, você concorda com a coleta e uso de informações 
                                de acordo com nossa Política de Privacidade.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            7. Limitação de Responsabilidade
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                O Tickety não se responsabiliza por danos diretos, indiretos, incidentais, 
                                especiais ou consequenciais resultantes do uso ou incapacidade de usar nossa 
                                plataforma.
                            </p>
                            <p>
                                Nossa responsabilidade é limitada ao valor pago pelos serviços utilizados.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            8. Modificações dos Termos
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                                As alterações entrarão em vigor imediatamente após a publicação na plataforma.
                            </p>
                            <p>
                                É sua responsabilidade revisar periodicamente estes termos. O uso continuado 
                                da plataforma após as modificações constitui aceitação dos novos termos.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-gray-100"></div>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            9. Contato
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-900">Email:</span> legal@tickety.com</p>
                                <p><span className="font-medium text-gray-900">Telefone:</span> 0800-123-4567</p>
                                <p><span className="font-medium text-gray-900">Endereço:</span> São Paulo, SP - Brasil</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/privacy">
                            <Button isSecondary isLarge>
                                Política de Privacidade
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

export default TermsPage;
