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
import { Input } from '@/components/ui/input';

export interface FormInputProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'> {
  icon?: JSX.Element;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

const MASKS: Record<string, string | object> = {
  'cc-expiration-date': {
    blocks: {
      MM: { from: 1, mask: IMask.MaskedRange, to: 12 },
      YY: { from: 0, mask: IMask.MaskedRange, to: 99 },
    },
    eager: true,
    mask: 'MM / YY',
  },
  ccv: '000',
  'credit-card': '0000 0000 0000 0000',
  'cvv-amex': '0000',
  phone: '(000) 000-0000',
  'postal-CA': 'a0a 0a0',
  'postal-US': '00000-0000',
  'short-ssn-sin': '0000',
  sin: '000-000-000',
  ssn: '000-00-0000',
  license: {
    mask: [
      {
        mask: 'XXX000',
        definitions: {
          X: /[A-Za-z]/,
        },
      },
      {
        mask: '000000',
      },
    ],
  },
  tel: '00000000',
};

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
      required,
      type,
      ...rest
    } = props;
    const { onChange, ...inputRest } = input;
    const maskType = input?.type || type;
    const myRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (myRef?.current) {
        const maskPattern = MASKS[maskType!];
        if (maskPattern) {
          IMask(
            myRef.current,
            typeof maskPattern === 'string'
              ? { mask: maskPattern }
              : maskPattern,
          );
        }
      }
    }, [maskType]);

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
        required={required}
      >
        <Input
          name={name}
          className={cn(
            'focus-visible:border-primary',
            'focus-visible:ring-0',
            'focus-visible:ring-offset-0',
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
          type={maskType}
          {...inputRest}
          {...rest}
        />
      </InputWrapper>
    );
  },
);

FormInput.displayName = 'FormInput';
