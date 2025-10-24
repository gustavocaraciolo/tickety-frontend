import { useState } from "react";
import Switch from "@/components/Switch";
import Item from "../Item";

const Notifications = ({}) => {
    const [pushNotifications, setPushNotifications] = useState([
        {
            id: 0,
            title: "Confirmação de Transação",
            description:
                "Enviada automaticamente ao cliente após ele fazer o pedido.",
            value: true,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(0, value),
        },
        {
            id: 1,
            title: "Transação Editada",
            description:
                "Enviada ao cliente após seu pedido ser editado (se você selecionar esta opção).",
            value: false,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(1, value),
        },
        {
            id: 2,
            title: "Fatura de Transação",
            description:
                "Enviada ao cliente quando o pedido tem saldo pendente.",
            value: true,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(2, value),
        },
        {
            id: 3,
            title: "Transação Cancelada",
            description:
                "Enviada automaticamente ao cliente se seu pedido for cancelado (se você selecionar esta opção).",
            value: true,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(3, value),
        },
        {
            id: 4,
            title: "Reembolso de Transação",
            description:
                "Enviada automaticamente ao cliente se seu pedido for reembolsado (se você selecionar esta opção).",
            value: true,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(4, value),
        },
        {
            id: 5,
            title: "Erro de Pagamento",
            description:
                "Enviada automaticamente ao cliente se o pagamento não puder ser processado durante o checkout.",
            value: false,
            onChange: (value: boolean) =>
                handlePushNotificationsChange(5, value),
        },
    ]);

    const handlePushNotificationsChange = (id: number, value: boolean) => {
        setPushNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item))
        );
    };

    return (
        <Item
            title="Notificações Push"
            description="Receba alertas para novos pedidos, atualizações de processamento de pedidos e quando os pedidos são concluídos ou cancelados."
        >
            <div className="flex flex-col gap-4 max-md:gap-0">
                {pushNotifications.map((item) => (
                    <div
                        className="flex justify-between items-center gap-4 py-4"
                        key={item.id}
                    >
                        <div className="">
                            <div className="font-semibold">{item.title}</div>
                            <div className="mt-1 text-body-sm font-medium text-gray-500">
                                {item.description}
                            </div>
                        </div>
                        <Switch checked={item.value} onChange={item.onChange} />
                    </div>
                ))}
            </div>
        </Item>
    );
};

export default Notifications;
