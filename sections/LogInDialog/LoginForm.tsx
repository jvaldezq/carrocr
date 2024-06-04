'use client';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {InputController} from "@/components/Forms/InputController";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";

export interface LoginInputs {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: SubmitHandler<LoginInputs>;
}

const schema = yup
    .object({
        email: yup.string().required('Correo electrónico es requerido').typeError('Correo electrónico es requerido'),
        password: yup.string().required('Contraseña es requerida').typeError('Contraseña es requerida'),
    })
    .required()

export const LoginForm = (props: LoginFormProps) => {
    const {onSubmit} = props;

    const {
        handleSubmit, control,
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema),
    });

    return (<form onSubmit={handleSubmit(onSubmit)} className='mt-4 pt-2 flex flex-col gap-4'>
        <InputController control={control} name='email' type='email' placeholder='Correo' rules={{required: true}}/>
        <InputController control={control} name='password' type='password' placeholder='Contraseña'
                         rules={{required: true}}/>
        <Button type='submit' className='bg-primary'>
            Log In
        </Button>
    </form>);
}