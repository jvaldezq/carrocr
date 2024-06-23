'use client';
import {Control, Controller, ValidationRule} from "react-hook-form";
import {useMediaQuery} from "@/hooks/use-media-query"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Drawer, DrawerContent, DrawerTrigger,} from "@/components/ui/drawer"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useState} from "react";
import {InputLoader} from "@/components/InputLoader";
import {AddIcon} from "@/icons/AddIcon";

interface ComboboxControllerProps {
    control: Control<any>;
    name: string;
    placeholder: string;
    label: string;
    rules?: ValidationRule<any>;
    data: ComboBoxList[];
    isLoading?: boolean;
    show?: boolean;
}

export interface ComboBoxList {
    value: string;
    label: string;
    id?: number
}

interface OptionListProps {
    setOpen: (open: boolean) => void;
    setSelectedOption: (option: ComboBoxList | null) => void;
    data: ComboBoxList[];
    onChange: (value: string) => void;
    value: string;
}

interface CompProps {
    setOpen: (open: boolean) => void;
    setSelectedOption: (option: ComboBoxList | null) => void;
    data: ComboBoxList[];
    onChange: (value: string) => void;
    placeholder: string;
    selectedOption: ComboBoxList | null;
    open: boolean;
    value: string;
}


const OptionList = ({setOpen, setSelectedOption, data, onChange, value}: OptionListProps) => {
    const [search, setSearch] = useState('')
    return (<Command>
        <CommandInput placeholder="Estado del filtro..." onValueChange={setSearch}/>
        <CommandList>
            <CommandEmpty className='flex justify-center items-center gap-2 py-2 text-sm text-tertiary'>{search}
                <AddIcon/></CommandEmpty>
            <CommandGroup>
                {data.map((option) => (<CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                        const selected = data.find((option) => option.value === value);
                        onChange(`${selected?.id}`);
                        setSelectedOption(selected || null)
                        setOpen(false)
                    }}
                >
                    {option.label}
                </CommandItem>))}
            </CommandGroup>
        </CommandList>
    </Command>)
}

const DesktopComp = ({
                         open, setOpen, selectedOption, setSelectedOption, placeholder, data, onChange, value
                     }: CompProps) => {
    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline"
                    className="w-full justify-start text-tertiary text-xs">
                {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
            <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} data={data} onChange={onChange}
                        value={value}/>
        </PopoverContent>
    </Popover>;
}

const MobileComp = ({
                        open, setOpen, selectedOption, setSelectedOption, placeholder, data, onChange, value
                    }: CompProps) => {
    return <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button variant="outline"
                    className="justify-start w-full text-tertiary text-xs">
                {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mt-4 border-t">
                <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} data={data} onChange={onChange}
                            value={value}/>
            </div>
        </DrawerContent>
    </Drawer>;
}

export const ComboboxController = (props: ComboboxControllerProps) => {
    const {control, name, placeholder, label, rules, data, isLoading = false, show = true} = props;
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedOption, setSelectedOption] = useState<ComboBoxList | null>(null)

    if (!show) return null;

    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}, fieldState: {error}}) => {
            return <div className='animate-fade-left animate-once animate-duration-500 animate-ease-linear'>
                {selectedOption ?
                    <p className='text-tertiary text-xs animate-fade-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear'>{label}</p> :
                    <p className='text-tertiary text-xs'>Seleccione {label}</p>}
                {isLoading ? <InputLoader/> :
                    <>
                        {isDesktop ? <DesktopComp
                            open={open}
                            setOpen={setOpen}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            placeholder={placeholder}
                            data={data}
                            onChange={onChange}
                            value={value}
                        /> : <MobileComp
                            open={open}
                            setOpen={setOpen}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            placeholder={placeholder}
                            data={data}
                            onChange={onChange}
                            value={value}
                        />}
                    </>
                }
                <p className='text-xs text-error font-base mt-1'>{error?.message}</p>
            </div>
        }}
    />
}
