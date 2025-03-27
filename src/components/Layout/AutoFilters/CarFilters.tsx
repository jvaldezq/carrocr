'use client';

import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import * as React from 'react';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { useGetMakes } from '@/context/CarEntryContext/services/getMakes';
import { useGetModels } from '@/context/CarEntryContext/services/getModels';
import { useGetTrims } from '@/context/CarEntryContext/services/getTrims';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

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
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Marca del vehículo"
        label="Marca"
        options={makes}
        isLoading={isMakesLoading}
        focus
      />
      <Field
        name="modelId"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Modelo del vehículo"
        label="Modelo"
        options={models}
        isLoading={isModelsLoading}
      />
      <Field
        name="trimId"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Edición del vehículo"
        label="Edición"
        options={trims}
        isLoading={isTrimsLoading}
      />
    </div>
  );
};
