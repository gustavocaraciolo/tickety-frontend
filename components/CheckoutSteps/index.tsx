import Icon from "@/components/Icon";

type CheckoutStepsProps = {
    currentStep: number;
    className?: string;
};

const CheckoutSteps = ({ currentStep, className }: CheckoutStepsProps) => {
    const steps = [
        {
            id: 1,
            title: 'Informações',
            description: 'Dados pessoais',
            icon: 'user'
        },
        {
            id: 2,
            title: 'Pagamento',
            description: 'Método de pagamento',
            icon: 'credit-card'
        },
        {
            id: 3,
            title: 'Confirmação',
            description: 'Revisar pedido',
            icon: 'check'
        }
    ];

    return (
        <div className={`${className || ""}`}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const isUpcoming = currentStep < step.id;

                    return (
                        <div key={step.id} className="flex items-center">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-semibold
                                    ${isCompleted 
                                        ? 'bg-success-100 text-success-600' 
                                        : isCurrent 
                                            ? 'bg-primary-500 text-white' 
                                            : 'bg-gray-100 text-gray-400'
                                    }
                                `}>
                                    {isCompleted ? (
                                        <Icon name="check" className="w-5 h-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                
                                {/* Step Info */}
                                <div className="mt-2 text-center">
                                    <div className={`
                                        text-body-sm font-medium
                                        ${isCurrent ? 'text-primary-600' : 'text-gray-600'}
                                    `}>
                                        {step.title}
                                    </div>
                                    <div className="text-body-xs text-gray-500">
                                        {step.description}
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className={`
                                    flex-1 h-0.5 mx-4
                                    ${isCompleted ? 'bg-success-100' : 'bg-gray-200'}
                                `} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckoutSteps;
