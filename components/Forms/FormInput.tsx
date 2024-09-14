'use client';

import {ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, useCallback, useEffect, useRef} from 'react';
import IMask from 'imask';
import {CombinedInputProps} from './types';
import {InputWrapper, InputWrapperProps} from './InputWrapper';
import {cn} from "@/lib/utils";

export interface FormInputProps
    extends CombinedInputProps<string>,
        Omit<InputWrapperProps, 'children'>,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'> {
    icon?: JSX.Element;
    mask?: string | object;
}

const SHARED_CLASSES = [
    'w-full',
    'placeholder-n400',
    'border-solid',
    'border',
    'border-n350',
    'rounded',
    'px-4',
    'py-2.5',
    'focus:border-p200',
    'ring-0',
];

const DISABLED_CLASSES = ['bg-n100', 'text-n400', 'cursor-not-allowed'];
const ERROR_CLASSES = ['border-r200', 'bg-r10', 'focus:border-r300'];

export const FormInput = forwardRef((props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
        className,
        label,
        labelClassName,
        labelPosition,
        loading,
        name,
        placeholder,
        input,
        meta,
        wrapperClassName,
        childrenClassName,
        icon,
        mask,
        ...rest
    } = props;
    const {touched, error} = meta || {};
    const {onChange, ...inputRest} = input;
    const myRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (myRef?.current) {
            if (mask) {
                IMask(myRef.current, typeof mask === 'string' ? {mask: mask} : mask);
            }
        }
    }, [mask]);

    const myOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange],
    );

    return (
        <InputWrapper
            name={name}
            label={label}
            labelClassName={labelClassName}
            labelPosition={labelPosition}
            loading={loading}
            wrapperClassName={wrapperClassName}
            childrenClassName={childrenClassName}
            meta={meta}
        >
            <input
                name={name}
                className={cn(
                    SHARED_CLASSES,
                    props.disabled ? DISABLED_CLASSES : null,
                    touched && error ? ERROR_CLASSES : null,
                    className,
                )}
                ref={(node) => {
                    myRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                placeholder={placeholder ?? (typeof label === 'string' ? label : '')}
                onChange={myOnChange}
                {...inputRest}
                {...rest}
            />
            {icon}
        </InputWrapper>
    );
});

FormInput.displayName = 'FormInput';