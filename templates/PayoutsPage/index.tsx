"use client";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import PayoutsTable from "./PayoutsTable";

import { stats } from "./stats";

const PayoutsPage = () => {
    return (
        <Layout title="Pagamentos">
            <Breadcrumbs items={["Início", "Pagamentos"]}>
                <Button className="max-md:w-full" isSecondary isMedium>
                    Exportar CSV
                </Button>
            </Breadcrumbs>
            <Cards items={stats} />
            <PayoutsTable />
        </Layout>
    );
};

export default PayoutsPage;
