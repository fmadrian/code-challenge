
import { create } from 'zustand'
import { DataStore } from "@/types/dataStore.type";
import { PokemonSearchItem } from "@/types/pokemonSearchItem.type";


/**
 * Store handles the application's locally stored data.
 */
export const useDataStore = create<DataStore>()((set) => ({
    nextId: 2000,
    searchData: [],
    data: [],

    reset: (searchData: PokemonSearchItem[] = []) => set({ nextId: 2000, searchData, data: [] }),

    setSearchData: (searchData: PokemonSearchItem[]) => set(() => ({
        searchData: [...searchData]
    })),

    // Add a fetched or manually created Pokémon to the both data arrays.
    // and increase ID count by 1.
    createPokemon: (pokemon: any) => set((state) => ({
        data: [
            ...state.data,
            {
                ...pokemon,
                id: pokemon.id ?? state.nextId,
                // Add default image to the Pokémon when adding it to array.
                sprites: pokemon.sprites ?? {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
                    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/43.png",
                },
                types: pokemon.types ?? [
                    { id: 1, type: { name: pokemon.type } }
                ],
                stats: pokemon.stats ?? [
                    { id: 1, stat: { name: "hp" }, base_stat: pokemon.hp },
                    { id: 2, stat: { name: "attack" }, base_stat: pokemon.attack },
                    { id: 3, stat: { name: "defense" }, base_stat: pokemon.defense },
                    { id: 4, stat: { name: "special-attack" }, base_stat: pokemon["special-attack"] },
                    { id: 5, stat: { name: "special-defense" }, base_stat: pokemon["special-defense"] },
                    { id: 6, stat: { name: "speed" }, base_stat: pokemon.speed },
                ]
            }
        ],
        searchData: !pokemon.id
            ? [{ id: state.nextId, name: pokemon.name, url: "" }, ...state.searchData]
            : [...state.searchData],
        nextId: state.nextId + 1,
    })),

    // Update a Pokémon's data.
    updatePokemon: (id: number, pokemon: any) => set((state) => ({
        // Search through the data array and change the data of the Pokémon with the matching ID.
        data: state.data.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    ...pokemon,
                    types: [
                        { id: 1, type: { name: pokemon.type } }
                    ],
                    stats:[
                        { id: 1, stat: { name: "hp" }, base_stat: pokemon.hp },
                        { id: 2, stat: { name: "attack" }, base_stat: pokemon.attack },
                        { id: 3, stat: { name: "defense" }, base_stat: pokemon.defense },
                        { id: 4, stat: { name: "special-attack" }, base_stat: pokemon["special-attack"] },
                        { id: 5, stat: { name: "special-defense" }, base_stat: pokemon["special-defense"] },
                        { id: 6, stat: { name: "speed" }, base_stat: pokemon.speed }
                    ]
                }
            }
            return item;
        }),
        searchData: state.searchData.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    name: pokemon.name
                }
            }
            return item;
        })
    })),

    // Delete a Pokémon from both data arrays.
    deletePokemon: (id: number) => set((state) => ({
        data: [...state.data.filter((item) => item.id !== id)],
        searchData: [...state.searchData.filter((item) => item.id !== id)]
    }))

}))