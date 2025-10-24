"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import CreateEvent from "@/components/CreateEvent";
import SalesAnalytics from "./SalesAnalytics";
import UpcomingEvents from "./UpcomingEvents";
import DeadlineAndCalendar from "./DeadlineAndCalendar";

import { stats } from "./stats";

const OrganizerPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Layout title="Calendários">
                <Breadcrumbs items={["Início", "Calendários"]}>
                    <div className="flex gap-3">
                        <Button className="max-md:flex-1" isSecondary isMedium>
                            Gerar Relatórios
                        </Button>
                        <Button
                            className="max-md:flex-1"
                            isPrimary
                            isMedium
                            onClick={() => setIsModalOpen(true)}
                        >
                            Criar Evento
                        </Button>
                    </div>
                </Breadcrumbs>
                <Cards items={stats} />
                <div className="flex items-start gap-6 mt-6 max-lg:block">
                    <div className="grow">
                        <SalesAnalytics />
                        <UpcomingEvents />
                    </div>
                    <DeadlineAndCalendar />
                </div>
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

export default OrganizerPage;
