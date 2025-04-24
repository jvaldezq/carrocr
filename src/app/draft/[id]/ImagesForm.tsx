'use client';
import React, { useCallback, useState } from 'react';
import { CloudUpload, Info, Upload } from 'lucide-react';
import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import { CarImages, FormCarType } from '@/lib/definitions';
import Image from 'next/image';
import { usePostImage } from '@/app/draft/[id]/service/postImage';
import UploadFile from '@/assets/upload.gif';
import { cn } from '@/lib/utils';
import { FormInput } from '@/components/Forms/Input/FormInput';
import DefaultImage from '@/assets/placeholder.webp';

const IMAGE_SECTIONS = {
  exterior: [
    { key: 'imgBodyFL', label: 'Frente Izquierdo', required: true },
    { key: 'imgBodyFC', label: 'Frente Centro', required: false },
    { key: 'imgBodyFR', label: 'Frente Derecho', required: true },
    { key: 'imgBodyRL', label: 'Trasero Izquierdo', required: true },
    { key: 'imgBodyRC', label: 'Trasero Centro', required: false },
    { key: 'imgBodyRR', label: 'Trasero Derecho', required: true },
    { key: 'imgBodySL', label: 'Lateral Izquierdo', required: false },
    { key: 'imgBodySR', label: 'Lateral Derecho', required: false },
  ],
  interior: [
    { key: 'imgInteriorDash', label: 'Tablero', required: true },
    {
      key: 'imgInteriorCluster',
      label: 'Panel de Instrumentos',
      required: false,
    },
    {
      key: 'imgInteriorRadio',
      label: 'Sistema de Infoentretenimiento',
      required: false,
    },
    { key: 'imgInteriorSeatF', label: 'Asientos Delanteros', required: false },
    { key: 'imgInteriorSeatR', label: 'Asientos Traseros', required: false },
    { key: 'imgInteriorTrunk', label: 'Cajuela / Maletero', required: false },
  ],
  mechanical: [{ key: 'imgEngine', label: 'Motor', required: false }],
};

type ImagesFormsProps = FormRenderProps<FormCarType>;

