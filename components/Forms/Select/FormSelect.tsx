import {ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useRef} from 'react';

import {InputWrapper, InputWrapperProps} from '../InputWrapper';
import {CombinedInputProps} from '../types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {InputLoading} from "@/components/Forms/InputLoading";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectGroupProps {
    label: string;
    options: SelectOption[];
}

interface SelectScrollableProps {
    options: SelectGroupProps[];
    triggerClassName?: string;
}

export interface FormInputProps
    extends CombinedInputProps<string>,
        Omit<InputWrapperProps, 'children'>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'>, SelectScrollableProps {
    icon?: JSX.Element;
    focus?: boolean;
}

export const FormSelect = forwardRef(
    (props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const {
            label,
            labelClassName,
            labelPosition,
            name,
            placeholder,
            input,
            meta,
            wrapperClassName,
            childrenClassName,
            icon,
            focus = false,
            options,
            className,
            triggerClassName,
            isLoading = false,
            ...rest
        } = props;

        const { onChange, value } = input;
        const myRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (myRef?.current && focus) {
                if (myRef.current) {
                    myRef.current.focus();
                }
            }
        }, [focus]);

        return (
            <InputWrapper
                name={name}
                label={label}
                labelClassName={labelClassName}
                labelPosition={labelPosition}
                wrapperClassName={wrapperClassName}
                childrenClassName={childrenClassName}
                meta={meta}
                disabled={rest.disabled}
            >
                {
                    isLoading ? <InputLoading /> : <Select value={`${value}`} onValueChange={onChange} disabled={rest.disabled}>
                <SelectTrigger className={`w-full ${triggerClassName}`} >
                    <SelectValue placeholder={placeholder} ref={myRef} {...rest} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((group, index) => (
                        <SelectGroup key={index}>
                            <SelectLabel>{group.label}</SelectLabel>
                            {group?.options?.map((option, optionIndex) => (
                                <SelectItem key={optionIndex} value={`${option.value}`}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
                }
            </InputWrapper>
        );
    }
);

FormSelect.displayName = 'FormInput';
