'use client';
import React, { useCallback, useState } from 'react';
import {
  Brush,
  Camera,
  CloudUpload,
  Info,
  Lightbulb,
  Proportions,
  Upload,
} from 'lucide-react';
import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import { CarImages, UserListing } from '@/types/User';
import Image from 'next/image';
import { usePostImage } from '@/app/(main)/draft/[id]/service/postImage';
import { cn, tw } from '@/lib/utils';
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

type ImagesFormsProps = FormRenderProps<UserListing>;

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
          listingId: values.id || 0,
        })
          .then((res) => {
            const imageToUpdate = `images.${key}` as keyof UserListing;
            form.change(imageToUpdate, res);
            setPendingKey(null);
          })
          .catch(() => {
            setPendingKey(null);
          })
          .finally(() => {
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
        listingId: values.id || 0,
      })
        .then((res) => {
          const imageToUpdate = `images.${key}` as keyof UserListing;
          form.change(imageToUpdate, res);
          setPendingKey(null);
        })
        .catch(() => {
          setPendingKey(null);
        })
        .finally(() => {
          setPendingKey(null);
        });
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-black p-1.5 rounded-full">
            <Info className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black">Guía de Fotos</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 items-center md:justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Lightbulb className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">Buena iluminación</p>
              <p className="text-sm text-black/50">Luz</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Proportions className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">
                Alta resolución y claridad
              </p>
              <p className="text-sm text-black/50">Calidad</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Brush className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">
                Limpieza y presentación
              </p>
              <p className="text-sm text-black/50">Presentación</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-black/5 rounded-xl p-3">
              <Camera className="h-6 w-6 text-black" />
            </div>
            <div>
              <p className="text-sm text-black font-bold">
                Sigue las indicaciones
              </p>
              <p className="text-sm text-black/50">Indicaciones</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
          Fotos exterior
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.exterior.map((section) => {
            const { key, label } = section;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : DefaultImage;
            const isDraggedOver = draggingOverKey === key;
            const isPending = pendingKey === key;
            const imageKey = `images.${key}` as keyof UserListing;

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
                <p className="text-sm text-tertiary self-start">
                  {label}{' '}
                  {section.required && <span className="text-red-500">*</span>}
                </p>
                {isPending ? (
                  <div
                    className={tw(
                      'w-full',
                      'h-64',
                      'flex',
                      'flex-col',
                      'justify-center',
                      'items-center',
                      'gap-2',
                      'border-2',
                      'border-gray-300',
                      'border-dashed',
                      'rounded-lg',
                      'bg-gray-50',
                    )}
                  >
                    <Upload className="h-12 w-12 text-gray-400 animate-bounce" />
                    <p className="text-sm text-tertiary animate-pulse">
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
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
                      accept="image/png, image/jpeg, image/webp"
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

      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
          Fotos interior
        </h2>

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
                  <div
                    className={tw(
                      'w-full',
                      'h-64',
                      'flex',
                      'flex-col',
                      'justify-center',
                      'items-center',
                      'gap-2',
                      'border-2',
                      'border-gray-300',
                      'border-dashed',
                      'rounded-lg',
                      'bg-gray-50',
                    )}
                  >
                    <Upload className="h-12 w-12 text-gray-400 animate-bounce" />
                    <p className="text-sm text-tertiary animate-pulse">
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
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
                      className={tw(
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
                      accept="image/png, image/jpeg, image/webp"
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

      <section>
        <h2 className="text-lg font-semibold mb-4 border-b border-dashed border-black/20 pb-1">
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
                  <div
                    className={tw(
                      'w-full',
                      'h-64',
                      'flex',
                      'flex-col',
                      'justify-center',
                      'items-center',
                      'gap-2',
                      'border-2',
                      'border-gray-300',
                      'border-dashed',
                      'rounded-lg',
                      'bg-gray-50',
                    )}
                  >
                    <Upload className="h-12 w-12 text-gray-400 animate-bounce" />
                    <p className="text-sm text-tertiary animate-pulse">
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 relative"
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
                      className={tw(
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
                      accept="image/png, image/jpeg, image/webp"
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
