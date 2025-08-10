'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useGetMakes } from '@/context/CarEntryContext/services/useGetMakes';
import { useGetModels } from '@/context/CarEntryContext/services/useGetModels';
import { useGetTrims } from '@/context/CarEntryContext/services/useGetTrims';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetFilterDefaults } from './services/useGetFilterDefaults';
import { Switch } from '@/components/ui/switch';
import {
  fuelType_options,
  transType_options,
  states_options,
} from '@/lib/definitions';
import { useGetCatalogCount } from './services/useGetCatalogCount';

export const Filters = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  // Local UI state for filters
  const searchParams = useSearchParams();
  const router = useRouter();

  const [yearMin, setYearMin] = useState<string | undefined>(
    searchParams.get('yearMin') || undefined,
  );
  const [yearMax, setYearMax] = useState<string | undefined>(
    searchParams.get('yearMax') || undefined,
  );

  const [makeId, setMakeId] = useState<string | undefined>(
    searchParams.get('makeId') || undefined,
  );
  const [modelId, setModelId] = useState<string | undefined>(
    searchParams.get('modelId') || undefined,
  );
  const [trimId, setTrimId] = useState<string | undefined>(
    searchParams.get('trimId') || undefined,
  );

  const { data: defaults } = useGetFilterDefaults();

  const [price, setPrice] = useState<[number, number]>([0, 0]);

  // Body type (aka Tipo de carro)
  const [bodyNames, setBodyNames] = useState<string[]>(
    (searchParams.get('bodyName') || '').split(',').filter(Boolean),
  );
  // Fuel type / Transmission type
  const [fuelTypes, setFuelTypes] = useState<string[]>(
    (searchParams.get('fuelType') || '').split(',').filter(Boolean),
  );
  const [transTypes, setTransTypes] = useState<string[]>(
    (searchParams.get('transType') || '').split(',').filter(Boolean),
  );
  // State (Provincia)
  const [states, setStates] = useState<string[]>(
    (searchParams.get('stateName') || '').split(',').filter(Boolean),
  );
  // Toggles
  const [recentOnly, setRecentOnly] = useState(
    (searchParams.get('recentListingsOnlyTF') || 'false') === 'true',
  );
  const [verifiedOnly, setVerifiedOnly] = useState(
    (searchParams.get('verifiedAcctsOnlyTF') || 'false') === 'true',
  );

  const { data: makes = [] } = useGetMakes();
  const { data: models = [] } = useGetModels(makeId);
  const { data: trims = [] } = useGetTrims(modelId);

  const years = useMemo(() => {
    if (!defaults) return [] as string[];
    const start = defaults.minYear;
    const end = defaults.maxYear;
    const arr = [] as string[];
    for (let y = end; y >= start; y--) arr.push(String(y));
    return arr;
  }, [defaults]);

  const carTypes = ['SUV', 'Sedan', '4X4'];

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    if (!button || !text) return;

    // Initial state - hidden text and small button
    gsap.set(text, { opacity: 0, x: 20, display: 'none' });
    gsap.set(button, { width: 'auto' });

    // Animation timeline
    const tl = gsap.timeline({ delay: 2 });

    // Get viewport width to determine if mobile or desktop
    const isMobile = window.innerWidth < 768; // 768px breakpoint
    const expandedWidth = isMobile ? '50%' : '20%';

    // Expand button and show text
    tl.to(button, {
      width: expandedWidth,
      borderRadius: '9999px',
      duration: 0.5,
      ease: 'power2.out',
    })
      .set(text, { display: 'inline-block' })
      .to(
        text,
        {
          opacity: 1,
          x: 10,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.2',
      )
      .to({}, { duration: 2 })
      .to(
        text,
        {
          opacity: 0,
          x: 20,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(text, { display: 'none' });
          },
        },
        '-=0.1',
      )
      .to(button, {
        width: 'auto',
        duration: 0.4,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  // Initialize price and year bounds from server defaults once loaded
  useEffect(() => {
    if (!defaults) return;

    const spMin = Number(searchParams.get('priceMin'));
    const spMax = Number(searchParams.get('priceMax'));

    const min = Number.isFinite(spMin) && spMin > 0 ? spMin : defaults.minPrice;
    const max = Number.isFinite(spMax) && spMax > 0 ? spMax : defaults.maxPrice;

    setPrice([
      Math.max(defaults.minPrice, Math.min(min, max)),
      Math.min(defaults.maxPrice, Math.max(min, max)),
    ]);

    if (!searchParams.get('yearMin')) setYearMin(undefined);
    if (!searchParams.get('yearMax')) setYearMax(undefined);
  }, [defaults, searchParams]);

  // Build params for live catalog count
  const catalogParams = useMemo(() => {
    const params: Record<string, unknown> = {
      minPrice: price?.[0],
      maxPrice: price?.[1],
      page: 1,
      pageSize: 20,
      returnCountOnlyTF: true,
    };
    if (yearMin) params.minYear = Number(yearMin);
    if (yearMax) params.maxYear = Number(yearMax);
    if (makeId) params.makeID = Number(makeId);
    if (modelId) params.modelID = Number(modelId);
    if (trimId) params.trimID = Number(trimId);
    if (bodyNames.length) params.bodyName = bodyNames.join(',');
    if (fuelTypes.length) params.fuelType = fuelTypes.join(',');
    if (transTypes.length) params.transType = transTypes.join(',');
    if (states.length) params.stateName = states.join(',');
    if (recentOnly) params.recentListingsOnlyTF = true;
    if (verifiedOnly) params.verifiedAcctsOnlyTF = true;
    return params;
  }, [
    price,
    yearMin,
    yearMax,
    makeId,
    modelId,
    trimId,
    bodyNames,
    fuelTypes,
    transTypes,
    states,
    recentOnly,
    verifiedOnly,
  ]);

  const { data: resultsCount = 0, isFetching: isCounting } = useGetCatalogCount(
    catalogParams,
  );

  const toggle = (
    list: string[],
    value: string,
    setter: (v: string[]) => void,
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const onApply = () => {
    const params = new URLSearchParams();
    if (yearMin) params.set('yearMin', yearMin);
    if (yearMax) params.set('yearMax', yearMax);
    if (makeId) params.set('makeId', makeId);
    if (modelId) params.set('modelId', modelId);
    if (trimId) params.set('trimId', trimId);
    if (price?.length === 2) {
      params.set('priceMin', String(price[0]));
      params.set('priceMax', String(price[1]));
    }
    // Required API params
    params.set('page', '1');
    params.set('pageSize', '20');
    params.set('returnCountOnlyTF', 'true');

    // Optional filters
    if (bodyNames.length) params.set('bodyName', bodyNames.join(','));
    if (fuelTypes.length) params.set('fuelType', fuelTypes.join(','));
    if (transTypes.length) params.set('transType', transTypes.join(','));
    if (states.length) params.set('stateName', states.join(','));
    if (recentOnly) params.set('recentListingsOnlyTF', 'true');
    if (verifiedOnly) params.set('verifiedAcctsOnlyTF', 'true');

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const onClear = () => {
    setYearMin(undefined);
    setYearMax(undefined);
    setMakeId(undefined);
    setModelId(undefined);
    setTrimId(undefined);
    if (defaults) {
      setPrice([defaults.minPrice, defaults.maxPrice]);
    } else {
      setPrice([0, 0]);
    }
    setBodyNames([]);
    setFuelTypes([]);
    setTransTypes([]);
    setStates([]);
    setRecentOnly(false);
    setVerifiedOnly(false);
    router.push('?');
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          ref={buttonRef}
          className="fixed bottom-[70px] right-2 z-10 bg-black/90 hover:bg-black rounded-full p-2 md:p-[0.5rem] overflow-hidden flex items-center"
          aria-label="Search"
        >
          <Search className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" />
          <span
            ref={textRef}
            className="text-white font-medium whitespace-nowrap overflow-hidden ml-2 hidden"
          >
            Buscar automóvil
          </span>
        </button>
      </DrawerTrigger>

      <DrawerContent className="pb-4 max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DrawerTitle className="text-2xl font-semibold">Filtros</DrawerTitle>
            <span className="text-sm text-neutral-600">
              {isCounting ? 'Calculando…' : `${resultsCount} resultados`}
            </span>
          </div>
          <DrawerClose asChild>
            <button className="p-2 text-black hover:opacity-70">
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-2 grid gap-6">
          {/* Año */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">Año</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Select
                key={`ymin-${yearMin ?? 'empty'}`}
                value={yearMin}
                onValueChange={(v) => {
                  setYearMin(v);
                  if (yearMax && Number(v) > Number(yearMax)) {
                    setYearMax(v);
                  }
                }}
                >
                  <SelectTrigger className={cn('w-full', yearMin ? 'border-black' : '')}>
                  <SelectValue placeholder="Mínimo" />
                  </SelectTrigger>
                  <SelectContent>
                  {years.map((y) => (
                    <SelectItem
                      key={`ymin-${y}`}
                      value={y}
                      disabled={!!yearMax && Number(y) > Number(yearMax)}
                    >
                      {y}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* Clear button removed; keep active border style */}
              </div>
              <div className="relative">
                <Select
                key={`ymax-${yearMax ?? 'empty'}`}
                value={yearMax}
                onValueChange={(v) => {
                  setYearMax(v);
                  if (yearMin && Number(v) < Number(yearMin)) {
                    setYearMin(v);
                  }
                }}
                >
                  <SelectTrigger className={cn('w-full', yearMax ? 'border-black' : '')}>
                  <SelectValue placeholder="Máximo" />
                  </SelectTrigger>
                  <SelectContent>
                  {years.map((y) => (
                    <SelectItem
                      key={`ymax-${y}`}
                      value={y}
                      disabled={!!yearMin && Number(y) < Number(yearMin)}
                    >
                      {y}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* Clear button removed; keep active border style */}
              </div>
            </div>
          </section>

          {/* Marca / Modelo / Edición */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Marca, Modelo y Edición
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Select
                key={`make-${makeId ?? 'empty'}`}
                value={makeId}
                onValueChange={(v) => {
                  setMakeId(v);
                  setModelId(undefined);
                  setTrimId(undefined);
                }}
                >
                  <SelectTrigger className={cn('w-full', makeId ? 'border-black' : '')}>
                  <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                  <SelectContent>
                  {makes?.map((m) => (
                    <SelectItem key={`make-${m.value}`} value={String(m.value)}>
                      {m.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* Clear button removed; keep active border style */}
              </div>

              <div className="relative">
                <Select
                key={`model-${modelId ?? 'empty'}`}
                value={modelId}
                onValueChange={(v) => {
                  setModelId(v);
                  setTrimId(undefined);
                }}
                disabled={!makeId}
                >
                  <SelectTrigger className={cn('w-full', modelId ? 'border-black' : '')}>
                  <SelectValue placeholder="Modelo" />
                  </SelectTrigger>
                  <SelectContent>
                  {models?.map((m) => (
                    <SelectItem
                      key={`model-${m.value}`}
                      value={String(m.value)}
                    >
                      {m.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* Clear button removed; keep active border style */}
              </div>

              <div className="relative">
                <Select
                key={`trim-${trimId ?? 'empty'}`}
                value={trimId}
                onValueChange={setTrimId}
                disabled={!modelId}
                >
                  <SelectTrigger className={cn('w-full', trimId ? 'border-black' : '')}>
                  <SelectValue placeholder="Edición" />
                  </SelectTrigger>
                  <SelectContent>
                  {trims?.map((t) => (
                    <SelectItem key={`trim-${t.value}`} value={String(t.value)}>
                      {t.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* Clear button removed; keep active border style */}
              </div>
            </div>
          </section>

          {/* Precio */}
          <section className="grid gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-wide">
                Precio
              </h3>
              <div className="text-xs text-neutral-500">
                ${price[0]?.toLocaleString?.() ?? ''} - ${
                  price[1]?.toLocaleString?.() ?? ''
                }
              </div>
            </div>
            <Slider
              min={defaults?.minPrice ?? 0}
              max={defaults?.maxPrice ?? 0}
              step={1000}
              value={price}
              onValueChange={(v) => setPrice([v[0] ?? 0, v[1] ?? 100000])}
              className="py-3"
            />
            {/* Removed numeric inputs; keep slider-only in USD */}
          </section>

          {/* Tipo de carro (bodyName) */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Tipo de carro
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {carTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggle(bodyNames, t, setBodyNames)}
                  className={cn(
                    'border rounded-md px-3 py-2 text-sm',
                    bodyNames.includes(t)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-200',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Transmisión (transType) */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Transmisión
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {transType_options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(transTypes, String(opt.value), setTransTypes)}
                  className={cn(
                    'border rounded-md px-3 py-2 text-sm',
                    transTypes.includes(String(opt.value))
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-200',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Combustible (fuelType) */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Combustible
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {fuelType_options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(fuelTypes, String(opt.value), setFuelTypes)}
                  className={cn(
                    'border rounded-md px-3 py-2 text-sm',
                    fuelTypes.includes(String(opt.value))
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-200',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Provincia (stateName) */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Provincia
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {states_options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(states, String(opt.value), setStates)}
                  className={cn(
                    'border rounded-md px-3 py-2 text-sm',
                    states.includes(String(opt.value))
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-neutral-200',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Switches */}
          <section className="grid gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wide">
              Otras opciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between border rounded-md px-3 py-2">
                <span className="text-sm">Solo anuncios recientes</span>
                <Switch checked={recentOnly} onCheckedChange={setRecentOnly} />
              </div>
              <div className="flex items-center justify-between border rounded-md px-3 py-2">
                <span className="text-sm">Solo cuentas verificadas</span>
                <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
              </div>
            </div>
          </section>
        </div>

        <DrawerFooter className="px-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-black text-black"
              onClick={onClear}
            >
              Limpiar
            </Button>
            <Button
              className="flex-1 bg-black text-white hover:bg-black/90"
              onClick={onApply}
            >
              Ver resultados
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
