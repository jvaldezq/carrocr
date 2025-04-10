'use client';

import {
  Field,
  Form,
  FormRenderProps,
  SupportedInputs,
} from 'react-final-form';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ValidationErrors } from 'final-form';
import { FormCommand } from '@/components/Forms/Select/FormCommand';
import { generateYears } from '@/lib/years';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { useRouter } from 'next/navigation';
import { CarFront } from 'lucide-react';
import { useGetMakes } from '@/context/CarEntryContext/services/getMakes';
import { useGetModels } from '@/context/CarEntryContext/services/getModels';
import { useGetTrims } from '@/context/CarEntryContext/services/getTrims';
import { useCreateMutation } from '@/context/CarEntryContext/services/postListing';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';
import { useCreateMakeMutation } from '@/context/CarEntryContext/services/postMake';
import { useCreateModelMutation } from '@/context/CarEntryContext/services/postModel';
import { useCreateTrimMutation } from '@/context/CarEntryContext/services/postTrim';

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
    } else if (data.license.length !== 6) {
      errors.license = 'Placa del vehículo debe ser valida';
    }

    return errors as ValidationErrors;
  }, []);

  if (isPending || isSuccess) {
    return (
      <div className="h-96 w-full flex flex-col gap-2 justify-center items-center p-4">
        <CarFront className="text-primary animate-bounce animate-infinite animate-duration-1000 animate-delay-0 animate-ease-linear" />
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-linear"
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
  const { handleSubmit, values, valid, dirty, form } = props;
  const [makesData, setMakesData] = React.useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);
  const [modelsData, setModelsData] = React.useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);
  const [trimsData, setTrimsData] = React.useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);
  const { close } = useCarEntry();
  const { data: makes } = useGetMakes();
  const { data: models } = useGetModels(values?.makeId);
  const { data: trims } = useGetTrims(values?.modelId);
  const { mutateAsync: createMake } = useCreateMakeMutation();
  const { mutateAsync: createModel } = useCreateModelMutation();
  const { mutateAsync: createTrim } = useCreateTrimMutation();

  useEffect(() => {
    if (makes) {
      setMakesData(makes);
    }
  }, [makes]);

  useEffect(() => {
    if (models) {
      setModelsData(models);
    }
    if (trims) {
      setTrimsData(trims);
    }
  }, [models, trims]);

  useEffect(() => {
    if (trims) {
      setTrimsData(trims);
    }
  }, [trims]);

  const createNewMake = useCallback(
    async (name: string) => {
      const newMake = await createMake(name);
      if (newMake[0].value) {
        setMakesData((prev) => [...prev, ...newMake]);
        form.change(
          'makeId',
          typeof newMake[0].value === 'string'
            ? parseInt(newMake[0].value, 10)
            : newMake[0].value,
        );
      }
    },
    [createMake, form],
  );

  const createNewModel = useCallback(
    async (name: string) => {
      const newModel = await createModel({
        name,
        makeId: values.makeId || 0,
      });
      if (newModel[0].value) {
        setModelsData((prev) => [...prev, ...newModel]);
        form.change(
          'modelId',
          typeof newModel[0].value === 'string'
            ? parseInt(newModel[0].value, 10)
            : newModel[0].value,
        );
      }
    },
    [createModel, form, values.makeId],
  );

  const createNewTrim = useCallback(
    async (name: string) => {
      const newTrim = await createTrim({
        name,
        modelID: values.modelId || 0,
      });
      if (newTrim[0].value) {
        setTrimsData((prev) => [...prev, ...newTrim]);
        form.change(
          'trimId',
          typeof newTrim[0].value === 'string'
            ? parseInt(newTrim[0].value, 10)
            : newTrim[0].value,
        );
      }
    },
    [createTrim, form],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4 pb-4">
      <Field
        name="makeId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Marca del vehículo"
        label="Marca"
        options={makesData}
        disabled={!makes}
        focus
        emptyClick={createNewMake}
        required
      />
      <Field
        name="modelId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Modelo del vehículo"
        label="Modelo"
        options={modelsData}
        disabled={!values?.makeId}
        emptyClick={createNewModel}
        required
      />
      <Field
        name="trimId"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Edición del vehículo"
        label="Edición"
        options={trimsData}
        disabled={!values?.modelId}
        emptyClick={createNewTrim}
        required
      />
      <Field
        name="year"
        component={FormCommand as unknown as SupportedInputs}
        placeholder="Año del vehículo"
        label="Año"
        options={generateYears()}
        required
      />
      <Field
        name="license"
        component={FormInput as unknown as SupportedInputs}
        placeholder="Ejemplos: ABC123, 923467"
        label="Placa"
        type="license"
        required
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
