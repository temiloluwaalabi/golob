"use server";

import { db } from "@/lib/db";
import { NotFoundError } from "@/lib/http-errors";

export const getAllAirports = async () => {
  const airports = await db.airport.findMany();

  if (!airports) {
    throw new NotFoundError("Airports");
  }

  const continents = Array.from(
    new Set(airports.map((airport) => airport.continent))
  ).map((continent) => {
    const continentAirports = airports.filter(
      (airport) => airport.continent === continent
    );

    const countries = Array.from(
      new Set(continentAirports.map((airport) => airport.country))
    ).map((country) => {
      const countryAirports = continentAirports.filter(
        (airport) => airport.country === country
      );

      const states = Array.from(
        new Set(countryAirports.map((airport) => airport.state))
      ).map((state) => ({
        name: state,
        airports: countryAirports
          .filter((airport) => airport.state === state)
          .map((airport) => ({
            name: airport.name,
            code: airport.iata, // Replace with actual airport code field
          })),
      }));

      return {
        name: country,
        code: countryAirports[0]?.countryCode, // Assuming all airports in the same country have the same code
        states: states,
        airports: countryAirports.map((airport) => ({
          name: airport.name,
          code: airport.iata, // Replace with actual airport code field
          state: airport.state,
        })),
      };
    });

    return {
      name: continent,
      countries: countries,
    };
  });

  const uniqueStates = Array.from(
    new Set(airports.map((airport) => airport.state))
  )
    .filter(Boolean)
    .map((state) => {
      const stateAirports = airports.filter(
        (airport) => airport.state === state
      );
      return {
        name: state,
        country: stateAirports[0]?.country,
        continent: stateAirports[0]?.continent,
      };
    });

  // Build unique municipalities array
  const uniqueMunicipalities = Array.from(
    new Set(airports.map((airport) => airport.municipalityName))
  )
    .filter(Boolean)
    .map((municipality) => {
      const municipalityAirports = airports.filter(
        (airport) => airport.municipalityName === municipality
      );
      return {
        name: municipality,
        country: municipalityAirports[0]?.country,
        continent: municipalityAirports[0]?.continent,
        state: municipalityAirports[0].state,
      };
    });

  return {
    continents,
    uniqueStates,
    uniqueMunicipalities,
  };
};

export const getAllDBAirports = async () => {
  const airports = await db.airport.findMany();

  if (!airports) {
    throw new NotFoundError("Airports");
  }

  return {
    success: "Airports fecthed",
    airports: airports,
  };
};
