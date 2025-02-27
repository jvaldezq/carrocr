'use client';
import React from 'react';
import { Info } from 'lucide-react';

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
      {/*<section className="bg-white rounded-lg shadow-md p-6">*/}
      {/*  <h2 className="text-xl font-bold text-tertiary mb-6">*/}
      {/*    Exterior Photos*/}
      {/*  </h2>*/}
      {/*  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">*/}
      {/*    {IMAGE_SECTIONS.exterior.map(({ key, label }) => (*/}
      {/*      <div key={key} className="space-y-2">*/}
      {/*        <p className="text-sm font-medium text-tertiary">{label}</p>*/}
      {/*        {listing.images[key as keyof ListingImages] ? (*/}
      {/*          <div className="relative aspect-[4/3] group">*/}
      {/*            <img*/}
      {/*              src={listing.images[key as keyof ListingImages]!}*/}
      {/*              alt={label}*/}
      {/*              className="w-full h-full object-cover rounded-lg"*/}
      {/*            />*/}
      {/*            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">*/}
      {/*              <button*/}
      {/*                onClick={() =>*/}
      {/*                  handleImageUpload(key as keyof ListingImages)*/}
      {/*                }*/}
      {/*                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"*/}
      {/*              >*/}
      {/*                <Upload className="h-5 w-5 text-tertiary" />*/}
      {/*              </button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <button*/}
      {/*            onClick={() => handleImageUpload(key as keyof ListingImages)}*/}
      {/*            className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"*/}
      {/*          >*/}
      {/*            <Camera className="h-6 w-6 text-tertiary/60" />*/}
      {/*            <span className="text-sm text-tertiary/60">Add Photo</span>*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Interior Photos */}
      {/*<section className="bg-white rounded-lg shadow-md p-6">*/}
      {/*  <h2 className="text-xl font-bold text-tertiary mb-6">*/}
      {/*    Interior Photos*/}
      {/*  </h2>*/}
      {/*  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">*/}
      {/*    {IMAGE_SECTIONS.interior.map(({ key, label }) => (*/}
      {/*      <div key={key} className="space-y-2">*/}
      {/*        <p className="text-sm font-medium text-tertiary">{label}</p>*/}
      {/*        {listing.images[key as keyof ListingImages] ? (*/}
      {/*          <div className="relative aspect-[4/3] group">*/}
      {/*            <img*/}
      {/*              src={listing.images[key as keyof ListingImages]!}*/}
      {/*              alt={label}*/}
      {/*              className="w-full h-full object-cover rounded-lg"*/}
      {/*            />*/}
      {/*            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">*/}
      {/*              <button*/}
      {/*                onClick={() =>*/}
      {/*                  handleImageUpload(key as keyof ListingImages)*/}
      {/*                }*/}
      {/*                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"*/}
      {/*              >*/}
      {/*                <Upload className="h-5 w-5 text-tertiary" />*/}
      {/*              </button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <button*/}
      {/*            onClick={() => handleImageUpload(key as keyof ListingImages)}*/}
      {/*            className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"*/}
      {/*          >*/}
      {/*            <Camera className="h-6 w-6 text-tertiary/60" />*/}
      {/*            <span className="text-sm text-tertiary/60">Add Photo</span>*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Mechanical Photos */}
      {/*<section className="bg-white rounded-lg shadow-md p-6">*/}
      {/*  <h2 className="text-xl font-bold text-tertiary mb-6">*/}
      {/*    Mechanical Photos*/}
      {/*  </h2>*/}
      {/*  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">*/}
      {/*    {IMAGE_SECTIONS.mechanical.map(({ key, label }) => (*/}
      {/*      <div key={key} className="space-y-2">*/}
      {/*        <p className="text-sm font-medium text-tertiary">{label}</p>*/}
      {/*        {listing.images[key as keyof ListingImages] ? (*/}
      {/*          <div className="relative aspect-[4/3] group">*/}
      {/*            <img*/}
      {/*              src={listing.images[key as keyof ListingImages]!}*/}
      {/*              alt={label}*/}
      {/*              className="w-full h-full object-cover rounded-lg"*/}
      {/*            />*/}
      {/*            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">*/}
      {/*              <button*/}
      {/*                onClick={() =>*/}
      {/*                  handleImageUpload(key as keyof ListingImages)*/}
      {/*                }*/}
      {/*                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"*/}
      {/*              >*/}
      {/*                <Upload className="h-5 w-5 text-tertiary" />*/}
      {/*              </button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <button*/}
      {/*            onClick={() => handleImageUpload(key as keyof ListingImages)}*/}
      {/*            className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50"*/}
      {/*          >*/}
      {/*            <Camera className="h-6 w-6 text-tertiary/60" />*/}
      {/*            <span className="text-sm text-tertiary/60">Add Photo</span>*/}
      {/*          </button>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  );
};
