"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    const searchParams = useSearchParams();
    const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<SelectOption | null>(null);

    const countries = [
        { id: 1, name: "Angola" },
        { id: 2, name: "Brasil" },
        { id: 3, name: "Moçambique" }
    ];

    const states = {
        // Angola (country_id: 1) - estados com IDs 1-14
        1: [
            { id: 1, name: "Luanda" },
            { id: 2, name: "Benguela" },
            { id: 3, name: "Huambo" },
            { id: 4, name: "Cabinda" },
            { id: 5, name: "Cunene" },
            { id: 6, name: "Cuanza-Central" },
            { id: 7, name: "Cuanza-Sul" },
            { id: 9, name: "Huíla" },
            { id: 10, name: "Malanje" },
            { id: 11, name: "Moxico" },
            { id: 12, name: "Namibe" },
            { id: 13, name: "Uíge" },
            { id: 14, name: "Zaire" }
        ],
        // Brasil (country_id: 2) - estados com IDs 15-25
        2: [
            { id: 15, name: "São Paulo" },
            { id: 16, name: "Rio de Janeiro" },
            { id: 17, name: "Minas Gerais" },
            { id: 18, name: "Rio Grande do Sul" },
            { id: 19, name: "Paraná" },
            { id: 20, name: "Santa Catarina" },
            { id: 21, name: "Bahia" },
            { id: 22, name: "Goiás" },
            { id: 23, name: "Pernambuco" },
            { id: 24, name: "Ceará" },
            { id: 25, name: "Distrito Federal" }
        ],
        // Moçambique (country_id: 3) - estados com IDs 26-35
        3: [
            { id: 26, name: "Maputo" },
            { id: 27, name: "Gaza" },
            { id: 28, name: "Inhambane" },
            { id: 29, name: "Sofala" },
            { id: 30, name: "Manica" },
            { id: 31, name: "Tete" },
            { id: 32, name: "Zambézia" },
            { id: 33, name: "Nampula" },
            { id: 34, name: "Cabo Delgado" },
            { id: 35, name: "Niassa" }
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

    // Inicializar valores do modal com base nos parâmetros da URL
    useEffect(() => {
        if (isOpen) {
            const countryParam = searchParams.get('country');
            const stateParam = searchParams.get('state');
            const dateParam = searchParams.get('date');

            // Inicializar país se presente na URL
            if (countryParam) {
                const countryId = parseInt(countryParam);
                const country = countries.find(c => c.id === countryId);
                setSelectedCountry(country || null);
            } else {
                setSelectedCountry(null);
            }

            // Inicializar estado se presente na URL
            if (stateParam) {
                const stateId = parseInt(stateParam);
                const allStates = Object.values(states).flat();
                const state = allStates.find(s => s.id === stateId);
                setSelectedState(state || null);
            } else {
                setSelectedState(null);
            }

            // Inicializar data se presente na URL
            if (dateParam) {
                const dateId = parseInt(dateParam);
                const date = dateOptions.find(d => d.id === dateId);
                setSelectedDate(date || null);
            } else {
                setSelectedDate(null);
            }
        }
    }, [isOpen, searchParams]);

    const handleApply = () => {
        // Construir query string preservando parâmetros existentes (search, category)
        const params = new URLSearchParams(searchParams.toString());
        
        // Atualizar ou remover filtros de localização
        if (selectedCountry) {
            params.set('country', selectedCountry.id.toString());
        } else {
            params.delete('country');
        }
        
        if (selectedState) {
            params.set('state', selectedState.id.toString());
        } else {
            params.delete('state');
        }
        
        if (selectedDate) {
            params.set('date', selectedDate.id.toString());
        } else {
            params.delete('date');
        }
        
        // Resetar página para 1 quando aplicar filtros
        params.set('page', '1');
        
        // Redirecionar para página de eventos com filtros atualizados
        const queryString = params.toString();
        const url = queryString ? `/events?${queryString}` : '/events';
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
