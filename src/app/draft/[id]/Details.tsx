'use client';
import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Upload,
  Info,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { useGetDraftById } from '@/app/draft/[id]/service/getDraftById';

interface ListingImages {
  imgBodyFL: string | null;
  imgBodyFC: string | null;
  imgBodyFR: string | null;
  imgBodyRL: string | null;
  imgBodyRC: string | null;
  imgBodyRR: string | null;
  imgBodySL: string | null;
  imgBodySR: string | null;
  imgInteriorDash: string | null;
  imgInteriorCluster: string | null;
  imgInteriorRadio: string | null;
  imgInteriorSeatF: string | null;
  imgInteriorSeatR: string | null;
  imgInteriorTrunk: string | null;
  imgEngine: string | null;
}

interface ListingData {
  id: number;
  allowTradeTF: boolean;
  license: string;
  mileage: number;
  mileageType: string;
  price: number;
  currency: string;
  negotiableTF: boolean;
  year: number;
  country: string | null;
  state: string | null;
  make: string;
  model: string;
  trim: string;
  body: string;
  condition: string;
  inspectionYear: number;
  taxesPaidTF: boolean;
  engineModifiedTF: boolean;
  lP_ConversionTF: boolean;
  approvalStageID: string;
  sellerComment: string | null;
  transType: string;
  transGearCount: number;
  fuelType: string;
  driveType: string;
  images: ListingImages;
  accountData: unknown;
}

// Constants for form options
const CONDITIONS = ['Excelente', 'Muy Bueno', 'Bueno', 'Regular'];
const TRANSMISSION_TYPES = ['Automatico', 'Manual', 'CVT', 'DCT'];
const GEAR_COUNTS = [4, 5, 6, 7, 8, 9, 10];
const FUEL_TYPES = ['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico', 'Gas'];
const DRIVE_TYPES = ['FWD', 'RWD', 'AWD', '4WD'];
const BODY_TYPES = ['Sedán', 'SUV', 'Hatchback', 'Pickup', 'Coupé', 'Van'];

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

const initialListing = {
  id: 98,
  allowTradeTF: false,
  license: 'FTT233',
  mileage: 0,
  mileageType: 'KM',
  price: 0,
  currency: 'CRC',
  negotiableTF: false,
  year: 2026,
  country: null,
  state: null,
  make: 'The HiPhi Y 4',
  model: 'Testing Model',
  trim: 'Testing trim',
  body: '',
  condition: 'Excelente',
  inspectionYear: 2025,
  taxesPaidTF: false,
  engineModifiedTF: false,
  lP_ConversionTF: false,
  approvalStageID: 'Draft',
  sellerComment: null,
  transType: 'Automatico',
  transGearCount: 6,
  fuelType: 'Gasolina',
  driveType: 'FWD',
  images: {
    imgBodyFL:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/frontLeft-negate.jpg',
    imgBodyFC: null,
    imgBodyFR:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/frontRight-negate.jpg',
    imgBodyRL:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/rearLeft-negate.jpg',
    imgBodyRC: null,
    imgBodyRR:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/rearRight-negate.jpg',
    imgBodySL: null,
    imgBodySR: null,
    imgInteriorDash:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/dashFull-negate.jpg',
    imgInteriorCluster:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/dashCluster-negate.jpg',
    imgInteriorRadio:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/dashInfotrainment-negate.jpg',
    imgInteriorSeatF:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatFront-negate.jpg',
    imgInteriorSeatR:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/seatRear-negate.jpg',
    imgInteriorTrunk:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/trunk-negate.jpg',
    imgEngine:
      'http://bmcloud9.com/images/carrocr/sampleCar/embossed/engine-negate.jpg',
  },
  accountData: null,
};

interface Props {
  id: number;
}

