/**
 * Utilitários para máscaras de campos
 */

/**
 * Aplica máscara de telefone
 * @param value - Valor sem máscara
 * @returns Valor com máscara de telefone
 */
export const maskPhone = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos (9 dígitos + 2 DDD)
  const limited = numbers.slice(0, 11);
  
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
};

/**
 * Remove máscara de telefone
 * @param value - Valor com máscara
 * @returns Valor sem máscara (apenas números)
 */
export const unmaskPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Aplica máscara de Tax ID (NIF/CNPJ/CPF)
 * @param value - Valor sem máscara
 * @returns Valor com máscara
 */
export const maskTaxId = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Se tiver 9 dígitos ou menos, assume NIF (formato: 123456789)
  if (numbers.length <= 9) {
    return numbers;
  }
  // Se tiver 11 dígitos, assume CPF (formato: 123.456.789-01)
  else if (numbers.length <= 11) {
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
    }
  }
  // Se tiver 14 dígitos, assume CNPJ (formato: 12.345.678/0001-90)
  else {
    const limited = numbers.slice(0, 14);
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 5) {
      return `${limited.slice(0, 2)}.${limited.slice(2)}`;
    } else if (limited.length <= 8) {
      return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
    } else if (limited.length <= 12) {
      return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
    } else {
      return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`;
    }
  }
};

/**
 * Remove máscara de Tax ID
 * @param value - Valor com máscara
 * @returns Valor sem máscara (apenas números)
 */
export const unmaskTaxId = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Valida URL
 * @param url - URL para validar
 * @returns true se válido, false caso contrário
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // URL opcional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida email
 * @param email - Email para validar
 * @returns true se válido, false caso contrário
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

