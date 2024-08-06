import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCpf = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos

  if (cleanedValue.length <= 11) {
    // CPF
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }else{
    return cleanedValue.substring(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }
};

export const formatDate = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length <= 8) {
    return cleanedValue
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  } else {
    return cleanedValue.substring(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  }
};

export const formatMoney = (value: string | number) => {
  let numericValue = 0;
  if (typeof value === 'string') {
    const cleanedValue = value.replace(/\D/g, '');
    numericValue = parseFloat(cleanedValue) / 100;
  }else{
    numericValue = value;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
};

export const removeNonNumeric = (value: string) => value.replace(/\D/g, '');

export const toDecimalNumber  = (value: string) => {
  const cleanedValue = value.replace(/[^\d,]/g, '');
  const numericValue = cleanedValue.replace(',', '.');
  return parseFloat(numericValue);
};
