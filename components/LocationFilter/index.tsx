"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";
import { SelectOption } from "@/types/select";

interface LocationFilterProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationFilter = ({ isOpen, onClose }: LocationFilterProps) => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<SelectOption | null>(null);

    const countries = [
        { id: 1, name: "Brasil" },
        { id: 2, name: "Angola" },
        { id: 3, name: "Moçambique" }
    ];

    const states = {
        1: [
            { id: 1, name: "São Paulo" },
            { id: 2, name: "Rio de Janeiro" },
            { id: 3, name: "Minas Gerais" },
            { id: 4, name: "Rio Grande do Sul" },
            { id: 5, name: "Paraná" },
            { id: 6, name: "Santa Catarina" },
            { id: 7, name: "Bahia" },
            { id: 8, name: "Goiás" },
            { id: 9, name: "Pernambuco" },
            { id: 10, name: "Ceará" }
        ],
        2: [
            { id: 11, name: "Luanda" },
            { id: 12, name: "Huambo" },
            { id: 13, name: "Lobito" },
            { id: 14, name: "Benguela" },
            { id: 15, name: "Lubango" },
            { id: 16, name: "Malanje" },
            { id: 17, name: "Namibe" },
            { id: 18, name: "Cabinda" },
            { id: 19, name: "Uíge" },
            { id: 20, name: "Kuito" }
        ],
        3: [
            { id: 21, name: "Maputo" },
            { id: 22, name: "Beira" },
            { id: 23, name: "Nampula" },
            { id: 24, name: "Chimoio" },
            { id: 25, name: "Tete" },
            { id: 26, name: "Quelimane" },
            { id: 27, name: "Xai-Xai" },
            { id: 28, name: "Inhambane" },
            { id: 29, name: "Lichinga" },
            { id: 30, name: "Pemba" }
        ]
    };

    const dateOptions = [
        { id: 1, name: "Hoje" },
        { id: 2, name: "Amanhã" },
        { id: 3, name: "Esta Semana" },
        { id: 4, name: "Este Mês" },
        { id: 5, name: "Próximo Mês" },
        { id: 6, name: "Data Personalizada" }
    ];

    const handleApply = () => {
        // Construir query string com os filtros
        const params = new URLSearchParams();
        
        if (selectedCountry) {
            params.append('country', selectedCountry.id.toString());
        }
        if (selectedState) {
            params.append('state', selectedState.id.toString());
        }
        if (selectedDate) {
            params.append('date', selectedDate.id.toString());
        }
        
        // Redirecionar para página de eventos com filtros
        const queryString = params.toString();
        const url = queryString ? `/shop/events?${queryString}` : '/shop/events';
        router.push(url);
        onClose();
    };


    const getStateOptions = () => {
        if (!selectedCountry) {
            // Se nenhum país selecionado, mostrar todos os estados
            return Object.values(states).flat();
        }
        return states[selectedCountry.id as keyof typeof states] || [];
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Filtros de Localização
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200"
                    >
                        <Icon name="close" className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6 mt-6">
                    {/* País */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            País
                        </label>
                        <Select
                            value={selectedCountry}
                            onChange={(value) => {
                                setSelectedCountry(value);
                                setSelectedState(null); // Reset state when country changes
                            }}
                            options={countries}
                            placeholder="Selecione um país"
                        />
                    </div>

                    {/* Estado/Região */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado/Região
                        </label>
                        <Select
                            value={selectedState}
                            onChange={(value) => setSelectedState(value)}
                            options={getStateOptions()}
                            placeholder="Selecione um estado"
                        />
                    </div>

                    {/* Data */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quando
                        </label>
                        <Select
                            value={selectedDate}
                            onChange={(value) => setSelectedDate(value)}
                            options={dateOptions}
                            placeholder="Selecione uma data"
                        />
                    </div>

                    {/* Data Personalizada */}
                    {selectedDate && selectedDate.id === 6 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data Específica
                            </label>
                            <Field
                                type="date"
                                value=""
                                onChange={() => {}}
                                placeholder="Selecione uma data"
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                    <Button
                        onClick={handleApply}
                        isPrimary
                        isLarge
                    >
                        Aplicar Filtros
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LocationFilter;
