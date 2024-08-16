'use client';
import {ValidationRule} from "react-hook-form";
import {cn} from "@/lib/utils";
import {ChangeEvent} from "react";
import {FilesProps} from "@/sections/CarEntry/StepTwo";
import Image from "next/image";

interface FileInputControllerProps {
    name: string;
    type: string;
    placeholder: string;
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

    if (!show) return null;

    return <div
        className={cn('animate-fade-left animate-once animate-duration-500 animate-ease-linear', className,)}>
        {label &&
            <p className='text-tertiary text-xs animate-fade-down animate-once animate-duration-500 animate-delay-300 animate-ease-linear'>{label}
                {isRequired && <span className="text-red-500"> *</span>}</p>}
        {file ? <Image
            className="rounded-2xl aspect-square object-contain justify-self-center self-center col-span-2 w-full"
            src={URL.createObjectURL(file)}
            alt="Delantero Izquierdo"
            height={400}
            width={800}
        /> : <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                        className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                        800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" name={name}
                       onChange={(e) => onChange(e, name as keyof FilesProps)}/>
            </label>
        </div>}

    </div>
}