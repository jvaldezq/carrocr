'use client';
import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { DualRangeSlider } from '@/components/DualRangerSlider';
import { FormRenderProps } from 'react-final-form';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

type FormProps = FormRenderProps<AutoFiltersType> & {
  debouncedSubmit: (values: AutoFiltersType) => void;
  minYear?: number;
  maxYear?: number;
};

export const YearFilter = (props: FormProps) => {
  const { form, values, maxYear = 2028, minYear = 1950 } = props;

  const handleYearChange = useCallback(
    (value: number[]) => {
      form.change('year', value);
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
      <h2 className="text-tertiary">Años</h2>
      <DualRangeSlider
        value={values?.year}
        onValueChange={handleYearChange}
        min={minYear}
        max={maxYear}
        step={1}
      />
      <div className="flex w-full justify-between">
        <span className="text-tertiary/[0.8]">{values?.year[0]}</span>
        <span className="text-tertiary/[0.8]">{values?.year[1]}</span>
      </div>
    </div>
  );
};
