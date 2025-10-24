"use client";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import AttendeeListTable from "./AttendeeListTable";

import { stats } from "./stats";

const TicketsSalesPage = () => {
    return (
        <Layout title="Vendas de Ingressos">
            <Breadcrumbs items={["Gerenciamento", "Ingressos"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Exportar CSV
                </Button>
            </Breadcrumbs>
            <Cards items={stats} />
            <AttendeeListTable />
        </Layout>
    );
};

export default TicketsSalesPage;
