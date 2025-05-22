'use client';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { PriceFilter } from '@/components/Layout/AutoFilters/PriceFilter';
import { YearFilter } from '@/components/Layout/AutoFilters/YearFilter';
import { Form, FormRenderProps } from 'react-final-form';
import { debounce, isEqual } from 'lodash';
import { CarFilters } from '@/components/Layout/AutoFilters/CarFilters';
import { CURRENCIES } from '@/lib/NumberFormats';
import { useGetDefaultFilters } from '@/components/Layout/AutoFilters/service/getDefaultFilters';
import { useGetFiltersCount } from '@/components/Layout/AutoFilters/service/getFiltersCount';

export interface AutoFiltersType {
  price: number[];
  minPrice?: number;
  maxPrice?: number;
  year: number[];
  minYear?: number;
  maxYear?: number;
  currencyType: CURRENCIES;
  makeId: string;
  modelId: string;
  trimId: string;
  page?: number;
  pageSize?: number;
  fuelType?: number;
  transType?: number;
  stateName?: number;
}

const getDifferences = (obj1: AutoFiltersType, obj2: AutoFiltersType) => {
  let differences = 0;

  Object.keys({ ...obj1, ...obj2 }).forEach((key) => {
    if (
      !isEqual(
        obj1[key as keyof AutoFiltersType],
        obj2[key as keyof AutoFiltersType],
      )
    ) {
      differences++;
    }
  });
  return differences;
};

