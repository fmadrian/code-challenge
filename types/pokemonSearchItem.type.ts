/**
 * Expected item returned by search on PokeAPI.
 */
export type PokemonSearchItem = {
    // ID assigned when objects are retrieved from API or created
    id: number;
    // Pokémon's name.
    name: string;
    // PokeAPI endpoint to retrieve all the Pokémon's data.
    url: string;
}