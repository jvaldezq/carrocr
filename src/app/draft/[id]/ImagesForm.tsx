'use client';
import React, { useCallback } from 'react';
import { Info, Upload } from 'lucide-react';
import { FormRenderProps } from 'react-final-form';
import { CarImages, FormCarType } from '@/lib/definitions';
import Image from 'next/image';
import { usePostImage } from '@/app/draft/[id]/service/postImage';
import { cn } from '@/lib/utils';

const IMAGE_SECTIONS = {
  exterior: [
    { key: 'imgBodyFL', label: 'Frente Izquierdo' },
    { key: 'imgBodyFC', label: 'Frente Centro' },
    { key: 'imgBodyFR', label: 'Frente Derecho' },
    { key: 'imgBodyRL', label: 'Trasero Izquierdo' },
    { key: 'imgBodyRC', label: 'Trasero Centro' },
    { key: 'imgBodyRR', label: 'Trasero Derecho' },
    { key: 'imgBodySL', label: 'Lateral Izquierdo' },
    { key: 'imgBodySR', label: 'Lateral Derecho' },
  ],
  interior: [
    { key: 'imgInteriorDash', label: 'Tablero' },
    { key: 'imgInteriorCluster', label: 'Panel de Instrumentos' },
    { key: 'imgInteriorRadio', label: 'Sistema de Infoentretenimiento' },
    { key: 'imgInteriorSeatF', label: 'Asientos Delanteros' },
    { key: 'imgInteriorSeatR', label: 'Asientos Traseros' },
    { key: 'imgInteriorTrunk', label: 'Cajuela / Maletero' },
  ],
  mechanical: [{ key: 'imgEngine', label: 'Motor' }],
};

type ImagesFormsProps = FormRenderProps<FormCarType>;

export const ImagesForm = (props: ImagesFormsProps) => {
  const { mutateAsync } = usePostImage();
  const { values, form } = props;
  const { images } = values;

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, key: keyof CarImages) => {
      const file = event.target.files?.[0];
      if (file) {
        mutateAsync({
          imageFile: file,
          fileRename: key,
          listingID: values.id || 0,
        }).then((res) => {
          const imageToUpdate = `images.${key}` as keyof FormCarType;
          form.change(imageToUpdate, res);
        });
      }
    },
    [form, mutateAsync, values.id],
  );

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
            const src = images?.[key as keyof CarImages] || '';
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <p className="text-sm text-tertiary self-start">{label}</p>
                <label
                  htmlFor={`file-${key}`}
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
                      src
                        ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                        : 'text-tertiary',
                    )}
                  >
                    <Upload className="h-5 w-5" />
                    <p className=" text-sm">
                      <span className="font-semibold">Subir foto</span> o
                      arrastrar y soltar
                    </p>
                    <p className="text-xs">PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input
                    id={`file-${key}`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, , image/avif"
                    capture="environment"
                    onChange={(event) =>
                      handleImageUpload(event, key as keyof CarImages)
                    }
                  />
                </label>
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
            const src = images?.[key as keyof CarImages] || '';
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <p className="text-sm text-tertiary self-start">{label}</p>
                <label
                  htmlFor={`file-${key}`}
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
                      src
                        ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                        : 'text-tertiary',
                    )}
                  >
                    <Upload className="h-5 w-5" />
                    <p className=" text-sm">
                      <span className="font-semibold">Subir foto</span> o
                      arrastrar y soltar
                    </p>
                    <p className="text-xs">PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input
                    id={`file-${key}`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, , image/avif"
                    capture="environment"
                    onChange={(event) =>
                      handleImageUpload(event, key as keyof CarImages)
                    }
                  />
                </label>
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
            const src = images?.[key as keyof CarImages] || '';
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center w-full"
                key={key}
              >
                <p className="text-sm text-tertiary self-start">{label}</p>
                <label
                  htmlFor={`file-${key}`}
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
                      src
                        ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                        : 'text-tertiary',
                    )}
                  >
                    <Upload className="h-5 w-5" />
                    <p className=" text-sm">
                      <span className="font-semibold">Subir foto</span> o
                      arrastrar y soltar
                    </p>
                    <p className="text-xs">PNG, JPG (MAX. 800x400px)</p>
                  </div>
                  <input
                    id={`file-${key}`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, , image/avif"
                    capture="environment"
                    onChange={(event) =>
                      handleImageUpload(event, key as keyof CarImages)
                    }
                  />
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
