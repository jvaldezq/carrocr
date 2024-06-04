'use client';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {InputController} from "@/components/Forms/InputController";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {GoogleIcon} from "@/icons/GoogleIcon";
import {FacebookIcon} from "@/icons/FacebookIcon";
import {AppleIcon} from "@/icons/AppleIcon";
import {InstagramIcon} from "@/icons/InstagramIcon";

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

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 pt-2 flex flex-col gap-4 w-full'>
            <InputController control={control} name='email' type='email' placeholder='Correo electrónico'
                             rules={{required: true}}/>
            <InputController control={control} name='password' type='password' placeholder='Contraseña'
                             rules={{required: true}}/>
            <Button type='submit' className='bg-primary'>
                Continuar
            </Button>
            <div className="flex items-center my-2">
                <hr className="flex-grow border-primary/[0.5]"/>
                <span className="px-4 text-tertiary font-base text-base">or</span>
                <hr className="flex-grow border-primary/[0.5]"/>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                <Button type='button'
                        className='bg-transparent border-tertiary border text-tertiary flex justify-evenly hover:bg-tertiary/[0.05]'>
                    <FacebookIcon className='w-fit h-full'/>
                </Button>
                <Button type='button'
                        className='bg-transparent border-tertiary border text-tertiary flex justify-evenly hover:bg-tertiary/[0.05]'>
                    <InstagramIcon className='w-fit h-full'/>
                </Button>
                <Button type='button'
                        className='bg-transparent border-tertiary border text-tertiary flex justify-evenly hover:bg-tertiary/[0.05]'>
                    <GoogleIcon className='w-fit h-full'/>
                </Button>
                <Button type='button'
                        className='bg-transparent border-tertiary border text-tertiary flex justify-evenly hover:bg-tertiary/[0.05]'>
                    <AppleIcon className='w-fit h-full'/>
                </Button>
            </div>
        </form>
    </>);
}