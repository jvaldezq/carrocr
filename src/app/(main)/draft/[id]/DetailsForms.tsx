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
import { FormCommand } from '@/components/Forms/Select/FormCommand';
import { generateInspectionYears } from '@/lib/years';
import { FormTextArea } from '@/components/Forms/TextArea/FormTextArea';

export const DetailsForms = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
          Información Básica
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="state"
            component={FormCommand as unknown as SupportedInputs}
            options={states_options}
            label="Provincia"
            required
          />
          <Field
            name="condition"
            component={FormCommand as unknown as SupportedInputs}
            options={condition_options}
            label="Condición"
            required
          />
          <Field
            name="inspectionYear"
            component={FormCommand as unknown as SupportedInputs}
            options={generateInspectionYears()}
            label="Año de próxima revisión técnica"
            required
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
          Precio | Intercambio
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="currency"
            component={FormCommand as unknown as SupportedInputs}
            options={currencies_options}
            label="Moneda"
            required
          />
          <Field
            name="price"
            component={FormInput as unknown as SupportedInputs}
            placeholder="100000"
            label="Precio"
            required
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

      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
          Detalles del Vehículo
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Field
            name="mileageType"
            component={FormCommand as unknown as SupportedInputs}
            options={milage_options}
            label="Tipo (Km, Millas)"
            required
          />
          <Field
            name="mileage"
            component={FormInput as unknown as SupportedInputs}
            placeholder="100000"
            label="Kilometraje"
            required
          />
          <Field
            name="transType"
            component={FormCommand as unknown as SupportedInputs}
            options={transType_options}
            label="Transmisión"
            required
          />

          <Field
            name="transGearCount"
            component={FormCommand as unknown as SupportedInputs}
            options={transGearCount_options}
            label="Número de Marchas"
          />

          <Field
            name="fuelType"
            component={FormCommand as unknown as SupportedInputs}
            options={fuelType_options}
            label="Tipo de combustible"
            required
          />

          <Field
            name="driveType"
            component={FormCommand as unknown as SupportedInputs}
            options={driveType_options}
            label="Tipo de Tracción"
            required
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

      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
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
