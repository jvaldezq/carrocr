import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  Car,
  DollarSign,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import { getSellerInfo } from '@/app/(main)/seller/service/getUserInfo';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';

dayjs.locale('es');

interface Props {
  sellerId: string;
}
export default async function SellerDetails(props: Props) {
  const { sellerId } = props;
  const { data, status } = await getSellerInfo(sellerId);
  console.log('HELLO', data);

  if (status) redirect(getRedirectPathFromErrorCode(status));

  const {
    firstName = '',
    lastName = '',
    createdDT,
    profileImage,
    phone,
    state,
    email,
    acctVerified,
  } = data ?? {};

  return (
    <main>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 relative">
        <div className="grid md:grid-cols-2 justify-center items-center gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {profileImage ? (
              <Image
                width={96}
                height={96}
                src={profileImage}
                alt={firstName}
                className="rounded-full object-cover w-[96px] h-[96px]"
              />
            ) : (
              <div className="bg-primary/[0.8] h-24 w-24 rounded-full flex items-center justify-center">
                <User className="text-white h-12" />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-tertiary">{`${firstName} ${lastName}`}</h1>
                {acctVerified && (
                  <div className="flex items-center text-verified text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Verificado
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-tertiary justify-center md:justify-start">
                <Clock className="h-4 w-4" />
                <span>
                  Miembro desde
                  <span className="capitalize">
                    {dayjs(createdDT).format('MMMM YYYY')}
                  </span>
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {email && (
                  <div className="flex items-center gap-2 text-tertiary">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2 text-tertiary">
                    <Phone className="h-5 w-5 text-primary" />
                    <a
                      href={`tel:${phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {state && (
                  <div className="flex items-center gap-2 text-tertiary">
                    <MapPin className="h-5 w-5 text-primary" />
                    Costa Rica, {state}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:relative absolute top-1 right-1">
            <div className="relative md:size-32 size-16">
              <svg
                className="rotate-[135deg] size-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-warning/[0.2]"
                  strokeWidth="1"
                  strokeDasharray="75 100"
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-warning"
                  strokeWidth="2"
                  strokeDasharray="37.5 100"
                ></circle>
              </svg>

              <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-warning block">Media</span>
              </div>
            </div>
            <h3 className="md:text-lg text-xs font-bold text-tertiary">
              Verificación
            </h3>
          </div>
        </div>
      </div>

      {/*  /!* Statistics *!/*/}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-tertiary mb-6">Estadísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-quaternary p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Car className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium text-tertiary">
                Anuncios Totales
              </h3>
            </div>
            <p className="text-3xl font-bold text-primary">1</p>
          </div>
          <div className="bg-quaternary p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium text-tertiary">
                Autos Vendidos
              </h3>
            </div>
            <p className="text-3xl font-bold text-primary">1</p>
          </div>
          <div className="bg-quaternary p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium text-tertiary">
                Vistas Totales
              </h3>
            </div>
            <p className="text-3xl font-bold text-primary">1</p>
          </div>
        </div>
      </section>
    </main>
  );
}
