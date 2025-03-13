'use client';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Gauge,
  Info,
  Ruler,
  Wine as Engine,
} from 'lucide-react';
import { useState } from 'react';
import { FactorySpecification } from '@/lib/definitions';

const tooltips = {
  engine: {
    cubicCentimeters:
      'Cilindrada del motor en centímetros cúbicos (cc), indicando el volumen total de todos los cilindros',
    cylinderCount: 'Número de cilindros en el motor',
    horsepower: 'Potencia máxima del motor',
    horsepowerRPM: 'Velocidad del motor a la que se alcanza la potencia máxima',
    torque: 'Fuerza de rotación generada por el motor',
    torqueRPM: 'Velocidad del motor a la que se alcanza el par máximo',
    valveCount: 'Número total de válvulas de admisión y escape',
    camType: 'Tipo de configuración del árbol de levas',
    superFuel: 'Requisito de calidad del combustible',
  },
  economy: {
    mpgCombine:
      'Consumo de combustible promedio en conducción combinada (ciudad y carretera)',
    mpgCity: 'Consumo de combustible en condiciones de conducción urbana',
    mpgHighway:
      'Consumo de combustible en condiciones de conducción en carretera',
  },
  dimensions: {
    length: 'Longitud total del vehículo',
    width: 'Ancho total del vehículo',
    height: 'Altura total del vehículo',
    groundHeight: 'Distancia entre el punto más bajo del vehículo y el suelo',
  },
  capacity: {
    doorCount: 'Número de puertas',
    seatCount: 'Número de asientos',
    curbWeight: 'Peso del vehículo sin pasajeros ni carga',
    grossWeight: 'Peso máximo permitido incluyendo pasajeros y carga',
    payloadCap: 'Peso máximo de carga y pasajeros',
    towingCap: 'Peso máximo que el vehículo puede remolcar',
    cargoCapLiters: 'Volumen del espacio de carga en litros',
    fuelCapLiters: 'Capacidad del tanque de combustible en litros',
  },
};

type Props = FactorySpecification;

export const FactorySpecifications = (props: Props) => {
  const { engine, economy, dimensions, capacity } = props;
  const [expandedSections, setExpandedSections] = useState({
    engine: false,
    economy: false,
    dimensions: false,
    capacity: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  console.log('props', props);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-tertiary">
          Especificaciones de fábrica
        </h2>
        <span className="text-xs text-tertiary/60">(Datos de referencia)</span>
      </div>

      <div className="space-y-4">
        {/* Engine Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('engine')}
            className="w-full flex items-center justify-between p-4 hover:bg-quaternary"
          >
            <div className="flex items-center gap-2">
              <Engine className="h-5 w-5 text-primary" />
              <span className="font-medium">Motor y potencia</span>
            </div>
            {expandedSections.engine ? (
              <ChevronUp className="h-5 w-5 text-tertiary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-tertiary" />
            )}
          </button>

          {expandedSections.engine && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(engine).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-primary cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-tertiary text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-48">
                        {tooltips.engine[key as keyof typeof tooltips.engine]}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* economy Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('economy')}
            className="w-full flex items-center justify-between p-4 hover:bg-quaternary"
          >
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              <span className="font-medium">Economía</span>
            </div>
            {expandedSections.economy ? (
              <ChevronUp className="h-5 w-5 text-tertiary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-tertiary" />
            )}
          </button>

          {expandedSections.economy && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(economy).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-primary cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-tertiary text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-48">
                        {tooltips.economy[key as keyof typeof tooltips.economy]}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium">{value} km/l</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dimensions Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('dimensions')}
            className="w-full flex items-center justify-between p-4 hover:bg-quaternary"
          >
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              <span className="font-medium">Dimensiones</span>
            </div>
            {expandedSections.dimensions ? (
              <ChevronUp className="h-5 w-5 text-tertiary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-tertiary" />
            )}
          </button>

          {expandedSections.dimensions && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(dimensions).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-primary cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-tertiary text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-48">
                        {
                          tooltips.dimensions[
                            key as keyof typeof tooltips.dimensions
                          ]
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium">{value} cm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Capacity Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('capacity')}
            className="w-full flex items-center justify-between p-4 hover:bg-quaternary"
          >
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-primary" />
              <span className="font-medium">Capacidad</span>
            </div>
            {expandedSections.capacity ? (
              <ChevronUp className="h-5 w-5 text-tertiary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-tertiary" />
            )}
          </button>

          {expandedSections.capacity && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(capacity).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-primary cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-tertiary text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-48">
                        {
                          tooltips.capacity[
                            key as keyof typeof tooltips.capacity
                          ]
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium">
                        {key.includes('Cap') && key !== 'fuelCapLiters'
                          ? `${value} kg`
                          : key.includes('Liters')
                            ? `${value} L`
                            : value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
