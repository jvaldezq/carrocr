'use client';

import {Field, FormRenderProps, SupportedInputs} from "react-final-form";
import * as React from "react";
import {FormDropdown} from "@/components/Forms/Dropdown/FormDropdown";
import {generateYears} from "@/lib/years";
import {Button} from "@/components/ui/button";
import {useGetMakes, useGetModels, useGetTrims} from "@/app/car-entry/services/client";
import {FormInput} from "@/components/Forms/Input/FormInput";

export interface CreateCarFormProps {
    makeId: number;
    modelId: number;
    trimId: number;
    year: number;
    license: string;
}

export interface FormProps extends FormRenderProps<CreateCarFormProps> {
}

export const CreateCarForm = (props: FormProps) => {
    const {handleSubmit, values} = props;
    const {data: makes, isLoading: isMakesLoading} = useGetMakes();
    const {data: models, isLoading: isModelsLoading} = useGetModels(values?.makeId);
    const {data: trims, isLoading: isTrimsLoading} = useGetTrims(values?.modelId);

    return <form id="create-car-form" onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
        <Field
            name="makeId"
            component={FormDropdown as unknown as SupportedInputs}
            placeholder='Marca del vehículo'
            label='Marca'
            options={makes}
            isLoading={isMakesLoading}
            disabled={!makes}
        />
        <Field
            name="modelId"
            component={FormDropdown as unknown as SupportedInputs}
            placeholder='Modelo del vehículo'
            label='Modelo'
            options={models}
            isLoading={isModelsLoading}
            disabled={!models}
        />
        <Field
            name="trimId"
            component={FormDropdown as unknown as SupportedInputs}
            placeholder='Edición del vehículo'
            label='Edición'
            options={trims}
            isLoading={isTrimsLoading}
            disabled={!trims}
        />
        <Field
            name="year"
            component={FormDropdown as unknown as SupportedInputs}
            placeholder='Año del vehículo'
            label='Año'
            options={generateYears()}
            isLoading={false}
        />
        <Field
            name="license"
            component={FormInput as unknown as SupportedInputs}
            placeholder='Placa del vehículo'
            label='Placa'
            mask={/^([A-Z]{3}-\d{3}|\d{1,6})$/}
        />

        <div className="flex gap-3 justify-end">
        <Button variant="outline" className="text-tertiary text-opacity-90">
            Cancelar
        </Button>
        <Button type="submit" form="create-car-form" className="bg-primary">
            Guardar
        </Button>
        </div>
    </form>
}