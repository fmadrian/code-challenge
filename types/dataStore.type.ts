import {PokemonSearchItem} from "@/types/pokemonSearchItem.type";

/**
 * Definition for the DataStore.
 */
export type DataStore = {
    // ID to be assigned to the next Pokémon created.
    nextId: number,
    // Every Pokémon's URL and name.
    searchData: PokemonSearchItem[];
    // More detailed data about every Pokémon (fetched on demand).
    data : any[];
    // Clears both arrays.
    reset: () => void;
    // Adds search data from PokeAPI.
    setSearchData: (searchData: PokemonSearchItem[]) => void;
    // Adds a Pokémon (from PokeAPI or user created) to the data arrays.
    createPokemon: (pokemon:any) => void;
    // Deletes a Pokémon from the data arrays.
    deletePokemon: (pokemon:any) => void;
    // Updates a Pokémon's data in both arrays.
    updatePokemon: (id:number, pokemon:any) => void;
}