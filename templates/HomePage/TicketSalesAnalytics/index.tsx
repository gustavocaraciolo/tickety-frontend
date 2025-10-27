import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Widget from "@/components/Widget";
import Percentage from "@/components/Percentage";

const durationOptions = [
    { id: 1, name: "Mês" },
    { id: 2, name: "Semana" },
    { id: 3, name: "Dia" },
];

const legend = [
    { label: "Total de Eventos", color: "#1565FF" },
    { label: "Ingressos Vendidos", color: "#DFE1E7" },
];

interface TicketSalesAnalyticsProps {
    data?: Array<{
        month: string;
        total_events: number;
        tickets_sold: number;
        revenue: number;
    }>;
}

const TicketSalesAnalytics = ({ data = [] }: TicketSalesAnalyticsProps) => {
    const [duration, setDuration] = useState(durationOptions[0]);

    // Filtrar dados válidos
    const validData = data.filter(item => item && item.month && item.total_events !== undefined && item.tickets_sold !== undefined);
    
    // Transformar dados para o formato esperado pelo gráfico
    const chartData = validData.map(item => ({
        name: new Date(item.month + '-01').toLocaleDateString('pt-BR', { month: 'short' }),
        te: item.total_events || 0,
        ts: item.tickets_sold || 0,
    }));

    // Calcular total de eventos e variação
    const totalEvents = validData.reduce((sum, item) => sum + (item.total_events || 0), 0);
    const totalTickets = validData.reduce((sum, item) => sum + (item.tickets_sold || 0), 0);
    
    // Calcular variação (simplificado - pode ser melhorado)
    const currentMonth = validData[validData.length - 1];
    const previousMonth = validData[validData.length - 2];
    const change = previousMonth ? 
        (((currentMonth?.tickets_sold || 0) - (previousMonth?.tickets_sold || 0)) / (previousMonth?.tickets_sold || 1)) * 100 : 0;

    const CustomTooltip = ({
        payload,
        label,
    }: {
        payload: { value: number }[];
        label: string;
    }) => {
        if (payload && payload.length) {
            return (
                <div className="chart-tooltip min-w-44">
                    <div className="mb-2 font-semibold">{label} 2025</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Total de Eventos
                            </div>
                            <div className="font-semibold text-primary-500">
                                {payload[0].value}
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <div className="font-medium text-gray-400">
                                Ingressos Vendidos
                            </div>
                            <div className="font-semibold">
                                {payload[1].value}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Não renderizar se não houver dados válidos
    if (validData.length === 0) {
        return (
            <Widget
                className="grow"
                title="Análise de Vendas de Ingressos"
                selectOptions={durationOptions}
                selectValue={duration}
                selectOnChange={setDuration}
            >
                <div className="p-5 text-center text-gray-500">
                    Nenhum dado disponível
                </div>
            </Widget>
        );
    }

    return (
        <Widget
            className="grow"
            title="Análise de Vendas de Ingressos"
            selectOptions={durationOptions}
            selectValue={duration}
            selectOnChange={setDuration}
        >
            <div className="flex items-end px-5 py-3 max-md:block">
                <div className="flex items-center">
                    <div className="text-h4">{totalEvents}</div>
                    <Percentage className="ml-2" value={change} isSimple />
                    <div className="ml-1.5 text-gray-500">
                        Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                </div>
                <div className="flex gap-3 ml-auto max-md:mt-2">
                    {legend.map((item, index) => (
                        <div
                            className="flex items-center gap-1.5 text-gray-500"
                            key={index}
                        >
                            <div
                                className="size-2 rounded-xs"
                                style={{ backgroundColor: item.color }}
                            />
                            <div className="">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-79.5 pr-5 pb-4 max-md:-ml-1.5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        barGap={5}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="5 5"
                            stroke="#DFE1E7"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                            tickFormatter={(value) => value.slice(0, 3)}
                            height={32}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: "0.875rem",
                                fill: "#818898",
                            }}
                        />
                        <Tooltip
                            content={<CustomTooltip payload={[]} label="" />}
                            cursor={{ fill: "#f6f8fa" }}
                        />
                        <Bar
                            dataKey="te"
                            fill="#1565FF"
                            barSize={10}
                            radius={5}
                        />
                        <Bar
                            dataKey="ts"
                            fill="#DFE1E7"
                            barSize={10}
                            radius={5}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    );
};

export default TicketSalesAnalytics;
