'use client';
import {Input} from "@/components/ui/input";
import {Control, Controller, ValidationRule} from "react-hook-form";

interface InputControllerProps {
    control: Control<any>;
    name: string;
    type: string;
    placeholder: string;
    rules?: ValidationRule<any>;
    show?: boolean;
    label?: string;
}

export const InputController = (props: InputControllerProps) => {
    const {control, name, placeholder, type, rules, show = true, label} = props;
    const isRequired = rules?.required;

    if (!show) return null;

    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange}, fieldState: {error}}) => {
            return <div className='animate-fade-left animate-once animate-duration-500 animate-ease-linear'>
                {label &&
                    <p className='text-tertiary text-xs animate-fade-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear'>{label}
                        {isRequired &&
                            <span className="text-red-500"> *</span>}</p>}
                <Input
                    className='font-bold focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-tertiary text-xs'
                    type={type}
                    placeholder={placeholder} name={name} onChange={onChange}/>
                <p className='text-xs text-error font-normal mt-1'>{error?.message}</p>
            </div>
        }}
    />
}