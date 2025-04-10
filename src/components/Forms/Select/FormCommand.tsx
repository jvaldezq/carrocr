import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { InputWrapper, InputWrapperProps } from '../InputWrapper';
import { CombinedInputProps } from '../types';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown, SquarePlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

interface SelectGroupProps {
  value: string;
  label: string;
}

interface SelectScrollableProps {
  options: SelectGroupProps[];
  triggerClassName?: string;
}

export interface FormInputProps
  extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'>,
    SelectScrollableProps {
  icon?: JSX.Element;
  focus?: boolean;
  emptyClick?: (text: string) => void;
}

export const FormCommand = (props: FormInputProps) => {
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
    focus = false,
    options,
    emptyClick,
    required,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>();

  const { onChange, value } = input;
  const myRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (myRef?.current && focus) {
      if (myRef.current) {
        myRef.current.focus();
      }
    }
  }, [focus]);

  const handleEmptyClick = useCallback(() => {
    emptyClick?.(myRef.current?.value || '');
  }, [emptyClick]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [],
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
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'justify-between',
              'w-full',
              !value && 'text-muted-foreground',
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
          <Command>
            <CommandInput
              placeholder={placeholder}
              ref={myRef}
              onChangeCapture={handleInputChange}
            />
            <CommandList className="overflow-scroll">
              {emptyClick && inputValue && (
                <CommandEmpty
                  className={cn(
                    'py-2.5',
                    'px-2',
                    'text-tertiary',
                    'text-sm',
                    'hover:bg-primary/[0.1]',
                    'cursor-pointer',
                  )}
                  onClick={handleEmptyClick}
                >
                  <PopoverClose
                    className={cn(
                      'flex',
                      'gap-2',
                      'items-center',
                      'justify-start',
                    )}
                  >
                    <SquarePlus className="h-4 w-4" />
                    <span>Agregar {inputValue ? `"${inputValue}"` : ''}</span>
                  </PopoverClose>
                </CommandEmpty>
              )}
              {options?.length > 0 && (
                <CommandGroup className="overflow-scroll">
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.label}
                      onSelect={() => {
                        onChange(option.value);
                      }}
                    >
                      <PopoverClose className="flex w-full items-center">
                        {option.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            option.value === value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </PopoverClose>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};

FormCommand.displayName = 'FormCommand';
