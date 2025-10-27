import { Cell, Pie, PieChart } from "recharts";
import Widget from "@/components/Widget";

const COLORS = ['#1565FF', '#4CAF50', '#FF9800'];

interface UserDistributionProps {
    data?: Array<{
        role: string;
        count: number;
        percentage: number;
    }>;
}

const UserDistribution = ({ data = [] }: UserDistributionProps) => {
    // Filtrar dados válidos e calcular total
    const validData = data.filter(item => item && item.role && item.count !== undefined);
    const total = validData.reduce((sum, item) => sum + (item.count || 0), 0);

    // Transformar dados para o formato esperado pelo gráfico
    const chartData = validData.map((item, index) => ({
        name: item.role === 'buyer' ? 'Attendee' : 
              item.role === 'organizer' ? 'Organizer' : 
              item.role === 'admin' ? 'Admin' : 
              item.role || `Role ${index + 1}`, // Fallback para role indefinido
        value: item.count || 0,
        originalRole: item.role, // Manter role original para debug
    }));

    const getPercentage = (value: number) => {
        return ((value / total) * 100).toFixed(0);
    };

    // Não renderizar se não houver dados válidos
    if (validData.length === 0) {
        return (
            <Widget
                className="shrink-0 w-108 max-4xl:w-88 max-2xl:w-70 max-lg:w-full"
                title="Distribuição de Usuários"
            >
                <div className="p-5 text-center text-gray-500">
                    Nenhum dado disponível
                </div>
            </Widget>
        );
    }

    return (
        <Widget
            className="shrink-0 w-108 max-4xl:w-88 max-2xl:w-70 max-lg:w-full"
            title="Distribuição de Usuários"
        >
            <div className="p-5">
                <div className="relative">
                    <PieChart
                        className="!size-46 mx-auto"
                        width={184}
                        height={184}
                    >
                        <Pie
                            data={chartData}
                            cx={86}
                            cy={86}
                            innerRadius={62}
                            outerRadius={91}
                            fill="#8884d8"
                            paddingAngle={1}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name || index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-h5">
                        {total.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-1.5">
                    {chartData.map((item, index) => (
                        <div
                            className="flex items-center gap-3 py-3 not-last:border-b border-gray-100 font-medium"
                            key={index}
                        >
                            <div
                                className="shrink-0 size-2.5 rounded-full"
                                style={{ backgroundColor: COLORS[index] }}
                            />
                            <div className="">{item.name}</div>
                            <div className="ml-auto">
                                {getPercentage(item.value)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Widget>
    );
};

export default UserDistribution;
