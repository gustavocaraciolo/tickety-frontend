import Breadcrumbs from "@/components/Breadcrumbs";
import SimpleCard from "@/components/SimpleCard";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Link from "next/link";

const AboutPage = () => {
    const stats = [
        { label: "Eventos Realizados", value: "10,000+", icon: "calendar" },
        { label: "Usuários Ativos", value: "50,000+", icon: "users" },
        { label: "Organizadores", value: "2,500+", icon: "user-check" },
        { label: "Países", value: "25+", icon: "globe" }
    ];

    const values = [
        {
            icon: "shield-check",
            title: "Segurança",
            description: "Garantimos a segurança de todos os dados e transações dos nossos usuários."
        },
        {
            icon: "heart",
            title: "Paixão",
            description: "Somos apaixonados por conectar pessoas através de experiências incríveis."
        },
        {
            icon: "zap",
            title: "Inovação",
            description: "Sempre buscamos novas tecnologias para melhorar a experiência dos usuários."
        },
        {
            icon: "users",
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={["Home", "Sobre"]}
                />

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Sobre o Tickety
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Somos a plataforma líder em venda de ingressos, conectando organizadores 
                        e participantes através de experiências únicas e memoráveis.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <SimpleCard key={index} className="p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Icon name={stat.icon} className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600">
                                {stat.label}
                            </div>
                        </SimpleCard>
                    ))}
                </div>

                {/* Mission, Vision, Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <SimpleCard className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <Icon name="target" className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Nossa Missão
                        </h3>
                        <p className="text-gray-600">
                            Democratizar o acesso a eventos culturais, esportivos e de entretenimento, 
                            conectando pessoas através de experiências transformadoras.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <Icon name="eye" className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Nossa Visão
                        </h3>
                        <p className="text-gray-600">
                            Ser a plataforma global de referência em venda de ingressos, 
                            reconhecida pela excelência e inovação.
                        </p>
                    </SimpleCard>

                    <SimpleCard className="p-8 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <Icon name="star" className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Nossos Valores
                        </h3>
                        <p className="text-gray-600">
                            Transparência, inovação, segurança e compromisso com a 
                            satisfação dos nossos usuários.
                        </p>
                    </SimpleCard>
                </div>

                {/* Values Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Nossos Valores em Ação
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <SimpleCard key={index} className="p-6 text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Icon name={value.icon} className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {value.description}
                                </p>
                            </SimpleCard>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Como Funciona
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <SimpleCard className="p-8 bg-blue-50 border-blue-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Pronto para Descobrir Eventos Incríveis?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Explore nossa plataforma e encontre eventos que combinam com você
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop/events">
                                <Button isPrimary isLarge>
                                    Explorar Eventos
                                </Button>
                            </Link>
                            <Link href="/shop/contact">
                                <Button isSecondary isLarge>
                                    Entrar em Contato
                                </Button>
                            </Link>
                        </div>
                    </SimpleCard>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
