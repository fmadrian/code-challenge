
import { create } from 'zustand'

/**
 * Expected item returned by search on PokeAPI.
 */
type PokemonSearchItem = {
    // ID assigned when objects are retrieved from API or created
    id: number;
    // Pokemon's name.
    name: string;
    // PokeAPI endpoint to retrieve all the Pokemon's data.
    url: string;
}
/**
 * Definition for the DataStore.
 */
type DataStore = {
    // Every Pokemon's URL and name.
    searchData: PokemonSearchItem[];
    // More detailed data about every Pokemon (fetched on demand).
    data : any[];
    // Clears both arrays.
    reset: () => void;
    // Adds search data from PokeAPI.
    setSearchData: (searchData: PokemonSearchItem[]) => void;
}
/**
 * Store handles the application's locally stored data.
 */
export const useDataStore = create<DataStore>()((set) => ({
    searchData : [],
    data: [],

    reset: (searchData: PokemonSearchItem[] = []) => set({searchData, data: []}),

    setSearchData: (searchData: PokemonSearchItem[]) => set(() => ({
        searchData: [...searchData]
    })),

    // Add a fetched or manually created Pokemon to the data array.
    createPokemon: (pokemon:any) =>  set((state) => ({
        data: [...state.data, pokemon]
    })),

    // Update a Pokemon's data.
    updatePokemon: (id:number, pokemon:any) =>  set((state) => ({
        // Search through the data array and change the data of the Pokemon with the matching ID.
        data: state.data.map((item) => {
            if(item.id === id){
                return {
                    ...pokemon,
                }
            }
            return item;
        })
    })),

    // Delete a Pokemon from the data array.
    deletePokemon: (id:number)=> set((state) => ({
        data: [...state.data.filter((item) => item.id !== id)]
    }))

}))