/**
 * Utilitário para detectar o país do usuário
 * Suporta detecção por subdomínio (br.tickety.local, ao.tickety.local, mz.tickety.local)
 * ou por localStorage como fallback
 */

export interface CountryInfo {
  id: number;
  code: string;
  name: string;
}

const COUNTRY_MAP: Record<string, CountryInfo> = {
  'br': { id: 2, code: 'BR', name: 'Brasil' },
  'ao': { id: 1, code: 'AO', name: 'Angola' },
  'mz': { id: 3, code: 'MZ', name: 'Moçambique' },
};

const DEFAULT_COUNTRY = COUNTRY_MAP['ao']; // Angola como padrão

/**
 * Detecta o país baseado no subdomínio da URL
 * Exemplos:
 * - br.tickety.local -> Brasil (id: 2)
 * - ao.tickety.local -> Angola (id: 1)
 * - mz.tickety.local -> Moçambique (id: 3)
 * - localhost:3002 -> null (sem subdomínio)
 */
export function detectCountryFromSubdomain(): CountryInfo | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;
  
  // Extrair subdomínio
  const parts = hostname.split('.');
  
  // Se for localhost ou IP, não há subdomínio
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return null;
  }

  // Pegar o primeiro segmento (subdomínio)
  const subdomain = parts[0].toLowerCase();
  
  // Verificar se é um país conhecido
  if (COUNTRY_MAP[subdomain]) {
    return COUNTRY_MAP[subdomain];
  }

  return null;
}

/**
 * Obtém o país do localStorage
 */
export function getCountryFromStorage(): CountryInfo | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem('selected_country');
  if (!stored) {
    return null;
  }

  try {
    const country = JSON.parse(stored) as CountryInfo;
    // Validar se o país existe no mapa
    if (COUNTRY_MAP[country.code.toLowerCase()]) {
      return country;
    }
  } catch (e) {
    // Invalid JSON
  }

  return null;
}

/**
 * Salva o país no localStorage
 */
export function saveCountryToStorage(country: CountryInfo): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('selected_country', JSON.stringify(country));
}

/**
 * Detecta o país atual do usuário
 * Prioridade:
 * 1. Subdomínio da URL
 * 2. localStorage
 * 3. País padrão (Angola)
 */
export function getCurrentCountry(): CountryInfo {
  // Tentar detectar por subdomínio primeiro
  const subdomainCountry = detectCountryFromSubdomain();
  if (subdomainCountry) {
    // Salvar no localStorage para próximas visitas
    saveCountryToStorage(subdomainCountry);
    return subdomainCountry;
  }

  // Tentar obter do localStorage
  const storageCountry = getCountryFromStorage();
  if (storageCountry) {
    return storageCountry;
  }

  // Retornar país padrão
  return DEFAULT_COUNTRY;
}

/**
 * Obtém o ID do país atual
 */
export function getCurrentCountryId(): number {
  return getCurrentCountry().id;
}

