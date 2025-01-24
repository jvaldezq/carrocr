export interface Car {
    id: number;
    condition: string;
    trim: string;
    model: string;
    make: string;
    priceDollars: number;
    priceColones: number;
    priceExchange: number;
    year: number;
    mileage: number;
    thumbnail: string;
    imgBodyFL: string;
    imgBodyFR: string;
    imgBodyFC: string;
    imgBodySL: string;
    imgBodySR: string;
    imgBodyRL: string;
    imgBodyRR: string;
    imgBodyRC: string;
    imgInteriorDash: string;
    imgInteriorCluster: string;
    imgInteriorRadio: string;
    imgInteriorSeatF: string;
    imgInteriorSeatR: string;
    imgInteriorTrunk: string;
    imgEngine: string;
    transType: string;
    fuelType: string;
    bodyName: string;
    driveType: string;
    sellerComment: null;
    approvalStageID: number;
    acctVerified: boolean;
    images: string[];
    factorySpecifications: FactorySpecification;
    negotiableTF: boolean;
    allowTradeTF: boolean;
    inspectionMonth: string;
    inspectionYear: string;
    restrictionDay: string;
    comments: string;
    location: Location;
}

export interface  Location {
    city: string;
    state: string;
}

export interface FactorySpecification {
    fuelType: string;
    fuelGrade: string;
    cubicCentimeters: number;
    cylinderCount: string;
    horsepower: number;
    horsepowerRPM: number;
    torque: number;
    torqueRPM: number;
    valveCount: number;
    camTimingType: string;
    camType: string;
    mpgCombine: number;
    mpgCity: number;
    mpgHighway: number;
    doorCount: number;
    seatCount: number;
    groundHeight: number;
    length: number;
    width: number;
    height: number;
    curbWeight: number;
    payloadCap: number;
    towingCap: number;
    driveName: string;
    driveNameAbbr: string;
    driveAbbr: string;
    driveNameSpanish: null;
    transName: string;
    transGearCount: string;
    transNameAbbr: string;
    transNameSpanish: null;
    fuelCapLiters: string;
    superFuel: string;
}