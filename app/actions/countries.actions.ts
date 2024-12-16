"use server";

import { Country } from "@/types";
import { Region, SubRegionn } from "@/types/main";

const fetchCountriesBuURL = async (url: string): Promise<Country[]> => {
  const response = await fetch(url);
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
    capital: country.capital,
    region: country.region,
    continents: [...country.continents],
    flag: country.flags.png,
    flagAlt: country.flags.alt,
  }));
};

export const fetchCountriesByRegionAndSubRegions = async () => {
  const regions = Object.values(Region);
  const subRegions = Object.values(SubRegionn);

  const regionPromises = regions.map(async (region) => ({
    region,
    countries: await fetchCountriesBuURL(
      `https://restcountries.com/v3.1/region/${region}`
    ),
  }));
  const subRegionPromises = subRegions.map(async (subRegion) => ({
    region: subRegion,
    countries: await fetchCountriesBuURL(
      `https://restcountries.com/v3.1/subregion/${subRegion}`
    ),
  }));

  const results = await Promise.all([...regionPromises, ...subRegionPromises]);
  //   console.log(results);

  return results;
};
