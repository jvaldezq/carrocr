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
import { Textarea } from '@/components/ui/textarea';
import { InputLoading } from '@/components/Forms/InputLoading';

export interface FormTextAreaProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<
      InputHTMLAttributes<HTMLTextAreaElement>,
      'label' | 'name' | 'onChange'
    > {
  icon?: JSX.Element;
}

export const FormTextArea = forwardRef(
  (props: FormTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
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
      isLoading,
      ...rest
    } = props;
    const { onChange, ...inputRest } = input;
    const myRef = useRef<HTMLTextAreaElement | null>(null);

    const myOnChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
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
            <Textarea
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

FormTextArea.displayName = 'FormTextArea';
