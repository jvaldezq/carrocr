'use client';

import {
  Field,
  Form,
  FormRenderProps,
  SupportedInputs,
} from 'react-final-form';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ValidationErrors } from 'final-form';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { generateYears } from '@/lib/years';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { useRouter } from 'next/navigation';
import { CarFront } from 'lucide-react';
import { useGetMakes } from '@/context/CarEntryContext/services/getMakes';
import { useGetModels } from '@/context/CarEntryContext/services/getModels';
import { useGetTrims } from '@/context/CarEntryContext/services/getTrims';
import { useCreateMutation } from '@/context/CarEntryContext/services/postListing';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';

export interface CarFormProps {
  makeId?: number;
  modelId?: number;
  trimId?: number;
  year?: number;
  license?: string;
}

export const CreateCar = () => {
  const { close } = useCarEntry();
  const {
    mutateAsync: createListing,
    isPending,
    isSuccess,
  } = useCreateMutation();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const onSubmit = useCallback(
    (data: CarFormProps) => {
      setProgress(15);
      setTimeout(() => {
        setProgress(25);
      }, 1000);
      setTimeout(() => {
        setProgress(50);
      }, 2000);
      setTimeout(() => {
        setProgress(75);
      }, 3000);
      createListing(data).then((res: number) => {
        setProgress(100);
        close();
        router.push(`/draft/${res}`);
      });
    },
    [close, createListing, router],
  );

  const validate = useCallback(async (data: CarFormProps) => {
    const errors: Record<string, string> = {};

    if (!data.makeId) {
      errors.makeId = 'Marca del vehículo es requerida';
    }

    if (!data.modelId) {
      errors.modelId = 'Modelo del vehículo es requerido';
    }

    if (!data.trimId) {
      errors.trimId = 'Edición del vehículo es requerida';
    }

    if (!data.year) {
      errors.year = 'Año del vehículo es requerido';
    }

    if (!data.license) {
      errors.license = 'Placa del vehículo es requerida';
    }

    return errors as ValidationErrors;
  }, []);

  if (isPending || isSuccess) {
    return (
      <div className="h-96 w-full flex flex-col gap-2 justify-center items-center p-4">
        <CarFront className="text-primary animate-bounce animate-infinite animate-duration-1000 animate-delay-0 animate-ease-linear" />
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-linear" // Added transition
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <h1 className="text-sm font-light text-primary">CREANDO ANUNCIO</h1>
      </div>
    );
  }

  return (
    <Form initialValues={{}} onSubmit={onSubmit} validate={validate}>
      {(formProps) => <CarForm {...formProps} />}
    </Form>
  );
};

type FormProps = FormRenderProps<CarFormProps>;

export const CarForm = (props: FormProps) => {
  const { handleSubmit, values, valid, dirty } = props;
  const { close } = useCarEntry();
  const { data: makes, isLoading: isMakesLoading } = useGetMakes();
  const { data: models, isLoading: isModelsLoading } = useGetModels(
    values?.makeId,
  );
  const { data: trims, isLoading: isTrimsLoading } = useGetTrims(
    values?.modelId,
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4 pb-4">
      <Field
        name="makeId"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Marca del vehículo"
        label="Marca"
        options={makes}
        isLoading={isMakesLoading}
        disabled={!makes}
        focus
      />
      <Field
        name="modelId"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Modelo del vehículo"
        label="Modelo"
        options={models}
        isLoading={isModelsLoading}
        disabled={!models}
      />
      <Field
        name="trimId"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Edición del vehículo"
        label="Edición"
        options={trims}
        isLoading={isTrimsLoading}
        disabled={!trims}
      />
      <Field
        name="year"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Año del vehículo"
        label="Año"
        options={generateYears()}
        isLoading={false}
      />
      <Field
        name="license"
        component={FormInput as unknown as SupportedInputs}
        placeholder="Ejemplos: ABC123, 923467"
        label="Placa"
      />

      <div className="flex flex-col-reverse md:flex-row gap-3 justify-end mt-6">
        <Button
          type="button"
          variant="outline"
          className="text-tertiary text-opacity-90 w-full"
          onClick={close}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary w-full"
          disabled={!valid || !dirty}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
