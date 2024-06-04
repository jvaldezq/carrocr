'use client';
import {Input} from "@/components/ui/input";
import {Control, Controller, ValidationRule} from "react-hook-form";

interface InputControllerProps {
    control: Control<any>;
    name: string;
    type: string;
    placeholder: string;
    rules?: ValidationRule<any>;
}

export const InputController = (props: InputControllerProps) => {
    const {control, name, placeholder, type, rules} = props;

    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange}, fieldState: {error}}) => {
            return <div><Input className='focus-visible:ring-primary focus-visible:ring-1' type={type}
                               placeholder={placeholder} name={name} onChange={onChange}
            />
                <p className='text-xs text-error font-base mt-1'>{error?.message}</p>
            </div>
        }}
    />
}