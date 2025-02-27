import { InputHTMLAttributes, useCallback, useEffect, useRef } from 'react';

import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { CombinedInputProps } from '../types';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface FormSwitchProps
  extends CombinedInputProps<boolean>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLDivElement>, 'label' | 'name' | 'onChange'> {
  icon?: JSX.Element;
  hidden?: boolean;
  focus?: boolean;
  useMinus?: boolean;
}

export const FormSwitch = (props: FormSwitchProps) => {
  const {
    label,
    labelClassName,
    labelPosition,
    name,
    input,
    meta,
    wrapperClassName,
    childrenClassName,
    hidden = false,
    focus = false,
    id: switchId,
    placeholder,
    disabled,
  } = props;
  const { onChange, value } = input;
  const myRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (myRef?.current && focus) {
      myRef.current.focus();
    }
  }, [focus]);

  const myOnChange = useCallback(
    (checked: boolean) => {
      onChange(checked);
    },
    [onChange],
  );

  const id = switchId || placeholder || name;

  if (hidden) return null;

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
      <Switch
        className={cn(
          'bg-dark-gray',
          'rounded-full',
          'relative',
          'shadow-lg',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-0',
          'data-[state=checked]:bg-primary',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        )}
        defaultChecked={value}
        checked={value}
        disabled={disabled}
        onCheckedChange={myOnChange}
        id={id}
      />
    </InputWrapper>
  );
};
