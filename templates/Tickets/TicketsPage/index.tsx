"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import NewTicket from "./NewTicket";
import TicketsTable from "./TicketsTable";

import { stats } from "./stats";

const TicketsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Layout title="Ingressos">
                <Breadcrumbs items={["Gerenciamento", "Ingressos"]}>
                    <Button
                        isPrimary
                        isMedium
                        onClick={() => setIsModalOpen(true)}
                    >
                        Criar Novo Ingresso
                    </Button>
                </Breadcrumbs>
                <Cards items={stats} />
                <TicketsTable />
            </Layout>
            <Modal
                title="Novo Ingresso"
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isSlidePanel
                contentFooter={
                    <Button className="min-w-30" isPrimary isMedium>
                        Create
                    </Button>
                }
            >
                <NewTicket />
            </Modal>
        </>
    );
};

export default TicketsPage;
