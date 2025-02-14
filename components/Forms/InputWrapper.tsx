import {ForwardedRef, forwardRef, ReactNode} from 'react';

import {Meta} from './types';
import {cn} from "@/lib/utils";

export interface InputWrapperProps {
    children: ReactNode;
    childrenClassName?: string;
    label?: string | ReactNode;
    labelPosition?: 'top' | 'left' | 'right';
    labelClassName?: string;
    meta?: Meta;
    name: string;
    wrapperClassName?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

const SHARED_CLASSES = 'relative items-center justify-center';

export const InputWrapper = forwardRef(
    (props: InputWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
        const {
            children,
            childrenClassName,
            labelClassName,
            label,
            labelPosition = 'top',
            meta,
            name,
            wrapperClassName,
            disabled = false
        } = props;

        if (typeof label === 'undefined') {
            return <>{children}</>;
        }

        const top = labelPosition === 'top';
        const left = labelPosition === 'left';
        const right = labelPosition === 'right';

        const { touched, error } = meta || {};

        return (
            <div
                className={cn(
                    `${right || left ? 'flex' : 'flex flex-col'}`,
                    SHARED_CLASSES,
                    top ? 'items-start' : 'items-center',
                    wrapperClassName,
                    disabled ? 'opacity-50' : ''
                )}
                ref={ref}
            >
                {(left || top) && (
                    <label
                        className={cn(
                            'text-sm font-medium leading-6 text-tertiary',
                            labelClassName,
                            touched && error ? 'text-error' : ''
                        )}
                        htmlFor={name}
                    >
                        {label}
                    </label>
                )}
                <div
                    className={cn(
                        `relative w-full ${label ? (top ? 'pt-1' : left ? 'pl-2' : 'pr-2') : ''}`,
                        childrenClassName
                    )}
                >
                    {children}
                </div>
                {right && (
                    <label className={labelClassName} htmlFor={name}>
                        {label}
                    </label>
                )}
                {top && touched && error && (
                    <div className="text-error text-xs font-bold mt-1">✗ {error}</div>
                )}
            </div>
        );
    }
);

InputWrapper.displayName = 'InputWrapper';