"use client";

import axios from "axios";

/**
 * Get the search data for all the Pokemons on from PokeAPI.
 * Each element has the Pokemon's name and API endpoint to retrieve all its data.
 */
export const getPokemonSearchData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_POKEAPI_ENDPOINT}/?limit=${process.env.NEXT_PUBLIC_POKEMON_COUNT}`);
        // The results come inside 'results' array in 'data' object.
        // Add and ID to each element retrieved.
        // If an element doesn't have an URL, it can't be retrieved from the API (only exists locally / created items).
        return res.data.results.map((item:any, key:number) => {
           return {id: key+1, ...item};
        });
    } catch (error) {
        console.error('Error getting Pokemon search data:', error);
        return [];
    }
};
/**
 * Uses the URL provided in the search response to retrieve the Pokemon's data.
 * @param url API endpoint to retrieve the Pokemon's data.
 */
export const getPokemonData = async (id:number , url: string) => {
    try {
        const res = await axios.get(`${url}`);
        // We must change the ID to the one assigned on the application.
        return {...res.data, id};
    } catch (error) {
        console.error('Error getting Pokemon search data:', error);
        return [];
    }
}