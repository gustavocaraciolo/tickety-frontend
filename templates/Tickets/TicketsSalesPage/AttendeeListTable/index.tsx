import { useState } from "react";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Actions from "@/components/Actions";
import { useSelection } from "@/hooks/useSelection";
import { AttendeeListTableType } from "@/types/table";

import { tableContent } from "./content";

const AttendeeListTable = ({}) => {
    const { selectedRows, selectAll, handleRowSelect, handleSelectAll } =
        useSelection<AttendeeListTableType>(tableContent);
    const [search, setSearch] = useState("");

    return (
        <Table
            className="mt-6"
            title="Tabela de Lista de Participantes"
            search={search}
            setSearch={(e) => setSearch(e.target.value)}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            cellsThead={[
                "Nome",
                "Email",
                "Tipo de Ingresso",
                "Data da Compra",
                "Status de Check-in",
                "",
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.ticketType}</td>
                    <td>{item.purchaseDate}</td>
                    <td>
                        <div
                            className={`status ${
                                item.checkInStatus === "Not Checked In"
                                    ? "status-red"
                                    : "status-green"
                            }`}
                        >
                            {item.checkInStatus}
                        </div>
                    </td>
                    <td className="w-11">
                        <Actions />
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};

export default AttendeeListTable;
