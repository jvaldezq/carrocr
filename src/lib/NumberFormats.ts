export enum CURRENCIES {
  CRC = 'CRC',
  USD = 'USD',
}

export const LOCALES: Record<CURRENCIES, string> = {
  [CURRENCIES.CRC]: 'es-CR',
  [CURRENCIES.USD]: 'en-US',
};

const currencyFormatters: Record<CURRENCIES, Intl.NumberFormat> = {
  [CURRENCIES.CRC]: new Intl.NumberFormat(LOCALES[CURRENCIES.CRC], {
    style: 'currency',
    currency: CURRENCIES.CRC,
  }),
  [CURRENCIES.USD]: new Intl.NumberFormat(LOCALES[CURRENCIES.USD], {
    style: 'currency',
    currency: CURRENCIES.USD,
  }),
};

export const MoneyFormatter = (
  number: number = 0,
  currency: CURRENCIES = CURRENCIES.CRC,
): string => {
  return currencyFormatters[currency].format(number);
};

const numberFormatter = new Intl.NumberFormat();

export const NumberFormatter = (number: number): string => {
  return numberFormatter.format(number);
};
