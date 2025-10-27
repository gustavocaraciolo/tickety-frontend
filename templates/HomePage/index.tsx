"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import TicketSalesAnalytics from "./TicketSalesAnalytics";
import UserDistribution from "./UserDistribution";
import RecentPayoutRequest from "./RecentPayoutRequest";
import apiClient from "@/lib/api";

interface DashboardData {
    stats: {
        total_revenue: number;
        total_tickets_sold: number;
        total_refunded: number;
        total_payouts: number;
        revenue_change: number;
        tickets_change: number;
    };
    monthly_sales: Array<{
        month: string;
        total_events: number;
        tickets_sold: number;
        revenue: number;
    }>;
    user_distribution: Array<{
        role: string;
        count: number;
        percentage: number;
    }>;
    recent_payout_requests: Array<{
        id: number;
        order_number: string;
        organizer: string;
        amount: number;
        currency: string;
        requested_on: string;
        status: string;
        processed_on?: string;
    }>;
}

const HomePage = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await apiClient.getDashboard();
                
                if (response.success) {
                    setDashboardData(response.data);
                } else {
                    setError('Erro ao carregar dados do dashboard');
                }
            } catch (err) {
                setError('Erro ao carregar dados do dashboard');
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <Layout title="Dashboard">
                <Breadcrumbs items={["Home", "Dashboard"]}>
                    <Button className="max-md:w-full" isSecondary isMedium>
                        Generate Reports
                    </Button>
                </Breadcrumbs>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-6 mt-6 max-lg:flex-col">
                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-80 bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !dashboardData) {
        return (
            <Layout title="Dashboard">
                <Breadcrumbs items={["Home", "Dashboard"]}>
                    <Button className="max-md:w-full" isSecondary isMedium>
                        Generate Reports
                    </Button>
                </Breadcrumbs>
                <div className="text-center py-10">
                    <p className="text-body-lg text-red-600 mb-4">{error || 'Erro ao carregar dados'}</p>
                    <Button onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </Button>
                </div>
            </Layout>
        );
    }

    // Verificar se os dados necessários existem
    if (!dashboardData.stats) {
        return (
            <Layout title="Dashboard">
                <Breadcrumbs items={["Home", "Dashboard"]}>
                    <Button className="max-md:w-full" isSecondary isMedium>
                        Generate Reports
                    </Button>
                </Breadcrumbs>
                <div className="text-center py-10">
                    <p className="text-body-lg text-gray-600 mb-4">Dados não disponíveis</p>
                </div>
            </Layout>
        );
    }

    // Transformar dados para o formato esperado pelos componentes
    const stats = [
        {
            title: "Receita Total",
            value: `$${(dashboardData.stats.total_revenue || 0).toLocaleString()}`,
            percentage: dashboardData.stats.revenue_change || 0,
            image: "/images/icons/dollar.svg",
            tooltip: "Receita total gerada pelos eventos",
        },
        {
            title: "Ingressos Vendidos",
            value: (dashboardData.stats.total_tickets_sold || 0).toLocaleString(),
            percentage: dashboardData.stats.tickets_change || 0,
            image: "/images/icons/ticket.svg",
            tooltip: "Total de ingressos vendidos",
        },
        {
            title: "Valor Reembolsado",
            value: `$${(dashboardData.stats.total_refunded || 0).toLocaleString()}`,
            percentage: -10.5, // Placeholder - pode ser calculado se necessário
            image: "/images/icons/refresh.svg",
            tooltip: "Valor total reembolsado",
        },
        {
            title: "Pagamentos Emitidos",
            value: `$${(dashboardData.stats.total_payouts || 0).toLocaleString()}`,
            percentage: 10.5, // Placeholder - pode ser calculado se necessário
            image: "/images/icons/bank.svg",
            tooltip: "Total de pagamentos emitidos",
        },
    ];

    return (
        <Layout title="Dashboard">
            <Breadcrumbs items={["Home", "Dashboard"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Generate Reports
                </Button>
            </Breadcrumbs>
            <Cards items={stats} />
            <div className="flex gap-6 mt-6 max-lg:flex-col">
                <TicketSalesAnalytics data={dashboardData.monthly_sales || []} />
                <UserDistribution data={dashboardData.user_distribution || []} />
            </div>
            <RecentPayoutRequest data={dashboardData.recent_payout_requests || []} />
        </Layout>
    );
};

export default HomePage;
