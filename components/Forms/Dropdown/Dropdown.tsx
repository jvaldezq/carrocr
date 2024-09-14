import {InputHTMLAttributes, useState} from "react";
import {InputWrapper, InputWrapperProps} from "@/components/Forms/InputWrapper";
import {CombinedInputProps} from "@/components/Forms/types";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {AddIcon} from "@/icons/AddIcon";

interface IProps extends CombinedInputProps<string>,
    Omit<InputWrapperProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'name' | 'onChange'> {
    options: {
        value: string;
        label: string;
        id?: number
    }[];
}

export const Dropdown = (props: IProps) => {
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
        options,
        ...rest
    } = props;
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const {onChange} = input;
    // const isDesktop = useMediaQuery("(min-width: 768px)")

    console.log('props', props)

    return <InputWrapper
        name={name}
        label={label}
        labelClassName={labelClassName}
        labelPosition={labelPosition}
        loading={loading}
        wrapperClassName={wrapperClassName}
        childrenClassName={childrenClassName}
        meta={meta}>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline"
                        className="w-full justify-start text-tertiary text-xs overflow-hidden">
                    {label ? <>{label}</> : <>{placeholder}</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0" align="start">
                <Command>
                    <CommandInput placeholder="Estado del filtro..." onValueChange={setSearch}/>
                    <CommandList>
                        <CommandEmpty
                            className='flex justify-center items-center gap-2 py-2 text-sm text-tertiary'>{search}
                            <AddIcon/></CommandEmpty>
                        <CommandGroup>
                            {options?.map((option) => (<CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(value) => {
                                    const selected = options.find((option) => option.value === value);
                                    onChange(`${selected?.id}`);
                                    setOpen(false)
                                }}
                            >
                                {option.label}
                            </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </InputWrapper>
}