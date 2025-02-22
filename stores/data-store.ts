
import { create } from 'zustand'
import {DataStore} from "@/types/dataStore.type";
import {PokemonSearchItem} from "@/types/pokemonSearchItem.type";


/**
 * Store handles the application's locally stored data.
 */
export const useDataStore = create<DataStore>()((set) => ({
    nextId: 2000,
    searchData : [],
    data: [],

    reset: (searchData: PokemonSearchItem[] = []) => set({nextId: 2000, searchData, data: []}),

    setSearchData: (searchData: PokemonSearchItem[]) => set(() => ({
        searchData: [...searchData]
    })),

    // Add a fetched or manually created Pokémon to the both data arrays.
    // and increase ID count by 1.
    createPokemon: (pokemon:any) =>  set((state) => ({
        data: [
                ...state.data,
                {
                    ...pokemon,
                    id: pokemon.id ?? state.nextId,
                    // Add default image to the Pokémon when adding it to array.
                    sprites: pokemon.sprites ?? {
                        "front_default" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
                        "back_default" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/43.png",
                    }
                }
            ],
        searchData: !pokemon.id
            ? [{id: state.nextId, name: pokemon.name, url: ""}, ...state.searchData]
            : [...state.searchData],
        nextId: state.nextId + 1,
    })),

    // Update a Pokémon's data.
    updatePokemon: (id:number, pokemon:any) =>  set((state) => ({
        // Search through the data array and change the data of the Pokémon with the matching ID.
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

    // Delete a Pokémon from both data arrays.
    deletePokemon: (id:number)=> set((state) => ({
        data: [...state.data.filter((item) => item.id !== id)],
        searchData: [...state.searchData.filter((item) => item.id !== id)]
    }))

}))