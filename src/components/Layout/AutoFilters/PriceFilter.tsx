'use client';
import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { DualRangeSlider } from '@/components/DualRangerSlider';
import { MoneyFormatter } from '@/lib/NumberFormats';
import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { FormInput } from '@/components/Forms/Input/FormInput';

type FormProps = FormRenderProps<AutoFiltersType> & {
  debouncedSubmit: (values: AutoFiltersType) => void;
  minPrice?: number;
  maxPrice?: number;
};

export const PriceFilter = (props: FormProps) => {
  const { form, values, maxPrice = 100000000, minPrice = 0 } = props;

  // const handleCurrencyChange = useCallback(
  //   (currency: CURRENCIES) => {
  //     form.change('currencyType', currency);
  //   },
  //   [form],
  // );

  const handlePriceChange = useCallback(
    (value: number[]) => {
      form.change('price', value);
    },
    [form],
  );

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-start',
        'justify-start',
        'gap-4',
        'w-full',
      )}
    >
      <h2 className="text-tertiary">Precio</h2>
      {/*<div className="flex w-full justify-end gap-2">*/}
      {/*  <Button*/}
      {/*    type="button"*/}
      {/*    variant="outline"*/}
      {/*    onClick={() =>*/}
      {/*      handleCurrencyChange(*/}
      {/*        values?.currencyType === CURRENCIES.CRC*/}
      {/*          ? CURRENCIES.USD*/}
      {/*          : CURRENCIES.CRC,*/}
      {/*      )*/}
      {/*    }*/}
      {/*  >*/}
      {/*    {values?.currencyType === CURRENCIES.CRC ? 'Colones' : 'Dólares'}*/}
      {/*    <ArrowDownUp />*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <DualRangeSlider
        value={values.price}
        onValueChange={handlePriceChange}
        min={minPrice}
        max={maxPrice}
        step={500000}
      />
      <div className="flex w-full justify-between">
        <span className="text-tertiary/[0.8]">
          {MoneyFormatter(values?.price?.[0], values?.currencyType)}
        </span>
        <span className="text-tertiary/[0.8]">
          {MoneyFormatter(values?.price?.[1], values?.currencyType)}
        </span>
      </div>
      <Field
        name="currencyType"
        component={FormInput as unknown as SupportedInputs}
        wrapperClassName="hidden"
        childrenClassName="hidden"
        className="hidden"
      />
      <Field
        name="price"
        component={FormInput as unknown as SupportedInputs}
        wrapperClassName="hidden"
        childrenClassName="hidden"
        className="hidden"
      />
    </div>
  );
};
