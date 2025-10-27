"use client";

const steps = [
    {
        icon: "🔍",
        title: "1. Encontre",
        description: "Descubra eventos incríveis na sua cidade"
    },
    {
        icon: "🎫", 
        title: "2. Escolha",
        description: "Selecione os ingressos que deseja"
    },
    {
        icon: "💳",
        title: "3. Pague",
        description: "Finalize sua compra de forma segura"
    }
];

const HowItWorks = () => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">{step.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {step.title}
                    </h3>
                    <p className="text-gray-600">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HowItWorks;

