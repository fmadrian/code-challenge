
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
    // ID to be assigned to the next Pokemon created.
    nextId: number,
    // Every Pokemon's URL and name.
    searchData: PokemonSearchItem[];
    // More detailed data about every Pokemon (fetched on demand).
    data : any[];
    // Clears both arrays.
    reset: () => void;
    // Adds search data from PokeAPI.
    setSearchData: (searchData: PokemonSearchItem[]) => void;
    createPokemon: (pokemon:any) => void;
    deletePokemon: (pokemon:any) => void;
    updatePokemon: (id:number, pokemon:any) => void;
}
/**
 * Store handles the application's locally stored data.
 */
export const useDataStore = create<DataStore>()((set) => ({
    nextId: 2000,
    searchData : [],
    data: [],

    reset: (searchData: PokemonSearchItem[] = []) => set({searchData, data: []}),

    setSearchData: (searchData: PokemonSearchItem[]) => set(() => ({
        searchData: [...searchData]
    })),

    // Add a fetched or manually created Pokemon to the both data arrays.
    // and increase ID count by 1.
    createPokemon: (pokemon:any) =>  set((state) => ({
        data: [
                ...state.data,
                {
                    ...pokemon,
                    id: pokemon.id ?? state.nextId,
                    // Add default image to the Pokemon when adding it to array.
                    sprites: pokemon.sprites ?? {
                        other: {
                            home : {
                                "front_default" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/43.png"
                            }
                        }
                    }
                }
            ],
        searchData: !pokemon.id
            ? [{id: state.nextId, name: pokemon.name, url: ""}, ...state.searchData]
            : [...state.searchData],
        nextId: state.nextId + 1,
    })),

    // Update a Pokemon's data.
    updatePokemon: (id:number, pokemon:any) =>  set((state) => ({
        // Search through the data array and change the data of the Pokemon with the matching ID.
        data: state.data.map((item) => {
            if(item.id === id) {
                return {
                    ...item,
                    ...pokemon,
                }
            }
            return item;
        }),
        searchData: state.searchData.map((item) => {
            if(item.id === id){
                return {
                    ...item,
                    name: pokemon.name
                }
            }
            return item;
        })
    })),

    // Delete a Pokemon from both data arrays.
    deletePokemon: (id:number)=> set((state) => ({
        data: [...state.data.filter((item) => item.id !== id)],
        searchData: [...state.searchData.filter((item) => item.id !== id)]
    }))

}))