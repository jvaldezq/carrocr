import {
  AlignCenterVertical as Certificate,
  Ban,
  Car,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  Mail,
  MapPin,
  Phone,
  Shield,
  Store,
} from 'lucide-react';
import { Carousel } from '@/components/Carousel';
import SellerCars from '@/app/seller/[id]/SellerCars';
import Image from 'next/image';
import { VERIFICATIONS_TRANSLATIONS } from '@/lib/definitions';
const SELLER_DATA = {
  id: 1,
  acctVerified: true,
  email: 'parkway.motors@example.com',
  phone: '84919754',
  picture:
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&fit=crop',
  fullName: 'Parkway Motors',
  memberSince: '2025-01-04',
  isDealership: true,
  dealershipDetails: {
    locationImages: [
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80',
    ],
    hasOperatingPermit: true,
    permitNumber: 'DLR-2024-789',
    address: '123 Auto Plaza Drive, San José',
    googleMapsUrl: 'https://maps.google.com',
    openingHours: 'Mon-Sat: 9:00 AM - 6:00 PM',
  },
  verificationStatus: {
    identification: true,
    email: true,
    phone: false,
  },
  statistics: {
    totalListings: 127,
    totalSold: 89,
    totalViews: 15430,
  },
};

export default function SellerDetails() {
  const {
    id,
    picture,
    dealershipDetails,
    isDealership,
    email,
    fullName,
    phone,
    statistics,
    verificationStatus,
    memberSince,
    acctVerified,
  } = SELLER_DATA;

  const memberDuration = () => {
    const memberDate = new Date(memberSince);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - memberDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} años`;
  };

  return (
    <main className="py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Image
              width={96}
              height={96}
              src={picture}
              alt={fullName}
              className="rounded-full object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <h1 className="text-3xl font-bold text-tertiary">{fullName}</h1>
                {acctVerified && (
                  <div className="flex items-center text-verified text-sm bg-verified/10 px-3 py-1 rounded-full">
                    <Shield className="h-4 w-4 mr-1" />
                    {isDealership
                      ? 'Agencia Verificada'
                      : 'Vendedor Verificado'}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-tertiary justify-center md:justify-start">
                <Clock className="h-4 w-4" />
                <span>Miembro desde {memberDuration()}</span>
                <span className="text-tertiary/60">
                  (Desde {new Date(memberSince).toLocaleDateString()})
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-tertiary">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-tertiary">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
                {isDealership && dealershipDetails && (
                  <>
                    <div className="flex items-center gap-2 text-tertiary">
                      <Store className="h-5 w-5 text-primary" />
                      <span>{dealershipDetails.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-tertiary">
                      <MapPin className="h-5 w-5 text-primary" />
                      <a
                        href={dealershipDetails.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {dealershipDetails.address}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        {/* Verification Status */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-tertiary mb-6">
            Estado de Verificación
          </h2>

          {/* Verification Items */}
          <div className="grid gap-4">
            {Object.entries(verificationStatus).map(([key, value]) => (
              <div
                key={key}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  value
                    ? 'border-success/20 bg-success/5'
                    : 'border-error/20 bg-error/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {key === 'identification' && (
                    <Certificate className="h-5 w-5 text-primary" />
                  )}
                  {key === 'email' && <Mail className="h-5 w-5 text-primary" />}
                  {key === 'phone' && (
                    <Phone className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium capitalize">
                    {
                      VERIFICATIONS_TRANSLATIONS[
                        key as keyof typeof VERIFICATIONS_TRANSLATIONS
                      ]
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {value ? (
                    <>
                      <span className="text-success text-sm">Verificado</span>
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </>
                  ) : (
                    <>
                      <span className="text-error text-sm">No Verificado</span>
                      <Ban className="h-5 w-5 text-error" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-tertiary mb-6">
            Estadísticas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-quaternary p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Car className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-tertiary">
                  Listados Totales
                </h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                {statistics.totalListings.toLocaleString()}
              </p>
            </div>
            <div className="bg-quaternary p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-tertiary">
                  Autos Vendidos
                </h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                {statistics.totalSold.toLocaleString()}
              </p>
            </div>
            <div className="bg-quaternary p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-tertiary">
                  Vistas Totales
                </h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                {statistics.totalViews.toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* Flexible Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Active Listings - Takes full width if no dealership info */}
          <div
            className={`space-y-8 ${isDealership && dealershipDetails ? 'lg:col-span-3' : 'lg:col-span-4'}`}
          >
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-tertiary mb-6">
                Listados Activos
              </h2>
              <SellerCars />
            </section>
          </div>

          {/* Dealership Details - Only shown if dealership info exists */}
          {isDealership && dealershipDetails && (
            <div className="lg:col-span-1">
              <section className="bg-white rounded-lg shadow-md p-6 sticky top-16">
                <h2 className="text-xl font-bold text-tertiary mb-4">
                  Información de la Agencia
                </h2>

                {/* Operating Permit Status */}
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    dealershipDetails.hasOperatingPermit
                      ? 'bg-success/5 border border-success/20'
                      : 'bg-error/5 border border-error/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Permiso de Operación</span>
                    {dealershipDetails.hasOperatingPermit ? (
                      <div className="flex items-center text-success gap-2">
                        <span>Activo</span>
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    ) : (
                      <span className="text-error">Inactivo</span>
                    )}
                  </div>
                  {dealershipDetails.permitNumber && (
                    <p className="text-sm text-tertiary mt-2">
                      Permiso: {dealershipDetails.permitNumber}
                    </p>
                  )}
                </div>

                {/* Location Images Carousel */}
                {dealershipDetails.locationImages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-tertiary mb-3">
                      Nuestra Ubicación
                    </h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Carousel
                        images={dealershipDetails?.locationImages}
                        model={`${id}`}
                        showDots={true}
                      />
                    </div>
                  </div>
                )}

                {/* Google Maps Link */}
                <a
                  href={dealershipDetails.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Ver en Google Maps
                </a>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
