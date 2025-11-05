"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import General from "./General";
import MyAccount from "./MyAccount";
import PaymentAndBilling from "./PaymentAndBilling";
import TaxAndDuties from "./TaxAndDuties";
import LinkAccount from "./LinkAccount";
import TimeAndLanguage from "./TimeAndLanguage";
import Password from "./Password";
import Notifications from "./Notifications";
import { useAuth } from "@/contexts/AuthContext";
import { getNavigationByRole, NavigationItem } from "./navigation";

const SettingsPage = () => {
    const { user } = useAuth();
    const [navigation, setNavigation] = useState<NavigationItem[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);

    // Filtrar navegação baseado no role do usuário
    useEffect(() => {
        if (user) {
            const filteredNav = getNavigationByRole(user.role);
            setNavigation(filteredNav);
            // Definir o primeiro item como ativo se não houver activeId ou se o activeId atual não estiver na lista filtrada
            setActiveId((currentId) => {
                if (currentId === null || !filteredNav.find((item) => item.id === currentId)) {
                    return filteredNav.length > 0 ? filteredNav[0].id : null;
                }
                return currentId;
            });
        } else {
            setNavigation([]);
            setActiveId(null);
        }
    }, [user]);

    if (!user) {
        return null; // ou um componente de loading
    }

    return (
        <Layout title="Configurações">
            <Breadcrumbs
                className="max-md:hidden"
                items={["Outros", "Configurações"]}
            />
            <div className="flex border border-gray-100 rounded-2xl max-md:relative max-md:flex-col max-md:border-0 max-md:rounded-none max-md:min-h-[calc(100svh-5.6rem)] max-md:-mt-6 max-md:-mx-6">
                <div className="flex flex-col gap-3 shrink-0 w-75 p-4 border-r border-gray-100 max-4xl:w-50 max-2xl:w-45 max-md:flex-row max-md:w-auto max-md:overflow-x-auto max-md:scrollbar-none max-md:border-b max-md:border-gray-100">
                    {navigation.map((item) => (
                        <button
                            className={`flex items-center h-9.25 px-3 border rounded-lg text-body-md transition-all hover:text-gray-900 max-md:shrink-0 ${
                                activeId === item.id
                                    ? "border-gray-100 bg-gray-25 font-semibold text-gray-900"
                                    : "border-transparent font-medium text-gray-500"
                            }`}
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className="grow">
                    {activeId === 0 && <General />}
                    {activeId === 1 && <MyAccount />}
                    {activeId === 2 && <PaymentAndBilling />}
                    {activeId === 3 && <TaxAndDuties />}
                    {activeId === 4 && <LinkAccount />}
                    {activeId === 5 && <TimeAndLanguage />}
                    {activeId === 6 && <Password />}
                    {activeId === 7 && <Notifications />}
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
