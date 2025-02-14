// @ts-nocheck
'use client';
import React, {useState} from 'react';
import {
    AlertCircle,
    Car,
    CheckCircle2,
    Clock,
    DollarSign,
    ExternalLink,
    Eye,
    Mail,
    MessageCircle,
    Pencil,
    Phone,
    Plus,
    Shield,
    Trash2,
    XCircle
} from 'lucide-react';
import Card from "@/components/Card/Card";
import {CURRENCIES} from "@/lib/NumberFormats";

const mockSeller = {
    acctVerified: true,
    email: "john.dealer@example.com",
    phone: "+1 (555) 123-4567",
    picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    fullName: "John Dealer",
    memberSince: "2023-01-15",
    isDealership: true,
    dealershipDetails: {
        address: "123 Auto Drive, Car City, CC 12345",
        googleMapsUrl: "https://maps.google.com",
        openingHours: "Mon-Sat: 9:00 AM - 6:00 PM",
        hasOperatingPermit: true,
        permitNumber: "DEA-2023-12345"
    },
    verificationStatus: {
        identification: true,
        email: true,
        phone: false
    },
    statistics: {
        totalListings: 24,
        totalSold: 156,
        totalViews: 12500,
        totalInquiries: 345,
        responseRate: 95,
        avgResponseTime: "2 hours"
    },
    listings: [
        {
            id: 1,
            make: "Toyota",
            model: "Camry",
            year: 2020,
            price: 25000,
            mileage: 35000,
            thumbnail: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80",
            location: "Car City",
            verified: true,
            status: "published",
            views: 250,
            inquiries: 15,
            lastUpdated: "2024-03-10"
        },
        {
            id: 2,
            make: "Honda",
            model: "Civic",
            year: 2021,
            price: 22000,
            mileage: 28000,
            thumbnail: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80",
            location: "Car City",
            verified: true,
            status: "draft",
            views: 0,
            inquiries: 0,
            lastUpdated: "2024-03-12"
        },
        {
            id: 3,
            make: "BMW",
            model: "3 Series",
            year: 2019,
            price: 32000,
            mileage: 45000,
            thumbnail: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80",
            location: "Car City",
            verified: true,
            status: "pending",
            views: 120,
            inquiries: 8,
            lastUpdated: "2024-03-11"
        }
    ]
};

interface Listing {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    thumbnail: string;
    location: string;
    verified: boolean;
    status: 'published' | 'draft' | 'pending';
    views: number;
    inquiries: number;
    lastUpdated: string;
}

interface SellerAdminPageProps {
    seller: {
        acctVerified: boolean;
        email: string;
        phone: string;
        picture: string;
        fullName: string;
        memberSince: string;
        isDealership: boolean;
        dealershipDetails?: {
            address: string;
            googleMapsUrl: string;
            openingHours: string;
            hasOperatingPermit: boolean;
            permitNumber?: string;
        };
        verificationStatus: {
            identification: boolean;
            email: boolean;
            phone: boolean;
        };
        statistics: {
            totalListings: number;
            totalSold: number;
            totalViews: number;
            totalInquiries: number;
            responseRate: number;
            avgResponseTime: string;
        };
        listings: Listing[];
    };
}

type TabType = 'dashboard' | 'listings' | 'profile';
type ListingTabType = 'published' | 'draft' | 'pending';

