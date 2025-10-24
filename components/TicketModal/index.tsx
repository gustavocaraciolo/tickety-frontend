import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Image from "@/components/Image";
import QRCode from "qrcode";

type TicketData = {
    id: number;
    eventName: string;
    organizer: string;
    ticketType: string;
    eventDate: string;
    eventTime: string;
    price: string;
    eventImage: string;
    ticketId: string;
    qrCode: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    ticketData: TicketData | null;
};

const TicketModal = ({ isOpen, onClose, ticketData }: Props) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

    useEffect(() => {
        if (ticketData) {
            const generateQRCode = async () => {
                try {
                    const qrData = `ticket:${ticketData.ticketId}|event:${ticketData.eventName}|date:${ticketData.eventDate}`;
                    const qrCodeURL = await QRCode.toDataURL(qrData, {
                        width: 200,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    });
                    setQrCodeDataURL(qrCodeURL);
                } catch (error) {
                    console.error('Erro ao gerar QR Code:', error);
                }
            };
            generateQRCode();
        }
    }, [ticketData]);

    const handleDownload = async () => {
        setIsDownloading(true);
        // Simular download
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDownloading(false);
        onClose();
    };

    if (!ticketData) return null;

    return (
        <Modal
            classWrapper="!max-w-2xl !p-0 !rounded-2xl"
            open={isOpen}
            onClose={onClose}
        >
            <div className="relative">
                {/* Header do Ingresso */}
                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="text-2xl font-bold mb-2">Tickety</div>
                            <div className="text-sm opacity-90">Sistema de Ingressos</div>
                        </div>
                    </div>
                    {/* Ícones decorativos */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="text-white text-xl">🎫</div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="text-white text-sm">✓</div>
                    </div>
                </div>

                {/* Conteúdo do Ingresso */}
                <div className="p-8">
                    <div className="flex items-start gap-6">
                        {/* Imagem do Evento */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                className="w-full h-full object-cover"
                                src={ticketData.eventImage}
                                width={96}
                                height={96}
                                alt={ticketData.eventName}
                            />
                        </div>

                        {/* Informações do Evento */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {ticketData.eventName}
                            </h3>
                            <p className="text-gray-600 mb-1">{ticketData.organizer}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>📅 {ticketData.eventDate}</span>
                                <span>🕐 {ticketData.eventTime}</span>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                            {qrCodeDataURL ? (
                                <img
                                    src={qrCodeDataURL}
                                    alt="QR Code do Ingresso"
                                    className="w-16 h-16 rounded"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                                    Carregando...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detalhes do Ingresso */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500 mb-1">Tipo de Ingresso</div>
                            <div className="font-semibold text-gray-900">{ticketData.ticketType}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500 mb-1">Valor Pago</div>
                            <div className="font-semibold text-gray-900">{ticketData.price}</div>
                        </div>
                    </div>

                    {/* ID do Ingresso */}
                    <div className="mt-6 bg-primary-50 rounded-lg p-4">
                        <div className="text-sm text-primary-600 mb-1">ID do Ingresso</div>
                        <div className="font-mono text-lg font-bold text-primary-900">
                            {ticketData.ticketId}
                        </div>
                    </div>

                    {/* Instruções */}
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-3">
                            <div className="text-yellow-600">⚠️</div>
                            <div>
                                <div className="font-semibold text-yellow-800 mb-1">
                                    Instruções Importantes
                                </div>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Apresente este ingresso na entrada do evento</li>
                                    <li>• Mantenha o QR Code visível para validação</li>
                                    <li>• Chegue com 30 minutos de antecedência</li>
                                    <li>• Não compartilhe este ingresso com terceiros</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer com Botões */}
                <div className="px-8 pb-8">
                    <div className="flex gap-3">
                        <Button
                            className="flex-1"
                            isSecondary
                            isMedium
                            onClick={onClose}
                        >
                            Fechar
                        </Button>
                        <Button
                            className="flex-1"
                            isPrimary
                            isMedium
                            onClick={handleDownload}
                            disabled={isDownloading}
                        >
                            {isDownloading ? "Baixando..." : "Baixar PDF"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TicketModal;
