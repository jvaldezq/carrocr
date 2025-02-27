'use client';
import React from 'react';
import { Info, Upload } from 'lucide-react';

const IMAGE_SECTIONS = {
  exterior: [
    { key: 'imgBodyFL', label: 'Front Left' },
    { key: 'imgBodyFC', label: 'Front Center' },
    { key: 'imgBodyFR', label: 'Front Right' },
    { key: 'imgBodyRL', label: 'Rear Left' },
    { key: 'imgBodyRC', label: 'Rear Center' },
    { key: 'imgBodyRR', label: 'Rear Right' },
    { key: 'imgBodySL', label: 'Side Left' },
    { key: 'imgBodySR', label: 'Side Right' },
  ],
  interior: [
    { key: 'imgInteriorDash', label: 'Dashboard' },
    { key: 'imgInteriorCluster', label: 'Instrument Cluster' },
    { key: 'imgInteriorRadio', label: 'Infotainment' },
    { key: 'imgInteriorSeatF', label: 'Front Seats' },
    { key: 'imgInteriorSeatR', label: 'Rear Seats' },
    { key: 'imgInteriorTrunk', label: 'Trunk' },
  ],
  mechanical: [{ key: 'imgEngine', label: 'Engine Bay' }],
};

// type ImagesFormsProps = FormRenderProps<FormCarType>;

export const ImagesForm = () => {
  // console.log('props', props);
  console.log('IMAGE_SECTIONS', IMAGE_SECTIONS);

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
        <h2 className="text-xl font-bold text-tertiary mb-4">
          Fotos exteriores
        </h2>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <p className="text-sm text-tertiary self-start">
              Delantero izquierdo
            </p>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-5 w-5 text-tertiary" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Subir foto</span> o arrastrar
                  y soltar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};
