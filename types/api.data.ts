export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export interface Live {
  updated: Date;
  latitude: number;
  longitude: number;
  altitude: number;
  direction: number;
  speed_horizontal: number;
  speed_vertical: number;
  is_ground: boolean;
}
export interface Codeshared {
  airline_name: string;
  airline_iata: string;
  airline_icao: string;
  flight_number: string;
  flight_iata: string;
  flight_icao: string;
}
export interface Flight {
  number: string;
  iata: string;
  icao: string;
  codeshared: Codeshared | null;
}
export interface Arrival {
  airport: string;
  timezone: string;
  iata: string;
  icao: string;
  terminal: null | string;
  gate: null | string;
  baggage?: null | string;
  delay: number | null;
  scheduled: Date;
  estimated: Date;
  actual: null;
  estimated_runway: null;
  actual_runway: null;
}
export interface Airline {
  name: string;
  iata: string;
  icao: string;
}
export interface Aircraft {
  registration: string;
  iata: string;
  icao: string;
  icao24: string;
}
export interface AvaitionDatum {
  flight_date: Date;
  flight_status: string;
  departure: Arrival;
  arrival: Arrival;
  airline: Airline;
  flight: Flight;
  aircraft: Aircraft | null;
  live: Live | null;
}

export interface AviationStackFlightResponse {
  pagination: Pagination;

  data: AvaitionDatum[];
}

// THIS IS FOR AMADEUS API RSULT

interface Location {
  cityCode: string;
  countryCode: string;
}
interface LocationDetail {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface Segment {
  departure: LocationDetail;
  arrival: LocationDetail;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}
interface Itinerary {
  duration: string;
  segments: Segment[];
}

interface Fee {
  amount: string;
  type: string;
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}
interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: {
    weight: number;
    weightUnit: string;
  };
}
interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetailsBySegment[];
}

interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface FlightOfferResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: FlightOffer[];
  dictionaries: {
    locations: Record<string, Location>;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
}
