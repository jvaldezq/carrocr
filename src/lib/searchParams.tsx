import { createLoader, parseAsBoolean } from 'nuqs/server';

export const coordinatesSearchParams = {
  recent: parseAsBoolean,
  acctVerified: parseAsBoolean,
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
