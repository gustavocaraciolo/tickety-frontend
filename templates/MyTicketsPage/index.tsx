"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Action from "@/components/Action";
import { useSelection } from "@/hooks/useSelection";
import { MyTicketsType } from "@/types/table";
import Stats from "@/components/Stats";
import TicketModal from "@/components/TicketModal";

import { tableContent } from "./content";
import { stats } from "./stats";

const MyTicketsPage = () => {
    const { selectedRows, selectAll, handleRowSelect, handleSelectAll } =
        useSelection<MyTicketsType>(tableContent);
    const [search, setSearch] = useState("");
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<MyTicketsType | null>(null);

    return (
        <Layout title="Meus Ingressos">
            <Breadcrumbs items={["Gerenciamento", "Meus Ingressos"]}>
                <div className="flex items-center gap-3">
                    <Button className="max-md:flex-1" isSecondary isMedium>
                        Exportar PDF
                    </Button>
                    <Button className="max-md:flex-1" isPrimary isMedium>
                        Baixar Ingressos
                    </Button>
                </div>
            </Breadcrumbs>
            <Stats className="mt-6" stats={stats} />
            <Table
                className="mt-6"
                title="Tabela de Meus Ingressos"
                search={search}
                setSearch={(e) => setSearch(e.target.value)}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                cellsThead={[
                    "Evento",
                    "Tipo de Ingresso",
                    "Data do Evento",
                    "Status",
                    "Valor Pago",
                    "Ações",
                ]}
                isNumber
                isPagination
            >
                {tableContent.map((item, index) => (
                    <TableRow
                        key={item.id}
                        index={index}
                        selectedRows={selectedRows.includes(item.id)}
                        onRowSelect={() => handleRowSelect(item.id)}
                    >
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-lg bg-gray-100 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.eventImage}
                                        alt={item.eventName}
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {item.eventName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {item.organizer}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="font-medium text-gray-900">
                                {item.ticketType}
                            </div>
                        </td>
                        <td>
                            <div className="font-medium text-gray-900">
                                {item.eventDate}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.eventTime}
                            </div>
                        </td>
                        <td>
                            <div
                                className={`status ${
                                    item.status === "Ativo"
                                        ? "status-green"
                                        : item.status === "Usado"
                                        ? "status-blue"
                                        : item.status === "Cancelado"
                                        ? "status-red"
                                        : "status-yellow"
                                }`}
                            >
                                {item.status}
                            </div>
                        </td>
                        <td>
                            <div className="font-medium text-gray-900">
                                {item.price}
                            </div>
                        </td>
                        <td className="w-33">
                            <div className="flex items-center gap-2">
                                <Action isView />
                                <Action
                                    onClick={() => {
                                        setSelectedTicket(item);
                                        setIsTicketModalOpen(true);
                                    }}
                                />
                                <Action
                                    isRemove
                                    onClick={() => {
                                        // Lógica para cancelar ingresso
                                    }}
                                />
                            </div>
                        </td>
                    </TableRow>
                ))}
            </Table>
            
            {/* Modal do Ingresso */}
            <TicketModal
                isOpen={isTicketModalOpen}
                onClose={() => {
                    setIsTicketModalOpen(false);
                    setSelectedTicket(null);
                }}
                ticketData={selectedTicket ? {
                    id: selectedTicket.id,
                    eventName: selectedTicket.eventName,
                    organizer: selectedTicket.organizer,
                    ticketType: selectedTicket.ticketType,
                    eventDate: selectedTicket.eventDate,
                    eventTime: selectedTicket.eventTime,
                    price: selectedTicket.price,
                    eventImage: selectedTicket.eventImage,
                    ticketId: `TK-${selectedTicket.id.toString().padStart(6, '0')}`,
                    qrCode: `QR-${selectedTicket.id.toString().padStart(8, '0')}`
                } : null}
            />
        </Layout>
    );
};

export default MyTicketsPage;
