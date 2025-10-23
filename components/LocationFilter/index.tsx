"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";

interface LocationFilterProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationFilter = ({ isOpen, onClose }: LocationFilterProps) => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const countries = [
        { id: "br", name: "Brasil" },
        { id: "ao", name: "Angola" },
        { id: "mz", name: "Moçambique" }
    ];

    const states = {
        br: [
            { id: "sp", name: "São Paulo" },
            { id: "rj", name: "Rio de Janeiro" },
            { id: "mg", name: "Minas Gerais" },
            { id: "rs", name: "Rio Grande do Sul" },
            { id: "pr", name: "Paraná" },
            { id: "sc", name: "Santa Catarina" },
            { id: "ba", name: "Bahia" },
            { id: "go", name: "Goiás" },
            { id: "pe", name: "Pernambuco" },
            { id: "ce", name: "Ceará" }
        ],
        ao: [
            { id: "luanda", name: "Luanda" },
            { id: "huambo", name: "Huambo" },
            { id: "lobito", name: "Lobito" },
            { id: "benguela", name: "Benguela" },
            { id: "lubango", name: "Lubango" },
            { id: "malanje", name: "Malanje" },
            { id: "namibe", name: "Namibe" },
            { id: "cabinda", name: "Cabinda" },
            { id: "uige", name: "Uíge" },
            { id: "kuito", name: "Kuito" }
        ],
        mz: [
            { id: "maputo", name: "Maputo" },
            { id: "beira", name: "Beira" },
            { id: "nampula", name: "Nampula" },
            { id: "chimoio", name: "Chimoio" },
            { id: "tete", name: "Tete" },
            { id: "quelimane", name: "Quelimane" },
            { id: "xai-xai", name: "Xai-Xai" },
            { id: "inhambane", name: "Inhambane" },
            { id: "lichinga", name: "Lichinga" },
            { id: "pemba", name: "Pemba" }
        ]
    };

    const dateOptions = [
        { id: "today", name: "Hoje" },
        { id: "tomorrow", name: "Amanhã" },
        { id: "this-week", name: "Esta Semana" },
        { id: "this-month", name: "Este Mês" },
        { id: "next-month", name: "Próximo Mês" },
        { id: "custom", name: "Data Personalizada" }
    ];

    const handleApply = () => {
        // Construir query string com os filtros
        const params = new URLSearchParams();
        
        if (selectedCountry) {
            params.append('country', selectedCountry.id);
        }
        if (selectedState) {
            params.append('state', selectedState.id);
        }
        if (selectedDate) {
            params.append('date', selectedDate.id);
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
                <div className="flex items-center justify-between mb-4">
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

                <div className="space-y-6">
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
                    {selectedDate && selectedDate.id === "custom" && (
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
                        isMedium
                    >
                        Aplicar Filtros
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LocationFilter;
