'use client';
import {Control, Controller, ValidationRule} from "react-hook-form";
import {useMediaQuery} from "@/hooks/use-media-query"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Drawer, DrawerContent, DrawerTrigger,} from "@/components/ui/drawer"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useState} from "react";
import {InputLoader} from "@/components/InputLoader";

interface ComboboxControllerProps {
    control: Control<any>;
    name: string;
    type: string;
    placeholder: string;
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
}

interface CompProps {
    setOpen: (open: boolean) => void;
    setSelectedOption: (option: ComboBoxList | null) => void;
    data: ComboBoxList[];
    onChange: (value: string) => void;
    placeholder: string;
    selectedOption: ComboBoxList | null;
    open: boolean;
}


const OptionList = ({setOpen, setSelectedOption, data, onChange}: OptionListProps) => {
    return (<Command>
        <CommandInput placeholder="Estado del filtro..."/>
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
                {data.map((option) => (<CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                        const selected = data.find((option) => option.value === value);
                        console.log(selected)
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
                         open, setOpen, selectedOption, setSelectedOption, placeholder, data, onChange
                     }: CompProps) => {
    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline" className="w-fit justify-start">
                {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
            <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} data={data} onChange={onChange}/>
        </PopoverContent>
    </Popover>;
}

const MobileComp = ({
                        open, setOpen, selectedOption, setSelectedOption, placeholder, data, onChange
                    }: CompProps) => {
    return <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button variant="outline" className="w-fit justify-start">
                {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mt-4 border-t">
                <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} data={data} onChange={onChange}/>
            </div>
        </DrawerContent>
    </Drawer>;
}

export const ComboboxController = (props: ComboboxControllerProps) => {
    const {control, name, placeholder, type, rules, data, isLoading = false, show = true} = props;
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedOption, setSelectedOption] = useState<ComboBoxList | null>(null)

    if (!show) return null;
    if (isLoading) return <InputLoader/>;

    return <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange}, fieldState: {error}}) => {
            return <>
                {isDesktop ? <DesktopComp
                    open={open}
                    setOpen={setOpen}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    placeholder={placeholder}
                    data={data}
                    onChange={onChange}
                /> : <MobileComp
                    open={open}
                    setOpen={setOpen}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    placeholder={placeholder}
                    data={data}
                    onChange={onChange}
                />}
                <p className='text-xs text-error font-base mt-1'>{error?.message}</p>
            </>
        }}
    />
}
