'use client';
import React from 'react';
import {
  condition_options,
  currencies_options,
  driveType_options,
  fuelType_options,
  milage_options,
  states_options,
  transGearCount_options,
  transType_options,
} from '@/lib/definitions';
import { Field, SupportedInputs } from 'react-final-form';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { FormSwitch } from '@/components/Forms/Switch/FormSwitch';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { generateInspectionYears } from '@/lib/years';
import { FormTextArea } from '@/components/Forms/TextArea/FormTextArea';

export const DetailsForms = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Información Básica
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="state"
            component={FormSelect as unknown as SupportedInputs}
            options={states_options}
            label="Provincia"
          />
          <Field
            name="condition"
            component={FormSelect as unknown as SupportedInputs}
            options={condition_options}
            label="Condición"
          />
          <Field
            name="inspectionYear"
            component={FormSelect as unknown as SupportedInputs}
            options={generateInspectionYears()}
            label="Año de próxima revisión técnica"
          />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Precio | Intercambio
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="currency"
            component={FormSelect as unknown as SupportedInputs}
            options={currencies_options}
            label="Moneda"
          />
          <Field
            name="price"
            component={FormInput as unknown as SupportedInputs}
            placeholder="100000"
            label="Precio"
          />
          <Field
            name="taxesPaidTF"
            component={FormSwitch as unknown as SupportedInputs}
            label="Está al día"
          />
          <Field
            name="negotiableTF"
            component={FormSwitch as unknown as SupportedInputs}
            label="Negociable"
          />
          <Field
            name="allowTradeTF"
            component={FormSwitch as unknown as SupportedInputs}
            label="Recibe o intercambia"
          />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Detalles del Vehículo
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="mileageType"
            component={FormSelect as unknown as SupportedInputs}
            options={milage_options}
            label="Tipo (Km, Millas)"
          />
          <Field
            name="mileage"
            component={FormInput as unknown as SupportedInputs}
            placeholder="100000"
            label="Kilometraje"
          />
          <Field
            name="transType"
            component={FormSelect as unknown as SupportedInputs}
            options={transType_options}
            label="Transmisión"
          />

          <Field
            name="transGearCount"
            component={FormSelect as unknown as SupportedInputs}
            options={transGearCount_options}
            label="Número de Marchas"
          />

          <Field
            name="fuelType"
            component={FormSelect as unknown as SupportedInputs}
            options={fuelType_options}
            label="Tipo de combustible"
          />

          <Field
            name="driveType"
            component={FormSelect as unknown as SupportedInputs}
            options={driveType_options}
            label="Tipo de Tracción"
          />

          <Field
            name="engineModifiedTF"
            component={FormSwitch as unknown as SupportedInputs}
            label="Motor Modificado"
          />

          <Field
            name="lP_ConversionTF"
            component={FormSwitch as unknown as SupportedInputs}
            label="Conversión a Gas LP "
          />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Comentario del vendedor
        </h2>
        <div className="grid gap-2">
          <Field
            name="sellerComment"
            component={FormTextArea as unknown as SupportedInputs}
            placeholder="El carro solo ha tenido un dueño y se encuentra en excelente estado."
            type="textarea"
            label=""
          />
        </div>
      </section>
    </div>
  );
};
