'use client';

import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import * as React from 'react';
import { FormCommand } from '@/components/Forms/Select/FormCommand';
import { useGetMakes } from '@/context/CarEntryContext/services/getMakes';
import { useGetModels } from '@/context/CarEntryContext/services/getModels';
import { useGetTrims } from '@/context/CarEntryContext/services/getTrims';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import {
  fuelType_options,
  states_options,
  transType_options,
} from '@/lib/definitions';

type FormProps = FormRenderProps<AutoFiltersType> & {
  debouncedSubmit: (values: AutoFiltersType) => void;
};

export const CarFilters = (props: FormProps) => {
  const { values } = props;
  const { data: makes, isLoading: isMakesLoading } = useGetMakes();
  const { data: models, isLoading: isModelsLoading } = useGetModels(
    values?.makeId,
  );
  const { data: trims, isLoading: isTrimsLoading } = useGetTrims(
    values?.modelId,
  );

  return (
    <div className="grid md:grid-cols-2 gap-4 w-full">
      <Field
        name="makeId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Marca"
        label="Marca"
        options={makes}
        isLoading={isMakesLoading}
        focus
      />
      <Field
        name="modelId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Modelo"
        label="Modelo"
        options={models}
        isLoading={isModelsLoading}
      />
      <Field
        name="trimId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Edición"
        label="Edición"
        options={trims}
        isLoading={isTrimsLoading}
      />
      <Field
        name="fuelType"
        component={FormCommand as unknown as SupportedInputs}
        options={fuelType_options}
        label="Combustible"
        placeholder="Combustible"
        required
      />
      <Field
        name="transType"
        component={FormCommand as unknown as SupportedInputs}
        options={transType_options}
        label="Transmisión"
        placeholder="Transmisión"
        required
      />
      <Field
        name="stateName"
        component={FormCommand as unknown as SupportedInputs}
        options={states_options}
        placeholder="Provincia"
        label="Provincia"
        required
      />
    </div>
  );
};
