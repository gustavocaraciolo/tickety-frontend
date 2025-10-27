"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Action from "@/components/Action";
import Modal from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { useSelection } from "@/hooks/useSelection";
import { UsersType } from "@/types/table";
import Details from "./Details";

import { tableContent } from "./content";

const UsersPage = () => {
    const { selectedRows, selectAll, handleRowSelect, handleSelectAll } =
        useSelection<UsersType>(tableContent);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [newUser, setNewUser] = useState(true);

    return (
        <>
            <Layout title="Usuários">
                <Breadcrumbs items={["Gerenciamento", "Usuários"]}>
                    <div className="flex items-center gap-3">
                        <Button className="max-md:flex-1" isSecondary isMedium>
                            Exportar CSV
                        </Button>
                        <Button
                            className="max-md:flex-1"
                            isPrimary
                            isMedium
                            onClick={() => {
                                setIsModalOpen(true);
                                setNewUser(true);
                            }}
                        >
                            Adicionar Novo Usuário
                        </Button>
                    </div>
                </Breadcrumbs>
                <Table
                    className="mt-6"
                    title="Tabela de Usuários"
                    search={search}
                    setSearch={(e) => setSearch(e.target.value)}
                    selectAll={selectAll}
                    onSelectAll={handleSelectAll}
                    cellsThead={[
                        "Nome",
                        "Email",
                        "Número de Telefone",
                        "Função",
                        "Status",
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
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>
                                <div className="status status-blue before:hidden">
                                    {item.role}
                                </div>
                            </td>
                            <td>
                                <div
                                    className={`status ${
                                        item.status === "Pendente"
                                            ? "status-yellow"
                                            : item.status === "Banido"
                                            ? "status-red"
                                            : "status-green"
                                    }`}
                                >
                                    {item.status}
                                </div>
                            </td>
                            <td className="w-33">
                                <div className="flex items-center gap-2">
                                    <Action isView />
                                    <Action
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setNewUser(false);
                                        }}
                                    />
                                    <Action
                                        isRemove
                                        onClick={() =>
                                            setIsModalDeleteOpen(true)
                                        }
                                    />
                                </div>
                            </td>
                        </TableRow>
                    ))}
                </Table>
            </Layout>
            <Modal
                title={newUser ? "Adicionar Novo Usuário" : "Atualizar Usuário"}
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setNewUser(false);
                }}
                isSlidePanel
                contentFooter={
                    <Button
                        className="min-w-30 max-md:flex-1 max-md:min-w-auto"
                        isPrimary
                        isMedium
                    >
                        {newUser ? "Adicionar Usuário" : "Atualizar"}
                    </Button>
                }
            >
                <Details />
            </Modal>
            <ModalDelete
                content="Tem certeza que deseja excluir este usuário?"
                open={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onDelete={() => setIsModalDeleteOpen(false)}
            />
        </>
    );
};

export default UsersPage;
