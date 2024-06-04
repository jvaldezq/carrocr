export interface Car {
    id: number;
    model: string;
    trim: string;
    make: string;
    thumbnail: string;
    images: string[];
    year: number;
    priceDollars: number;
    mileage: number;
    transType: string;
    acctVerified: boolean;
    acctID: number,
    condition: string,
    transGears: number,
    priceColones: number,
    priceExchange: number,
    fuelType: string;
    engineSizeLiters: number;
    engineSizeCC: number;
    engineCylinders: string;
    engineHp: number;
    engineHpRPM: number;
    engineTqFtLbs: number;
    engineTqNm: number;
    engineTqRPM: number;
    economyMpg: number;
    econCityMpg: number;
    econHwMpg: number;
    economyL100Km: number;
    econCityL100Km: number;
    econHwL100Km: number;
    driveSystem: string;
    driveSystemAlt: string;
}
