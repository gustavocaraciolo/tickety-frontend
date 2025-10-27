"use client";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import RevenueAnalytics from "./RevenueAnalytics";
import RecentTransactions from "./RecentTransactions";

import { stats } from "./stats";

const HomePage = () => {
    return (
        <Layout title="Relatórios de Vendas">
            <Breadcrumbs items={["Início", "Relatórios de Vendas"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Exportar CSV
                </Button>
            </Breadcrumbs>
            <Cards items={stats} />
            <RevenueAnalytics />
            <RecentTransactions />
        </Layout>
    );
};

export default HomePage;