export default function Details({ id }: Props) {
  const { data, isLoading } = useGetDraftById(id);
  console.log('DATA', data);

  console.log('isLoading', isLoading);
  const onBack = () => {
    console.log('Navigating back to listings');
  };
  const onSave = (data: unknown) => {
    console.log('Saving listing:', data);
  };

  const onSubmitForReview = (data: unknown) => {
    console.log('Submitting for review:', data);
  };

  const [listing, setListing] = useState<ListingData>(initialListing);
  const [activeTab, setActiveTab] = useState<'details' | 'images'>('details');
  const [saving, setSaving] = useState(false);

  // Calculate completion percentage
  const calculateCompletion = () => {
    const requiredFields = [
      listing.mileage > 0,
      listing.price > 0,
      listing.body !== '',
      listing.condition !== '',
      listing.transType !== '',
      listing.fuelType !== '',
      listing.driveType !== '',
      // Check for at least one image in each category
      Object.values(listing.images).some((img) => img !== null),
    ];

    const completedFields = requiredFields.filter(Boolean).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const handleChange = (field: keyof ListingData, value: unknown) => {
    setListing((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (key: keyof ListingImages) => {
    // Simulated image upload - in a real implementation, this would handle file selection and upload
    console.log(`Uploading image for ${key}`);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(listing);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForReview = () => {
    const completion = calculateCompletion();
    if (completion < 100) {
      alert(
        'Please complete all required fields before submitting for review.',
      );
      return;
    }
    onSubmitForReview(listing);
  };

  const renderDetailsTab = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Read-only fields */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              License Plate
            </label>
            <input
              type="text"
              value={listing.license}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Make & Model
            </label>
            <input
              type="text"
              value={`${listing.make} ${listing.model} ${listing.trim}`}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Year
            </label>
            <input
              type="text"
              value={listing.year}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Editable fields */}
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Body Type
            </label>
            <select
              value={listing.body}
              onChange={(e) => handleChange('body', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Body Type</option>
              {BODY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Price & Trade */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">Price & Trade</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Price ({listing.currency})
            </label>
            <input
              type="number"
              value={listing.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={listing.negotiableTF}
                onChange={(e) => handleChange('negotiableTF', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-tertiary">Price Negotiable</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={listing.allowTradeTF}
                onChange={(e) => handleChange('allowTradeTF', e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-tertiary">Accept Trade</span>
            </label>
          </div>
        </div>
      </section>

      {/* Vehicle Details */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Vehicle Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Mileage
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={listing.mileage}
                onChange={(e) =>
                  handleChange('mileage', Number(e.target.value))
                }
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <select
                value={listing.mileageType}
                onChange={(e) => handleChange('mileageType', e.target.value)}
                className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="KM">KM</option>
                <option value="MI">MI</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Condition
            </label>
            <select
              value={listing.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Condition</option>
              {CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Inspection Year
            </label>
            <input
              type="number"
              value={listing.inspectionYear}
              onChange={(e) =>
                handleChange('inspectionYear', Number(e.target.value))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Transmission Type
            </label>
            <select
              value={listing.transType}
              onChange={(e) => handleChange('transType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Transmission</option>
              {TRANSMISSION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Number of Gears
            </label>
            <select
              value={listing.transGearCount}
              onChange={(e) =>
                handleChange('transGearCount', Number(e.target.value))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Gears</option>
              {GEAR_COUNTS.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Fuel Type
            </label>
            <select
              value={listing.fuelType}
              onChange={(e) => handleChange('fuelType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Fuel Type</option>
              {FUEL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-2">
              Drive Type
            </label>
            <select
              value={listing.driveType}
              onChange={(e) => handleChange('driveType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select Drive Type</option>
              {DRIVE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={listing.taxesPaidTF}
              onChange={(e) => handleChange('taxesPaidTF', e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-tertiary">Taxes Paid</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={listing.engineModifiedTF}
              onChange={(e) =>
                handleChange('engineModifiedTF', e.target.checked)
              }
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-tertiary">Engine Modified</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={listing.lP_ConversionTF}
              onChange={(e) =>
                handleChange('lP_ConversionTF', e.target.checked)
              }
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-tertiary">LP Conversion</span>
          </label>
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Additional Information
        </h2>
        <div>
          <label className="block text-sm font-medium text-tertiary mb-2">
            Sellers Comment
          </label>
          <textarea
            value={listing.sellerComment || ''}
            onChange={(e) => handleChange('sellerComment', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Add any additional information about your vehicle..."
          />
        </div>
      </section>
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-8">
      {/* Image Upload Guide */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-tertiary mb-2">
              Photo Guidelines
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tertiary">
              <li>Use good lighting - natural daylight works best</li>
              <li>Take photos from all angles as shown in the guide</li>
              <li>Ensure the entire vehicle is in frame for exterior shots</li>
              <li>Highlight any damage or imperfections</li>
              <li>Maximum file size: 5MB per image</li>
              <li>Accepted formats: JPG, PNG</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exterior Photos */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Exterior Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.exterior.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <p className="text-sm font-medium text-tertiary">{label}</p>
              {listing.images[key as keyof ListingImages] ? (
                <div className="relative aspect-[4/3] group">
                  <img
                    src={listing.images[key as keyof ListingImages]!}
                    alt={label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleImageUpload(key as keyof ListingImages)
                      }
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-tertiary" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleImageUpload(key as keyof ListingImages)}
                  className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"
                >
                  <Camera className="h-6 w-6 text-tertiary/60" />
                  <span className="text-sm text-tertiary/60">Add Photo</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Interior Photos */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Interior Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.interior.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <p className="text-sm font-medium text-tertiary">{label}</p>
              {listing.images[key as keyof ListingImages] ? (
                <div className="relative aspect-[4/3] group">
                  <img
                    src={listing.images[key as keyof ListingImages]!}
                    alt={label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleImageUpload(key as keyof ListingImages)
                      }
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-tertiary" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleImageUpload(key as keyof ListingImages)}
                  className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"
                >
                  <Camera className="h-6 w-6 text-tertiary/60" />
                  <span className="text-sm text-tertiary/60">Add Photo</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mechanical Photos */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-tertiary mb-6">
          Mechanical Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMAGE_SECTIONS.mechanical.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <p className="text-sm font-medium text-tertiary">{label}</p>
              {listing.images[key as keyof ListingImages] ? (
                <div className="relative aspect-[4/3] group">
                  <img
                    src={listing.images[key as keyof ListingImages]!}
                    alt={label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleImageUpload(key as keyof ListingImages)
                      }
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-tertiary" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleImageUpload(key as keyof ListingImages)}
                  className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"
                >
                  <Camera className="h-6 w-6 text-tertiary/60" />
                  <span className="text-sm text-tertiary/60">Add Photo</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const completion = calculateCompletion();

  return (
    <>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-tertiary hover:text-primary mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Listings
      </button>

      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-tertiary">Edit Listing</h1>
            <p className="text-tertiary/60">
              Update your listing information and photos
            </p>
          </div>
          <div className="flex items-center gap-2">
            {completion === 100 ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <AlertCircle className="h-5 w-5 text-warning" />
            )}
            <span className="text-sm font-medium text-tertiary">
              {completion}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'details'
              ? 'bg-primary text-white'
              : 'hover:bg-primary/10'
          }`}
        >
          <FileText className="h-5 w-5" />
          Details
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'images'
              ? 'bg-primary text-white'
              : 'hover:bg-primary/10'
          }`}
        >
          <ImageIcon className="h-5 w-5" />
          Images
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' ? renderDetailsTab() : renderImagesTab()}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-tertiary hover:bg-gray-100 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmitForReview}
            disabled={completion < 100}
            className={`px-6 py-2 rounded-lg transition-colors ${
              completion === 100
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit for Review
          </button>
        </div>
      </div>
    </>
  );
}