export const AutoFilters = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('filters') || '';
  const filters = search ? JSON.parse(atob(search)) : '';
  const path = usePathname();
  const { data: defaultFilters } = useGetDefaultFilters();

  const defaultInitialValues = {
    price: [defaultFilters?.minPrice, defaultFilters?.maxPrice],
    year: [defaultFilters?.minYear, defaultFilters?.maxYear],
    ...defaultFilters,
  } as AutoFiltersType;

  const differencesCount = filters
    ? getDifferences(filters, defaultInitialValues)
    : 0;

  const minPrice = filters?.minPrice || defaultFilters?.minPrice;
  const maxPrice = filters?.maxPrice || defaultFilters?.maxPrice;
  const minYear = filters?.minYear || defaultFilters?.minYear;
  const maxYear = filters?.maxYear || defaultFilters?.maxYear;

  const initialValues = {
    ...defaultInitialValues,
    ...filters,
    price: [minPrice, maxPrice],
    year: [minYear, maxYear],
  };

  if (path.includes('draft')) {
    return null;
  }

  return (
    <Drawer.Root
      direction="top"
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      handleOnly={true}
    >
      <Drawer.Trigger
        className={cn(
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
          'shadow-lg',
          'w-full',
          'h-full',
          'sm:w-[640px]',
          'h-10 px-4 py-2',
          'animate-fade',
          'animate-once',
          'animate-duration-500',
          'animate-ease-linear',
          'rounded-xl',
          'border-[0.5px]',
          'border-tertiary/[0.5]',
          'border-solid',
          'cursor-pointer',
          'transition-all',
          'duration-300',
          'hover:shadow-sm',
          'text-tertiary/[0.9]',
          'hover:bg-primary',
          'hover:border-primary',
          'hover:text-white',
          'font-light',
          'tracking-wider',
          'text-sm',
          differencesCount > 2 ? 'bg-primary text-white' : '',
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <p>
          {differencesCount > 2
            ? `(${differencesCount - 2} ${differencesCount - 2 > 1 ? 'Filtros' : 'Filtro'})`
            : 'Buscar anuncios'}
        </p>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/35 z-10" />
        <Drawer.Content
          className={cn(
            'top-0',
            'sm:top-1',
            'left-0',
            'right-0',
            'fixed',
            'z-40',
            'outline-none',
            'w-full',
            'sm:w-[640px]',
            'md:w-[670px]',
            'h-full',
            'sm:h-fit',
            'sm:max-h-[99%]',
            'mx-auto',
            'flex',
          )}
          style={{ '--initial-transform': 'calc(100% + 8px)' } as CSSProperties}
        >
          <div
            className={cn(
              'bg-white',
              'w-full',
              'h-full',
              'sm:max-h-[99%]',
              'sm:h-fit',
              'grow',
              'flex',
              'flex-col',
              'sm:rounded-2xl',
              'relative',
              'py-20',
              'overflow-y-scroll',
            )}
          >
            <Drawer.Title
              className={cn(
                'bg-white',
                'flex',
                'items-center',
                'justify-between',
                'gap-2',
                'absolute',
                'w-full',
                'top-0',
                'left-0',
                'px-4',
                'py-3',
                'sm:rounded-t-2xl',
                'text-tertiary',
                'font-light',
                'tracking-wider',
                'border-b',
                'border-tertiary/[0.1]',
                'border-solid',
              )}
            >
              <p className="w-full text-center text-sm font-semibold">
                Filtros
              </p>
              <Drawer.Close>
                <X className="h-4 w-4 hover:scale-110 transition duration-300 text-gray-700" />
              </Drawer.Close>
            </Drawer.Title>
            <FiltersFormWrapper
              setDrawerOpen={setDrawerOpen}
              initialValues={initialValues}
              defaultInitialValues={defaultInitialValues}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

interface FiltersFormWrapperProps {
  setDrawerOpen: (open: boolean) => void;
  initialValues: AutoFiltersType;
  defaultInitialValues: AutoFiltersType;
}

const FiltersFormWrapper = ({
  setDrawerOpen,
  initialValues,
  defaultInitialValues,
}: FiltersFormWrapperProps) => {
  const { data, mutateAsync, isPending } = useGetFiltersCount();
  const { replace } = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((values: AutoFiltersType) => {
      mutateAsync({
        minPrice: values.price[0],
        maxPrice: values.price[1],
        minYear: values.year[0],
        maxYear: values.year[1],
        currencyType: values.currencyType,
        page: values.page,
        pageSize: values.pageSize,
        makeId: values.makeId,
        modelId: values.modelId,
        trimId: values.trimId,
        fuelType: values.fuelType,
        transType: values.transType,
        stateName: values.stateName,
      } as AutoFiltersType);
    }, 500),
    [],
  );

  const onSubmit = useCallback(
    (values: AutoFiltersType) => {
      const params = new URLSearchParams();
      const filters = JSON.stringify({
        minPrice: values.price[0],
        maxPrice: values.price[1],
        minYear: values.year[0],
        maxYear: values.year[1],
        currencyType: values.currencyType,
        page: values.page,
        pageSize: values.pageSize,
        makeId: values.makeId,
        modelId: values.modelId,
        trimId: values.trimId,
        fuelType: values.fuelType,
        transType: values.transType,
        stateName: values.stateName,
      });
      params.set('filters', btoa(filters));
      replace(`/autos?${params.toString()}`);
      setDrawerOpen(false);
    },
    [replace, setDrawerOpen],
  );

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {(formProps) => (
        <FiltersForm
          {...formProps}
          debouncedSubmit={debouncedSubmit}
          defaultInitialValues={defaultInitialValues}
          count={data?.pages?.listings}
          isLoading={isPending}
        />
      )}
    </Form>
  );
};

type FormProps = FormRenderProps<AutoFiltersType> & {
  debouncedSubmit: (values: AutoFiltersType) => void;
  defaultInitialValues: AutoFiltersType;
  count?: number;
  isLoading?: boolean;
};

const FiltersForm = (props: FormProps) => {
  const {
    debouncedSubmit,
    form,
    handleSubmit,
    defaultInitialValues,
    count = 0,
    isLoading = false,
    ...rest
  } = props;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (props.dirty) {
      debouncedSubmit(rest.values);
    }
  }, [rest.dirty, debouncedSubmit, rest.values, props.dirty]);

  const handleClear = useCallback(() => {
    form.reset(defaultInitialValues);
  }, [defaultInitialValues, form]);

  return (
    <form onSubmit={handleSubmit}>
      <section
        className={cn(
          'px-4',
          'flex',
          'flex-col',
          'items-start',
          'justify-start',
          'gap-4',
        )}
      >
        <PriceFilter
          {...props}
          minPrice={defaultInitialValues?.minPrice}
          maxPrice={defaultInitialValues?.maxPrice}
        />
        <hr className="w-full bg-tertiary" />
        <YearFilter
          {...props}
          minYear={defaultInitialValues?.minYear}
          maxYear={defaultInitialValues?.maxYear}
        />
        <hr className="w-full bg-tertiary" />
        <CarFilters {...props} />
      </section>
      <div
        className={cn(
          'bg-white',
          'flex',
          'items-center',
          'justify-between',
          'gap-2',
          'fixed',
          'w-full',
          'bottom-0',
          'left-0',
          'p-4',
          'sm:rounded-b-2xl',
        )}
      >
        <Button variant="ghost" type="button" onClick={handleClear}>
          Limpiar
        </Button>
        <Button className="rounded-2xl" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader className="animate-spin animate-infinite animate-duration-500 animate-delay-500 animate-ease-in" />
          ) : count > 0 ? (
            `${count} anuncios`
          ) : (
            'Todos los anuncios'
          )}
        </Button>
      </div>
    </form>
  );
};
