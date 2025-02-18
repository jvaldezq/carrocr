'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useRef,
} from 'react';
import { CombinedInputProps } from '../types';
import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { InputLoading } from '@/components/Forms/InputLoading';

export interface FormInputProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'> {
  icon?: JSX.Element;
  mask?: string | object;
}

export const FormInput = forwardRef(
  (props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
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
      mask,
      isLoading,
      ...rest
    } = props;
    const { onChange, ...inputRest } = input;
    const myRef = useRef<HTMLInputElement | null>(null);

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
        wrapperClassName={wrapperClassName}
        childrenClassName={childrenClassName}
        meta={meta}
        disabled={rest.disabled}
      >
        {isLoading ? (
          <InputLoading />
        ) : (
          <>
            <Input
              name={name}
              className={cn(className)}
              ref={(node) => {
                myRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              placeholder={
                placeholder ?? (typeof label === 'string' ? label : '')
              }
              onChange={myOnChange}
              {...inputRest}
              {...rest}
            />
            {icon}
          </>
        )}
      </InputWrapper>
    );
  },
);

FormInput.displayName = 'FormInput';
