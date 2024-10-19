'use client';

import {Form} from "react-final-form";
import {CreateCarForm, CreateCarFormProps} from "@/app/car-entry/forms/CreateCarForm";
import {useCallback} from "react";
import * as yup from "yup";
import {formValidator} from "@/lib/formValidator";

const schema = yup.object({
    makeId: yup.string().required('La marca es requerida'),
    modelId: yup.string().required('El modelo es requerido'),
    trimId: yup.string().required('La edición es requerida'),
    year: yup.string().required('El año es requerido'),
    license: yup
        .string()
        .matches(/^[A-Za-z]{3}-\d{3}$|^\d{1,6}$|^[A-Za-z]{3}\d{3}$/, {
            message: 'La placa debe tener el formato correcto',
        })
        .required('La placa es requerida'),
}).required();


export const CreateCar = () => {

    const onSubmit = useCallback((data: CreateCarFormProps) => {
        console.log('EL PEPE', data);
    }, []);

    const initialValues = {
        makeId: undefined, modelId: undefined, trimId: undefined, year: undefined, license: undefined,
    }

    return (<Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnBlur={true}
        validate={formValidator(schema)}
    >
        {(formProps) => <CreateCarForm {...formProps} />}
    </Form>)
}