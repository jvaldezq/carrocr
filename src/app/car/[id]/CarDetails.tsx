import {
  Activity,
  Ban,
  Box,
  Calendar,
  CalendarClock,
  Car,
  DollarSign,
  Fuel,
  Handshake,
  LogIn,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import { Carousel } from '@/components/Carousel';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCarById } from '@/app/car/[id]/service/fetchCarById';
import { FactorySpecifications } from '@/app/car/[id]/FactorySpecifications';
import { getSession } from '@auth0/nextjs-auth0';

interface CarDetailsProps {
  id: string;
}

export default async function CarDetails({ id }: CarDetailsProps) {
  const data = await fetchCarById(id);
  const session = await getSession();
  const {
    model,
    price,
    currency,
    mileage,
    fuelType,
    make,
    year,
    transType,
    condition,
    trim,
    mileageType,
    state,
    bodyName,
    driveType,
    images,
    negotiableTF,
    allowTradeTF,
    factorySpecifications,
    inspectionYear,
    restrictionDay,
    sellerComment,
    accountData,
  } = data;

  return (
    <section className="pb-10">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-3xl font-bold text-tertiary">
              {make} {model} {trim}
            </h1>
            <span className="px-2 hidden md:block py-1 bg-primary/10 text-primary rounded-md text-sm font-medium w-fit">
              {condition}
            </span>
          </div>
          <p className="text-xl text-primary mt-2">{year}</p>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium w-fit mt-4 md:hidden block">
            {condition}
          </span>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-bold text-primary">
            {MoneyFormatter(price, currency)}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <Carousel
          images={images}
          model={model}
          showArrows={true}
          preview={true}
          imageClass="md:h-[30rem] md:object-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Details */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-tertiary mb-4">
              Detalles del vehículo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Año</p>
                  <p className="font-medium">{year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Kilometraje</p>
                  <p className="font-medium">{`${NumberFormatter(mileage)} ${mileageType}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Transmisión</p>
                  <p className="font-medium">{transType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Tipo de combustible</p>
                  <p className="font-medium">{fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Tipo de Tracción</p>
                  <p className="font-medium">{driveType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Box className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-tertiary">Tipo de Carrocería</p>
                  <p className="font-medium">{bodyName}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Listing Details */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-tertiary mb-4">
              Detalles del anuncio
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-tertiary">Ubicación</p>
                    <p className="font-medium">{state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Handshake className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-tertiary">Intercambio</p>
                    <p className="font-medium">{allowTradeTF ? 'Sí' : 'No'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-tertiary">Precio Negociable</p>
                    <p className="font-medium">{negotiableTF ? 'Sí' : 'No'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-tertiary">
                      Inspección Válida Hasta
                    </p>
                    <p className="font-medium">{inspectionYear}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ban className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-tertiary">Día de Restricción</p>
                    {/*TODO Integrate*/}
                    <p className="font-medium">{restrictionDay ?? 'Lunes'}</p>
                  </div>
                </div>
              </div>

              {sellerComment && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-tertiary mb-2">
                    Observaciones del Vendedor
                  </h3>
                  <p className="text-tertiary bg-quaternary p-4 rounded-lg">
                    {sellerComment}
                  </p>
                </div>
              )}
            </div>
          </section>
          <FactorySpecifications {...factorySpecifications} />
        </div>

        {/* Seller Info */}
        <div className="lg:col-span-1">
          <section className="bg-white rounded-lg shadow-md p-6 sticky top-16">
            <div className="flex items-center gap-4 mb-6">
              {accountData.profileImage ? (
                <Image
                  height={64}
                  width={64}
                  src={accountData.profileImage}
                  alt={accountData.firstName}
                  className="rounded-full w-16 h-16 object-cover"
                />
              ) : (
                <div className="bg-primary/[0.8] h-16 w-16 rounded-full flex items-center justify-center">
                  <User className="text-white h-12" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-tertiary">
                  {`${accountData.firstName || ''} ${accountData.lastName || ''}`}
                </h3>
                {accountData.acctVerified && (
                  <div className="flex items-center text-verified text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Verificado
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                {session?.user ? (
                  <a
                    href={`mailto:${accountData.email}`}
                    className="text-tertiary hover:text-primary transition-colors"
                  >
                    {accountData.email}
                  </a>
                ) : (
                  <div className="blur-sm bg-primary/[0.5] rounded-lg w-full h-6" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                {session?.user ? (
                  <a
                    href={`tel:${accountData.phone}`}
                    className="text-tertiary hover:text-primary transition-colors"
                  >
                    {accountData.phone}
                  </a>
                ) : (
                  <div className="blur-sm bg-primary/[0.5] rounded-lg w-full h-6" />
                )}
              </div>
            </div>

            <div className="mt-6">
              {session?.user ? (
                <Link
                  key={accountData.id}
                  href={`/seller/${accountData.id}`}
                  className="w-full flex justify-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Ver perfil
                </Link>
              ) : (
                <Link
                  key="login"
                  href="/api/auth/login"
                  className="rounded-lg border w-full py-2 px-1 border-primary flex gap-1 items-center justify-center justify-self-center text-primary hover:bg-primary/10 transition-colors"
                >
                  <LogIn className="mr-2 h-5" />
                  <span>Ingreso / Registro</span>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
