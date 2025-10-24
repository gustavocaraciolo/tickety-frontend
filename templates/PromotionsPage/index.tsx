"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Modal from "@/components/Modal";
import PromotionsTable from "./PromotionsTable";
import AddPromotion from "./AddPromotion";

import { stats } from "./stats";

const PromotionsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Layout title="Promoções">
                <Breadcrumbs items={["Gerenciamento", "Promoções"]}>
                    <Button
                        className="max-md:w-full"
                        isPrimary
                        isMedium
                        onClick={() => setIsModalOpen(true)}
                    >
                        Adicionar Promoção
                    </Button>
                </Breadcrumbs>
                <Cards items={stats} />
                <PromotionsTable />
            </Layout>
            <Modal
                title="Adicionar Promoção"
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isSlidePanel
                contentFooter={
                    <Button className="min-w-30" isPrimary isMedium>
                        Submit
                    </Button>
                }
            >
                <AddPromotion />
            </Modal>
        </>
    );
};

export default PromotionsPage;