export default function SellerAdmin() {
    const seller = mockSeller;
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [activeListingTab, setActiveListingTab] = useState<ListingTabType>('published');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'text-success';
            case 'draft':
                return 'text-tertiary';
            case 'pending':
                return 'text-warning';
            default:
                return 'text-tertiary';
        }
    };

    const getStatusIcon = (status: string | undefined) => {
        switch (status) {
            case 'published':
                return <CheckCircle2 className="h-5 w-5" />;
            case 'draft':
                return <Clock className="h-5 w-5" />;
            case 'pending':
                return <AlertCircle className="h-5 w-5" />;
            default:
                return null;
        }
    };

    const filteredListings = seller.listings.filter(
        listing => listing.status === activeListingTab
    );

    const renderDashboard = () => (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Car className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-medium text-tertiary">Active Listings</h3>
                    </div>
                    <p className="text-3xl font-bold text-primary">{seller.statistics.totalListings}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-6 w-6 text-success" />
                        <h3 className="text-lg font-medium text-tertiary">Total Sales</h3>
                    </div>
                    <p className="text-3xl font-bold text-success">{seller.statistics.totalSold}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Eye className="h-6 w-6 text-info" />
                        <h3 className="text-lg font-medium text-tertiary">Total Views</h3>
                    </div>
                    <p className="text-3xl font-bold text-info">{seller.statistics.totalViews}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="h-6 w-6 text-warning" />
                        <h3 className="text-lg font-medium text-tertiary">Inquiries</h3>
                    </div>
                    <p className="text-3xl font-bold text-warning">{seller.statistics.totalInquiries}</p>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-tertiary mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Response Rate */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-tertiary">Response Rate</span>
                            <span className="font-medium">{seller.statistics.responseRate}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${seller.statistics.responseRate}%` }}
                            />
                        </div>
                    </div>

                    {/* Average Response Time */}
                    <div className="flex items-center justify-between">
                        <span className="text-tertiary">Avg. Response Time</span>
                        <span className="font-medium">{seller.statistics.avgResponseTime}</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-tertiary mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {seller.listings.slice(0, 5).map(listing => (
                        <div key={listing.id} className="flex items-center justify-between p-4 hover:bg-quaternary rounded-lg transition-colors">
                            <div className="flex items-center gap-4">
                                <img
                                    src={listing.thumbnail}
                                    alt={`${listing.make} ${listing.model}`}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="font-medium text-tertiary">
                                        {listing.make} {listing.model} {listing.year}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-tertiary/60">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                        {listing.views} views
                    </span>
                                        <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                                            {listing.inquiries} inquiries
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                    <Pencil className="h-5 w-5 text-primary" />
                                </button>
                                <button className="p-2 hover:bg-error/10 rounded-lg transition-colors">
                                    <Trash2 className="h-5 w-5 text-error" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderListings = () => (
        <div className="space-y-8">
            {/* Listing Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveListingTab('published')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeListingTab === 'published'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setActiveListingTab('draft')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeListingTab === 'draft'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Drafts
                    </button>
                    <button
                        onClick={() => setActiveListingTab('pending')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeListingTab === 'pending'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Pending
                    </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    <Plus className="h-5 w-5" />
                    New Listing
                </button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                    <div key={listing.id} className="relative">
                        <Card
                            thumbnail={listing.thumbnail}
                            make={listing.make}
                            model={listing.model}
                            price={listing.price}
                            year={listing.year} id={0} condition={''} trim={''} currency={CURRENCIES.CRC} mileage={0}
                            mileageType={''} images={[]} transType={''} fuelType={''} bodyName={''} driveType={''}
                            sellerComment={null} approvalStageID={0} acctVerified={false}
                            negotiableTF={false} allowTradeTF={false}
                            inspectionMonth={''} inspectionYear={''} restrictionDay={''} comments={''} city={''}
                            state={''}                   />
                        <div className="absolute top-2 right-2 flex gap-2">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-white shadow-md ${getStatusColor(listing.status)}`}>
                                {getStatusIcon(listing?.status)}
                                <span className="capitalize">{listing.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-tertiary mb-6">Contact Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={seller.picture}
                            alt={seller.fullName}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-medium text-tertiary">{seller.fullName}</h3>
                            <p className="text-sm text-tertiary/60">Member since {new Date(seller.memberSince).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-tertiary mb-2">
                                Email Address
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="email"
                                    value={seller.email}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    readOnly
                                />
                                <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                    <Pencil className="h-5 w-5 text-primary" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-tertiary mb-2">
                                Phone Number
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="tel"
                                    value={seller.phone}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    readOnly
                                />
                                <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                    <Pencil className="h-5 w-5 text-primary" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-tertiary mb-6">Account Verification</h2>
                <div className="space-y-4">
                    {Object.entries(seller.verificationStatus).map(([key, value]) => (
                        <div
                            key={key}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                                value ? 'border-success/20 bg-success/5' : 'border-error/20 bg-error/5'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {key === 'identification' && <Shield className="h-5 w-5 text-primary" />}
                                {key === 'email' && <Mail className="h-5 w-5 text-primary" />}
                                {key === 'phone' && <Phone className="h-5 w-5 text-primary" />}
                                <span className="font-medium capitalize">
                  {key} Verification
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {value ? (
                                    <>
                                        <span className="text-success text-sm">Verified</span>
                                        <CheckCircle2 className="h-5 w-5 text-success" />
                                    </>
                                ) : (
                                    <>
                                        <span className="text-error text-sm">Not Verified</span>
                                        <XCircle className="h-5 w-5 text-error" />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dealership Information (if applicable) */}
            {seller.isDealership && seller.dealershipDetails && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-tertiary mb-6">Dealership Information</h2>
                    <div className="space-y-6">
                        <div className={`p-4 rounded-lg ${
                            seller.dealershipDetails.hasOperatingPermit
                                ? 'bg-success/5 border border-success/20'
                                : 'bg-error/5 border border-error/20'
                        }`}>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Operating Permit</span>
                                {seller.dealershipDetails.hasOperatingPermit ? (
                                    <div className="flex items-center text-success gap-2">
                                        <span>Active</span>
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                ) : (
                                    <div className="flex items-center text-error gap-2">
                                        <span>Inactive</span>
                                        <XCircle className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                            {seller.dealershipDetails.permitNumber && (
                                <p className="text-sm text-tertiary mt-2">
                                    Permit: {seller.dealershipDetails.permitNumber}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-tertiary mb-2">
                                    Business Hours
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={seller.dealershipDetails.openingHours}
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        readOnly
                                    />
                                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                        <Pencil className="h-5 w-5 text-primary" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-tertiary mb-2">
                                    Address
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={seller.dealershipDetails.address}
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        readOnly
                                    />
                                    <a
                                        href={seller.dealershipDetails.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="h-5 w-5 text-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
                {/* Page Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-tertiary">Seller Dashboard</h1>
                            <p className="text-tertiary/60">Manage your listings and account settings</p>
                        </div>
                        {seller.acctVerified && (
                            <div className="flex items-center text-verified text-sm bg-verified/10 px-3 py-1 rounded-full">
                                <Shield className="h-4 w-4 mr-1" />
                                Verified {seller.isDealership ? 'Dealership' : 'Seller'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'dashboard'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'listings'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Listings
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'profile'
                                ? 'bg-primary text-white'
                                : 'hover:bg-primary/10'
                        }`}
                    >
                        Profile
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'listings' && renderListings()}
                {activeTab === 'profile' && renderProfile()}
        </main>
    );
}