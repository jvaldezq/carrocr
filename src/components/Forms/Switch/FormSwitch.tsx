// @ts-nocheck
'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import IMask from 'imask';
import { CombinedInputProps } from '../types';
import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { InputLoading } from '@/components/Forms/InputLoading';

export interface FormSwitchProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<
      InputHTMLAttributes<HTMLButtonElement>,
      'label' | 'name' | 'onChange'
    > {
  icon?: JSX.Element;
  mask?: string | object;
}

export const FormSwitch = forwardRef(
  (props: FormSwitchProps, ref: ForwardedRef<HTMLButtonElement>) => {
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
      ...rest
    } = props;
    const { onChange, ...inputRest } = input;
    const myRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (myRef?.current) {
        if (mask) {
          IMask(
            myRef.current,
            typeof mask === 'string' ? { mask: mask } : mask,
          );
        }
      }
    }, [mask]);

    const myOnChange = useCallback(
      (e: ChangeEvent<HTMLButtonElement>) => {
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
      >
        {isLoading ? (
          <InputLoading />
        ) : (
          <>
            <Switch
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
              defaultChecked={input.value}
              checked={input.value}
              onCheckedChange={onChange}
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

FormSwitch.displayName = 'FormSwitch';
