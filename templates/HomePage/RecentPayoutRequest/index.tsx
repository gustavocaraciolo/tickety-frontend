import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Action from "@/components/Action";
import ModalDelete from "@/components/ModalDelete";
import { useSelection } from "@/hooks/useSelection";
import { RecentPayoutRequestType } from "@/types/table";

interface RecentPayoutRequestProps {
    data?: Array<{
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

const RecentPayoutRequest = ({ data = [] }: RecentPayoutRequestProps) => {
    // Filtrar dados válidos
    const validData = data.filter(item => item && item.id && item.organizer && item.amount !== undefined);
    
    const { selectedRows, selectAll, handleRowSelect, handleSelectAll } =
        useSelection<RecentPayoutRequestType>(validData);
    const [search, setSearch] = useState("");
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    // Não renderizar se não houver dados válidos
    if (validData.length === 0) {
        return (
            <div className="mt-6">
                <div className="text-center py-10 text-gray-500">
                    Nenhum pedido de pagamento encontrado
                </div>
            </div>
        );
    }

    return (
        <>
            <Table
                className="mt-6"
                title="Solicitações Recentes de Pagamento"
                search={search}
                setSearch={(e) => setSearch(e.target.value)}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                cellsThead={[
                    "Organizador",
                    "Valor",
                    "Solicitado Em",
                    "Status",
                    "Processado Em",
                    "Ações",
                ]}
                isNumber
            >
                {validData.map((item, index) => (
                    <TableRow
                        key={item.id || index}
                        index={index}
                        selectedRows={selectedRows.includes(item.id)}
                        onRowSelect={() => handleRowSelect(item.id)}
                    >
                        <td>{item.organizer || 'N/A'}</td>
                        <td>{item.currency || 'N/A'} {(item.amount || 0).toLocaleString()}</td>
                        <td>{item.requested_on ? new Date(item.requested_on).toLocaleDateString('pt-BR') : 'N/A'}</td>
                        <td>
                            <div
                                className={`status ${
                                    item.status === "pending"
                                        ? "status-yellow"
                                        : item.status === "rejected"
                                        ? "status-red"
                                        : "status-green"
                                }`}
                            >
                                {item.status === "pending" ? "Pendente" : 
                                 item.status === "rejected" ? "Rejeitado" : 
                                 item.status === "paid" ? "Pago" : item.status || 'N/A'}
                            </div>
                        </td>
                        <td>{item.processed_on ? new Date(item.processed_on).toLocaleDateString('pt-BR') : '-'}</td>
                        <td className="w-33">
                            <div className="flex items-center gap-2">
                                <Action isView />
                                <Action />
                                <Action
                                    isRemove
                                    onClick={() => setIsModalDeleteOpen(true)}
                                />
                            </div>
                        </td>
                    </TableRow>
                ))}
            </Table>
            <ModalDelete
                content="Are you sure you want to delete this request?"
                open={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onDelete={() => setIsModalDeleteOpen(false)}
            />
        </>
    );
};

export default RecentPayoutRequest;
