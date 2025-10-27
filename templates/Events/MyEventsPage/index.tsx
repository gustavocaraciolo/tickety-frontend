"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import CreateEvent from "@/components/CreateEvent";
import EventsTable from "./EventsTable";

import { stats } from "./stats";

const MyEventsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Layout title="Meus Eventos">
                <Breadcrumbs items={["Gerenciamento", "Meus Eventos"]}>
                    <Button
                        className="max-md:w-full"
                        isPrimary
                        isMedium
                        onClick={() => setIsModalOpen(true)}
                    >
                        Criar Evento
                    </Button>
                </Breadcrumbs>
                <Cards items={stats} />
                <EventsTable />
            </Layout>
            <Modal
                title="Criar Novo Evento"
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isSlidePanel
                contentFooter={
                    <Button className="min-w-30" isPrimary isMedium>
                        Criar
                    </Button>
                }
            >
                <CreateEvent />
            </Modal>
        </>
    );
};

export default MyEventsPage;
