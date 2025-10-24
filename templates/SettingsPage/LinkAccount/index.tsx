import { useState } from "react";
import Field from "@/components/Field";
import Item from "../Item";

const LinkAccount = ({}) => {
    const [linkInstagram, setLinkInstagram] = useState("");
    const [linkFacebook, setLinkFacebook] = useState("");
    const [linkTwitter, setLinkTwitter] = useState("");
    const [linkYouTube, setLinkYouTube] = useState("");

    return (
        <Item
            title="Vincular Conta"
            description="Seus clientes usarão essas informações para entrar em contato com você."
        >
            <div className="flex flex-col gap-4">
                <Field
                    label="Instagram"
                    placeholder="Digite o Instagram"
                    type="text"
                    value={linkInstagram}
                    onChange={(e) => setLinkInstagram(e.target.value)}
                />
                <Field
                    label="Facebook"
                    placeholder="Digite o Facebook"
                    type="text"
                    value={linkFacebook}
                    onChange={(e) => setLinkFacebook(e.target.value)}
                />
                <Field
                    label="Twitter"
                    placeholder="Digite o Twitter"
                    type="text"
                    value={linkTwitter}
                    onChange={(e) => setLinkTwitter(e.target.value)}
                />
                <Field
                    label="YouTube"
                    placeholder="Digite o YouTube"
                    type="text"
                    value={linkYouTube}
                    onChange={(e) => setLinkYouTube(e.target.value)}
                />
            </div>
        </Item>
    );
};

export default LinkAccount;
