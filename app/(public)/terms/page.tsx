import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Link from "next/link";

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Termos de Uso"]}
                />

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Termos de Uso
                    </h1>
                    <p className="text-lg text-gray-600">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div className="prose prose-lg max-w-none">
                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            1. Aceitação dos Termos
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Ao acessar e utilizar a plataforma Tickety, você concorda em cumprir e estar 
                            sujeito aos seguintes termos e condições de uso. Se você não concordar com 
                            qualquer parte destes termos, não deve utilizar nossa plataforma.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Estes termos se aplicam a todos os visitantes, usuários e outras pessoas 
                            que acessam ou utilizam o serviço.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            2. Descrição do Serviço
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            O Tickety é uma plataforma online que permite a compra e venda de ingressos 
                            para eventos diversos, incluindo shows, conferências, esportes, cultura e 
                            entretenimento.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Nossa plataforma conecta organizadores de eventos com o público interessado, 
                            facilitando a descoberta, compra e gestão de ingressos de forma segura e confiável.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            3. Uso da Plataforma
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.1 Uso Permitido
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Navegar e pesquisar eventos disponíveis</li>
                                    <li>Comprar ingressos para eventos</li>
                                    <li>Criar e gerenciar sua conta de usuário</li>
                                    <li>Participar de eventos organizados através da plataforma</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.2 Uso Proibido
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Usar a plataforma para atividades ilegais ou não autorizadas</li>
                                    <li>Interferir no funcionamento normal da plataforma</li>
                                    <li>Tentar acessar contas de outros usuários</li>
                                    <li>Revender ingressos sem autorização expressa</li>
                                    <li>Usar bots ou sistemas automatizados para compras</li>
                                </ul>
                            </div>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            4. Contas de Usuário
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                Para utilizar certas funcionalidades da plataforma, você deve criar uma conta 
                                fornecendo informações precisas e atualizadas.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Você é responsável por manter a confidencialidade de sua senha e por todas 
                                as atividades que ocorrem em sua conta.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos.
                            </p>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            5. Pagamentos e Reembolsos
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    5.1 Formas de Pagamento
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Aceitamos cartões de crédito, débito, PIX, boleto bancário e outras 
                                    formas de pagamento seguras. Todas as transações são processadas de 
                                    forma segura e criptografada.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    5.2 Política de Reembolso
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Reembolsos são permitidos até 24 horas antes do evento, exceto em 
                                    casos de cancelamento do evento pelo organizador. O reembolso será 
                                    processado em até 5 dias úteis.
                                </p>
                            </div>
                        </div>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            6. Privacidade e Proteção de Dados
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Sua privacidade é importante para nós. Nossa Política de Privacidade explica 
                            como coletamos, usamos e protegemos suas informações pessoais.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Ao usar nossa plataforma, você concorda com a coleta e uso de informações 
                            de acordo com nossa Política de Privacidade.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            7. Limitação de Responsabilidade
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            O Tickety não se responsabiliza por danos diretos, indiretos, incidentais, 
                            especiais ou consequenciais resultantes do uso ou incapacidade de usar nossa 
                            plataforma.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Nossa responsabilidade é limitada ao valor pago pelos serviços utilizados.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            8. Modificações dos Termos
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                            As alterações entrarão em vigor imediatamente após a publicação na plataforma.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            É sua responsabilidade revisar periodicamente estes termos. O uso continuado 
                            da plataforma após as modificações constitui aceitação dos novos termos.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            9. Contato
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <strong>Email:</strong> legal@tickety.com<br />
                                <strong>Telefone:</strong> 0800-123-4567<br />
                                <strong>Endereço:</strong> São Paulo, SP - Brasil
                            </p>
                        </div>
                    </SimpleCard>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop/privacy">
                            <Button isSecondary isLarge>
                                Política de Privacidade
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

export default TermsPage;
