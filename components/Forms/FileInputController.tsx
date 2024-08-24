'use client';
import {ValidationRule} from "react-hook-form";
import {cn} from "@/lib/utils";
import {ChangeEvent, DragEvent, useMemo, useState} from "react";
import {FilesProps} from "@/sections/CarEntry/StepTwo";
import Image from "next/image";
import {CloudIcon} from "@/icons/CloudIcon";

interface FileInputControllerProps {
    name: string;
    type: string;
    rules?: ValidationRule<any>;
    show?: boolean;
    label?: string;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>, name: keyof FilesProps) => void;
    file?: Blob | MediaSource;
}

export const FileInputController = (props: FileInputControllerProps) => {
    const {name, onChange, rules, show = true, label, className, file} = props;
    const isRequired = rules?.required;
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onChange({target: {files: e.dataTransfer.files}} as ChangeEvent<HTMLInputElement>, name as keyof FilesProps);
        }
    };

    const isDragActive = useMemo(() => {
        return isDragging ? 'bg-tertiary/[0.1] border-tertiary/[0.3]' : undefined
    }, [isDragging]);


    if (!show) return null;

    return <div
        className={cn('animate-fade-left animate-once animate-duration-500 animate-ease-linear', className)}>
        {label &&
            <p className='text-tertiary text-xs animate-fade-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear'>{label}
                {isRequired && <span className="text-red-500"> *</span>}</p>}
        {file ?
            <Image
                className="object-cover aspect-auto rounded-2xl justify-self-center self-center w-full h-[405px]"
                src={URL.createObjectURL(file)}
                alt={label || 'Preview Image'}
                width={720}
                height={405}
            />
            : <div className="flex items-center justify-center w-full">
                <label htmlFor={`dropzone-file-${name}`}
                       onDragOver={handleDragOver}
                       onDragLeave={handleDragLeave}
                       onDrop={handleDrop}
                       className={
                           cn(
                               "flex",
                               "flex-col",
                               "items-center",
                               "justify-center",
                               "w-full",
                               "h-[405px]",
                               "border-2",
                               "border-tertiary/[0.3]",
                               "border-dashed",
                               "rounded-2xl",
                               "cursor-pointer",
                               "hover:bg-tertiary/[0.1]",
                               "hover:border-tertiary/[0.8]",
                               isDragActive
                           )

                       }>
                    <div className="flex flex-col items-center justify-center py-5 px-2 text-center">
                        <CloudIcon/>
                        <p className="mb-2 text-sm text-tertiary"><span
                            className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                    </div>
                    <input id={`dropzone-file-${name}`} type="file" className="hidden" name={name}
                           onChange={(e) => onChange(e, name as keyof FilesProps)} accept="image/*"/>
                </label>
            </div>}

    </div>
}