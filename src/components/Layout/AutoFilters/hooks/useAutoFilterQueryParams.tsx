'use client';

import { useQueryState } from 'nuqs';

export function useAutoFilterQueryParams() {
  const [minPrice, setMinPrice] = useQueryState('minPrice', {
    parse: Number,
    serialize: String,
  });
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', {
    parse: Number,
    serialize: String,
  });
  const [minYear, setMinYear] = useQueryState('minYear', {
    parse: Number,
    serialize: String,
  });
  const [maxYear, setMaxYear] = useQueryState('maxYear', {
    parse: Number,
    serialize: String,
  });
  const [makeId, setMakeId] = useQueryState('makeId');
  const [modelId, setModelId] = useQueryState('modelId');
  const [trimId, setTrimId] = useQueryState('trimId');
  const [fuelType, setFuelType] = useQueryState('fuelType', {
    parse: Number,
    serialize: String,
  });
  const [transType, setTransType] = useQueryState('transType', {
    parse: Number,
    serialize: String,
  });
  const [stateName, setStateName] = useQueryState('stateName', {
    parse: Number,
    serialize: String,
  });

  return {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    makeId,
    setMakeId,
    modelId,
    setModelId,
    trimId,
    setTrimId,
    fuelType,
    setFuelType,
    transType,
    setTransType,
    stateName,
    setStateName,
  };
}
