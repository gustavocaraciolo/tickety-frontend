'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/lib/api';

interface Country {
  id: number;
  code: string;
  name: string;
  currency_code: string;
  currency_symbol: string;
  timezone: string;
  phone_code: string;
  is_active: boolean;
}

interface State {
  id: number;
  country_id: number;
  code: string;
  name: string;
  is_active: boolean;
}

interface Category {
  id: number;
  slug: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

interface SystemContextType {
  countries: Country[];
  states: State[];
  categories: Category[];
  loading: boolean;
  getStatesByCountry: (countryId: number) => State[];
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = async () => {
    try {
      setLoading(true);
      
      // Carregar dados estáticos por enquanto
      // Em produção, isso viria da API
      const mockCountries: Country[] = [
        {
          id: 1,
          code: 'AO',
          name: 'Angola',
          currency_code: 'AOA',
          currency_symbol: 'Kz',
          timezone: 'Africa/Luanda',
          phone_code: '+244',
          is_active: true,
        },
        {
          id: 2,
          code: 'BR',
          name: 'Brasil',
          currency_code: 'BRL',
          currency_symbol: 'R$',
          timezone: 'America/Sao_Paulo',
          phone_code: '+55',
          is_active: true,
        },
        {
          id: 3,
          code: 'MZ',
          name: 'Moçambique',
          currency_code: 'MZN',
          currency_symbol: 'MT',
          timezone: 'Africa/Maputo',
          phone_code: '+258',
          is_active: true,
        },
      ];

      const mockStates: State[] = [
        // Angola
        { id: 1, country_id: 1, code: 'LU', name: 'Luanda', is_active: true },
        { id: 2, country_id: 1, code: 'BI', name: 'Benguela', is_active: true },
        { id: 3, country_id: 1, code: 'HU', name: 'Huambo', is_active: true },
        { id: 4, country_id: 1, code: 'CB', name: 'Cabinda', is_active: true },
        { id: 5, country_id: 1, code: 'CN', name: 'Cunene', is_active: true },
        { id: 6, country_id: 1, code: 'CC', name: 'Cuanza-Central', is_active: true },
        { id: 7, country_id: 1, code: 'CS', name: 'Cuanza-Sul', is_active: true },
        { id: 8, country_id: 1, code: 'HU', name: 'Huíla', is_active: true },
        { id: 9, country_id: 1, code: 'MA', name: 'Malanje', is_active: true },
        { id: 10, country_id: 1, code: 'MO', name: 'Moxico', is_active: true },
        { id: 11, country_id: 1, code: 'NA', name: 'Namibe', is_active: true },
        { id: 12, country_id: 1, code: 'UI', name: 'Uíge', is_active: true },
        { id: 13, country_id: 1, code: 'ZA', name: 'Zaire', is_active: true },
        
        // Brasil
        { id: 14, country_id: 2, code: 'SP', name: 'São Paulo', is_active: true },
        { id: 15, country_id: 2, code: 'RJ', name: 'Rio de Janeiro', is_active: true },
        { id: 16, country_id: 2, code: 'MG', name: 'Minas Gerais', is_active: true },
        { id: 17, country_id: 2, code: 'RS', name: 'Rio Grande do Sul', is_active: true },
        { id: 18, country_id: 2, code: 'PR', name: 'Paraná', is_active: true },
        { id: 19, country_id: 2, code: 'SC', name: 'Santa Catarina', is_active: true },
        { id: 20, country_id: 2, code: 'BA', name: 'Bahia', is_active: true },
        { id: 21, country_id: 2, code: 'GO', name: 'Goiás', is_active: true },
        { id: 22, country_id: 2, code: 'PE', name: 'Pernambuco', is_active: true },
        { id: 23, country_id: 2, code: 'CE', name: 'Ceará', is_active: true },
        { id: 24, country_id: 2, code: 'DF', name: 'Distrito Federal', is_active: true },
        
        // Moçambique
        { id: 25, country_id: 3, code: 'MP', name: 'Maputo', is_active: true },
        { id: 26, country_id: 3, code: 'GA', name: 'Gaza', is_active: true },
        { id: 27, country_id: 3, code: 'IN', name: 'Inhambane', is_active: true },
        { id: 28, country_id: 3, code: 'SO', name: 'Sofala', is_active: true },
        { id: 29, country_id: 3, code: 'MA', name: 'Manica', is_active: true },
        { id: 30, country_id: 3, code: 'TE', name: 'Tete', is_active: true },
        { id: 31, country_id: 3, code: 'ZA', name: 'Zambézia', is_active: true },
        { id: 32, country_id: 3, code: 'NI', name: 'Nampula', is_active: true },
        { id: 33, country_id: 3, code: 'CA', name: 'Cabo Delgado', is_active: true },
        { id: 34, country_id: 3, code: 'NA', name: 'Niassa', is_active: true },
      ];

      const mockCategories: Category[] = [
        { id: 1, slug: 'music', icon: 'music.svg', color: '#8B5CF6', is_active: true, sort_order: 1 },
        { id: 2, slug: 'technology', icon: 'technology.svg', color: '#3B82F6', is_active: true, sort_order: 2 },
        { id: 3, slug: 'sports', icon: 'sports.svg', color: '#10B981', is_active: true, sort_order: 3 },
        { id: 4, slug: 'business', icon: 'business.svg', color: '#F59E0B', is_active: true, sort_order: 4 },
        { id: 5, slug: 'education', icon: 'education.svg', color: '#EF4444', is_active: true, sort_order: 5 },
        { id: 6, slug: 'arts', icon: 'arts.svg', color: '#EC4899', is_active: true, sort_order: 6 },
        { id: 7, slug: 'food', icon: 'food.svg', color: '#F97316', is_active: true, sort_order: 7 },
        { id: 8, slug: 'health', icon: 'health.svg', color: '#059669', is_active: true, sort_order: 8 },
      ];

      setCountries(mockCountries);
      setStates(mockStates);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Failed to load system data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatesByCountry = (countryId: number): State[] => {
    return states.filter(state => state.country_id === countryId);
  };

  const value = {
    countries,
    states,
    categories,
    loading,
    getStatesByCountry,
  };

  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}

