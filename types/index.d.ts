import { UserStaus } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  secondEmail?: string | null;
  image?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  dob?: Date | null;
  emailVerified?: string | Date | null;
  hashedPassword?: string | null;
  terms?: boolean | null;
  //   accounts: Account[];
  //   sessions: Session[];
  //   twoFactorConfirmation?: TwoFactorConfirmation;
  // authenticators: Authenticator[];
  role: UserRole; // Make sure you have a UserRole enum defined
  isTwoFactorEnabled: boolean;
  userStatus: UserStaus; // Make sure you have a UserStaus enum defined
  accountVerified: boolean;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  // affiliates: Affiliate[];
}
type Field = {
  label: string;
  type: "text" | "file";
  placeholder: string;
};

type Document = {
  name: string;
  fields: Field[];
};

type Documents = {
  personal: Document[];
  business: Document[];
};

type CountryKYC = {
  country: string;
  documents: Documents;
};

// export const kycDocs: CountryKYC[] = [
//   // your data here
// ];

export interface Country {
  name: string;
  // tld: string;
  code: string;
  // ccn3: string;
  capital: string;
  region: string;
  subRegion: string;
  continents: string[];
  flag: string;
  flagAlt: string;
}

export interface RegionCountry {
  region: string;
  countries: Country[];
}

export enum AfricaSubregion {
  EasternAfrica = "Eastern Africa",
  MiddleAfrica = "Middle Africa",
  NorthernAfrica = "Northern Africa",
  SouthernAfrica = "Southern Africa",
  WesternAfrica = "Western Africa",
}
export enum EuropeSubregion {
  CentralEurope = "Central Europe",
  EasternEurope = "Eastern Europe",
  NorthernEurope = "Northern Europe",
  SoutheastEurope = "Southeast Europe",
  SouthernEurope = "Southern Europe",
  WesternEurope = "Western Europe",
}
export enum OceaniaSubregion {
  AustraliaAndNewZealand = "Australia and New Zealand",
  Melanesia = "Melanesia",
  Micronesia = "Micronesia",
  Polynesia = "Polynesia",
}
export enum Continent {
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
  America = "America",
  Africa = "Africa",
  Europe = "Europe",
  Asia = "Asia",
}

export enum AmericaSubregion {
  Caribbean = "Caribbean",
  CentralAmerica = "Central America",
  NorthAmerica = "North America",
  SouthAmerica = "South America",
}

export interface IAirport {
  icao: string;
  iata: string;
  localCode: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode: string;
  timeZone: string;
}
