'use client';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Gauge,
  Info,
  Power,
  Ruler,
} from 'lucide-react';
import { useState } from 'react';
import { FactorySpecification } from '@/lib/definitions';

const tooltips = {
  engine: {
    cubicCentimeters: {
      description:
        'Cilindrada del motor en centímetros cúbicos (cc), indicando el volumen total de todos los cilindros',
      name: 'Cilindrada',
    },
    cylinderCount: {
      description: 'Número de cilindros en el motor',
      name: 'Número de Cilindros',
    },
    horsepower: {
      description: 'Potencia máxima del motor',
      name: 'Caballos de Fuerza',
    },
    horsepowerRPM: {
      description: 'Velocidad del motor a la que se alcanza la potencia máxima',
      name: 'RPM a Potencia Máxima',
    },
    torque: {
      description: 'Fuerza de rotación generada por el motor',
      name: 'Par Motor',
    },
    torqueRPM: {
      description: 'Velocidad del motor a la que se alcanza el par máximo',
      name: 'RPM a Par Máximo',
    },
    valveCount: {
      description: 'Número total de válvulas de admisión y escape',
      name: 'Número de Válvulas',
    },
    camType: {
      description: 'Tipo de configuración del árbol de levas',
      name: 'Tipo de Árbol de Levas',
    },
    superFuel: {
      description: 'Requisito de calidad del combustible (Super)',
      name: 'Requisito de Combustible',
    },
  },
  economy: {
    mpgCombine: {
      description:
        'Consumo de combustible promedio en conducción combinada (ciudad y carretera)',
      name: 'Consumo Combinado',
    },
    mpgCity: {
      description: 'Consumo de combustible en condiciones de conducción urbana',
      name: 'Consumo Ciudad',
    },
    mpgHighway: {
      description:
        'Consumo de combustible en condiciones de conducción en carretera',
      name: 'Consumo Carretera',
    },
  },
  dimensions: {
    length: {
      description: 'Longitud total del vehículo',
      name: 'Longitud',
    },
    width: {
      description: 'Ancho total del vehículo',
      name: 'Ancho',
    },
    height: {
      description: 'Altura total del vehículo',
      name: 'Altura',
    },
    groundHeight: {
      description: 'Distancia entre el punto más bajo del vehículo y el suelo',
      name: 'Altura Libre al Suelo',
    },
  },
  capacity: {
    doorCount: {
      description: 'Número de puertas',
      name: 'Número de Puertas',
    },
    seatCount: {
      description: 'Número de asientos',
      name: 'Número de Asientos',
    },
    curbWeight: {
      description: 'Peso del vehículo sin pasajeros ni carga',
      name: 'Peso en Vacío',
    },
    grossWeight: {
      description: 'Peso máximo permitido incluyendo pasajeros y carga',
      name: 'Peso Bruto Vehicular',
    },
    payloadCap: {
      description: 'Peso máximo de carga y pasajeros',
      name: 'Capacidad de Carga',
    },
    towingCap: {
      description: 'Peso máximo que el vehículo puede remolcar',
      name: 'Capacidad de Remolque',
    },
    cargoCapLiters: {
      description: 'Volumen del espacio de carga en litros',
      name: 'Capacidad de Carga (Litros)',
    },
    fuelCapLiters: {
      description: 'Capacidad del tanque de combustible en litros',
      name: 'Capacidad de Combustible (Litros)',
    },
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
              <Power className="h-5 w-5 text-primary" />
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
                        {
                          tooltips.engine[key as keyof typeof tooltips.engine]
                            .description
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {
                          tooltips.engine[key as keyof typeof tooltips.engine]
                            .name
                        }
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
                        {
                          tooltips.economy[key as keyof typeof tooltips.economy]
                            .description
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {
                          tooltips.economy[key as keyof typeof tooltips.economy]
                            .name
                        }
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
                          ].description
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {
                          tooltips.dimensions[
                            key as keyof typeof tooltips.dimensions
                          ].name
                        }
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
                          ].description
                        }
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-tertiary capitalize">
                        {
                          tooltips.capacity[
                            key as keyof typeof tooltips.capacity
                          ].name
                        }
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
