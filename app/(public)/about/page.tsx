import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const AboutPage = () => {
    const stats = [
        { label: "Eventos Realizados", value: "10,000+", icon: "calendar" },
        { label: "Usuários Ativos", value: "50,000+", icon: "user" },
        { label: "Organizadores", value: "2,500+", icon: "user" },
        { label: "Países", value: "25+", icon: "location" }
    ];

    const values = [
        {
            icon: "lock",
            title: "Segurança",
            description: "Garantimos a segurança de todos os dados e transações dos nossos usuários."
        },
        {
            icon: "heart",
            title: "Paixão",
            description: "Somos apaixonados por conectar pessoas através de experiências incríveis."
        },
        {
            icon: "refresh",
            title: "Inovação",
            description: "Sempre buscamos novas tecnologias para melhorar a experiência dos usuários."
        },
        {
            icon: "user",
            title: "Comunidade",
            description: "Construímos uma comunidade forte de organizadores e participantes."
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Descubra Eventos",
            description: "Navegue por milhares de eventos incríveis em nossa plataforma."
        },
        {
            step: "2",
            title: "Escolha seus Ingressos",
            description: "Selecione os ingressos que deseja e adicione ao carrinho."
        },
        {
            step: "3",
            title: "Finalize a Compra",
            description: "Complete seu pedido de forma rápida e segura."
        },
        {
            step: "4",
            title: "Aproveite o Evento",
            description: "Receba seus ingressos e aproveite uma experiência única."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Hero Section */}
                <div className="mb-20 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Sobre o Tickety
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Somos a plataforma líder em venda de ingressos, conectando organizadores 
                        e participantes através de experiências únicas e memoráveis.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 border border-gray-100 rounded-lg">
                            <div className="mx-auto mb-4">
                                <Icon name={stat.icon} className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission, Vision, Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center">
                        <div className="mx-auto mb-6">
                            <Icon name="check" className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Nossa Missão
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Democratizar o acesso a eventos culturais, esportivos e de entretenimento, 
                            conectando pessoas através de experiências transformadoras.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-6">
                            <Icon name="eye" className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Nossa Visão
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Ser a plataforma global de referência em venda de ingressos, 
                            reconhecida pela excelência e inovação.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto mb-6">
                            <Icon name="star" className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Nossos Valores
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Transparência, inovação, segurança e compromisso com a 
                            satisfação dos nossos usuários.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-100 mb-20"></div>

                {/* Values Grid */}
                <div className="mb-20">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
                        Nossos Valores em Ação
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-6 border border-gray-100 rounded-lg">
                                <div className="mx-auto mb-4">
                                    <Icon name={value.icon} className="w-6 h-6 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 mb-20"></div>

                {/* How It Works */}
                <div className="mb-20">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
                        Como Funciona
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* CTA Section */}
                <div className="mt-16 pt-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            Pronto para Descobrir Eventos Incríveis?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Explore nossa plataforma e encontre eventos que combinam com você
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/events">
                                <Button isPrimary isLarge>
                                    Explorar Eventos
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button isSecondary isLarge>
                                    Entrar em Contato
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