export const ImagesForm = (props: ImagesFormsProps) => {
  const { mutateAsync } = usePostImage();
  const { values, form } = props;
  const { images } = values;

  const [draggingOverKey, setDraggingOverKey] = useState<string | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, key: keyof CarImages) => {
      const file = event.target.files?.[0];
      if (file) {
        setPendingKey(key);
        mutateAsync({
          imageFile: file,
          fileRename: key,
          listingID: values.id || 0,
        }).then((res) => {
          const imageToUpdate = `images.${key}` as keyof FormCarType;
          form.change(imageToUpdate, res);
          setPendingKey(null);
        });
      }
    },
    [form, mutateAsync, values.id],
  );

  const handleDragOver = (event: React.DragEvent, key: keyof CarImages) => {
    event.preventDefault();
    setDraggingOverKey(key as string);
  };

  const handleDragLeave = () => {
    setDraggingOverKey(null);
  };

  const handleDrop = (event: React.DragEvent, key: keyof CarImages) => {
    event.preventDefault();
    setDraggingOverKey(null);
    const file = event.dataTransfer.files[0];
    if (file) {
      setPendingKey(key);
      mutateAsync({
        imageFile: file,
        fileRename: key,
        listingID: values.id || 0,
      }).then((res) => {
        const imageToUpdate = `images.${key}` as keyof FormCarType;
        form.change(imageToUpdate, res);
        setPendingKey(null);
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="bg-white rounded-lg shadow-md border p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-tertiary mb-2">
              Guía de Fotos
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tertiary">
              <li>Buena iluminación</li>
              <li>Alta resolución y claridad</li>
              <li>Limpieza y presentación</li>
              <li>Sigue las indicaciones</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">Fotos exterior</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.exterior.map((section) => {
            const { key, label } = section;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : DefaultImage;
            const isDraggedOver = draggingOverKey === key;
            const isPending = pendingKey === key;
            const imageKey = `images.${key}` as keyof FormCarType;

            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <Field
                  name={imageKey}
                  component={FormInput as unknown as SupportedInputs}
                  wrapperClassName="hidden"
                  childrenClassName="hidden"
                  className="hidden"
                />
                <p className="text-sm text-tertiary self-start">{label}</p>
                {isPending ? (
                  <div className="w-full h-full flex flex-col justify-center items-center gap-2 border-2 border-gray-300 border-dashed rounded-lg">
                    <Image
                      src={UploadFile}
                      alt="Uploader"
                      height={50}
                      width={50}
                    />
                    <p className="text-sm text-tertiary animate-fade animate-infinite animate-duration-[2000ms] animate-delay-0 animate-ease-linear">
                      Subiendo
                    </p>
                  </div>
                ) : (
                  <label
                    htmlFor={`file-${key}`}
                    onDragOver={(event) =>
                      handleDragOver(event, key as keyof CarImages)
                    }
                    onDragLeave={handleDragLeave}
                    onDrop={(event) =>
                      handleDrop(event, key as keyof CarImages)
                    }
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                  >
                    {src && (
                      <Image
                        src={src}
                        height={300}
                        width={500}
                        alt={label}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div
                      className={cn(
                        'flex flex-col items-center justify-center gap-1 absolute w-full h-full',
                        isDraggedOver
                          ? 'bg-white/[0.7] text-primary'
                          : src
                            ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                            : 'text-tertiary',
                      )}
                    >
                      {isDraggedOver ? (
                        <CloudUpload className="h-5 w-5 animate-bounce animate-infinite animate-duration-500 animate-delay-0 animate-ease-linear" />
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          <p className=" text-sm">
                            <span className="font-semibold">Subir foto</span> o
                            arrastrar y soltar
                          </p>
                          <p className="text-xs">PNG, JPG</p>
                        </>
                      )}
                    </div>
                    <input
                      id={`file-${key}`}
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/avif, image/webp"
                      onChange={(event) =>
                        handleImageUpload(event, key as keyof CarImages)
                      }
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">Fotos interior</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.interior.map((section) => {
            const { key, label } = section;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : DefaultImage;
            const isDraggedOver = draggingOverKey === key;
            const isPending = pendingKey === key;
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <p className="text-sm text-tertiary self-start">{label}</p>
                {isPending ? (
                  <div className="w-full h-full flex flex-col justify-center items-center gap-2 border-2 border-gray-300 border-dashed rounded-lg">
                    <Image
                      src={UploadFile}
                      alt="Uploader"
                      height={50}
                      width={50}
                    />
                    <p className="text-sm text-tertiary animate-fade animate-infinite animate-duration-[2000ms] animate-delay-0 animate-ease-linear">
                      Subiendo
                    </p>
                  </div>
                ) : (
                  <label
                    htmlFor={`file-${key}`}
                    onDragOver={(event) =>
                      handleDragOver(event, key as keyof CarImages)
                    }
                    onDragLeave={handleDragLeave}
                    onDrop={(event) =>
                      handleDrop(event, key as keyof CarImages)
                    }
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                  >
                    {src && (
                      <Image
                        src={src}
                        height={300}
                        width={500}
                        alt={label}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div
                      className={cn(
                        'flex flex-col items-center justify-center gap-1 absolute w-full h-full',
                        isDraggedOver
                          ? 'bg-white/[0.7] text-primary'
                          : src
                            ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                            : 'text-tertiary',
                      )}
                    >
                      {isDraggedOver ? (
                        <CloudUpload className="h-5 w-5 animate-bounce animate-infinite animate-duration-500 animate-delay-0 animate-ease-linear" />
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          <p className=" text-sm">
                            <span className="font-semibold">Subir foto</span> o
                            arrastrar y soltar
                          </p>
                          <p className="text-xs">PNG, JPG</p>
                        </>
                      )}
                    </div>
                    <input
                      id={`file-${key}`}
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/avif, image/webp"
                      onChange={(event) =>
                        handleImageUpload(event, key as keyof CarImages)
                      }
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md border p-4">
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Fotos Mecánicas
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.mechanical.map((section) => {
            const { key, label } = section;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : DefaultImage;
            const isDraggedOver = draggingOverKey === key;
            const isPending = pendingKey === key;
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <p className="text-sm text-tertiary self-start">{label}</p>
                {isPending ? (
                  <div className="w-full h-full flex flex-col justify-center items-center gap-2 border-2 border-gray-300 border-dashed rounded-lg">
                    <Image
                      src={UploadFile}
                      alt="Uploader"
                      height={50}
                      width={50}
                    />
                    <p className="text-sm text-tertiary animate-fade animate-infinite animate-duration-[2000ms] animate-delay-0 animate-ease-linear">
                      Subiendo
                    </p>
                  </div>
                ) : (
                  <label
                    htmlFor={`file-${key}`}
                    onDragOver={(event) =>
                      handleDragOver(event, key as keyof CarImages)
                    }
                    onDragLeave={handleDragLeave}
                    onDrop={(event) =>
                      handleDrop(event, key as keyof CarImages)
                    }
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                  >
                    {src && (
                      <Image
                        src={src}
                        height={300}
                        width={500}
                        alt={label}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div
                      className={cn(
                        'flex flex-col items-center justify-center gap-1 absolute w-full h-full',
                        isDraggedOver
                          ? 'bg-white/[0.7] text-primary'
                          : src
                            ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                            : 'text-tertiary',
                      )}
                    >
                      {isDraggedOver ? (
                        <CloudUpload className="h-5 w-5 animate-bounce animate-infinite animate-duration-500 animate-delay-0 animate-ease-linear" />
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          <p className=" text-sm">
                            <span className="font-semibold">Subir foto</span> o
                            arrastrar y soltar
                          </p>
                          <p className="text-xs">PNG, JPG</p>
                        </>
                      )}
                    </div>
                    <input
                      id={`file-${key}`}
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/avif, image/webp"
                      onChange={(event) =>
                        handleImageUpload(event, key as keyof CarImages)
                      }
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
