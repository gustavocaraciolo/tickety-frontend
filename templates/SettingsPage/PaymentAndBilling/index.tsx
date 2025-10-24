import { useState } from "react";
import Field from "@/components/Field";
import Item from "../Item";
import Payment from "./Payment";
import Plan from "./Plan";

const PaymentAndBilling = ({}) => {
    const [emailAddress, setEmailAddress] = useState("");

    return (
        <>
            <Item
                title="Pagamento"
                description="Gerencie seus métodos de pagamento com segurança. Adicione, atualize ou remova seus cartões de crédito/débito."
            >
                <Payment />
            </Item>
            <Item
                title="Cobrança"
                description="Revise e atualize suas informações de cobrança para garantir pagamentos precisos e pontuais."
            >
                <Plan />
            </Item>
            <Item
                title="Endereço de email"
                description="A fatura será enviada para este endereço de email."
            >
                <Field
                    label="Endereço de Email"
                    placeholder="Digite o endereço de email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                />
            </Item>
        </>
    );
};

export default PaymentAndBilling;
