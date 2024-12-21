export enum Region {
  Africa = "Africa",
  Asia = "Asia",
  Oceania = "Oceania",
  Europe = "Europe",
  Americas = "America",
}

export enum SubRegionn {
  NorthAmerica = "North America",
  SouthAmerica = "South America",
}
export interface Airport {
  name: string;
  code: string;
}

export interface State {
  name: string | null; // States can have null names
  airports: Airport[];
}

export interface Country {
  name: string;
  code: string;
  states: State[];
  airports: Airport[]; // All airports in the country
}

export interface Continent {
  name: string | null; // Continents can have null names
  countries: Country[];
}
type UniqueLocation = {
  name: string | null; // Name of the state or municipality
  country: string | null; // Name of the country
  continent: string | null; // Name of the continent
};

export type UniqueStates = UniqueLocation[];
export type UniqueMunicipalities = UniqueLocation[];

export type SearchResults = {
  countries: {
    name: string;
    airports: { name: string; code: string }[];
  }[];
  states: {
    name: string;
    country: string;
    airports: { name: string; code: string }[];
  }[];
  airports: {
    name: string;
    code: string;
    state: string;
    country: string;
  }[];
};
// const takeOff = form.watch("takeOff");

// const fetchAiportsBySearchTerm = React.useCallback(async () => {
//   if (!takeOff || typeof takeOff !== "string" || takeOff.trim() === "") {
//     return;
//   }
//   const airports = await api.airports.getAll(takeOff);

//   if (airports.error) {
//     toast(airports.error.message);
//   }

//   if (airports.success && airports.data) {
//     console.log(airports.data);
//     setTakeOffAirport(airports.data);
//   }
// }, [form.watch("takeOff")]);

// React.useEffect(() => {
//   fetchAiportsBySearchTerm();
// }, [fetchAiportsBySearchTerm]);
