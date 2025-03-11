import {render, screen} from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";

describe('[COMPONENT] - PokemonCard', () => {

    const pokemonData = {
        id: 1,
        name: "bulbasaur",
        base_experience: 63,
        height: 7,
        weight: 69,
        order: 28,
        is_default: true,
        sprites:{
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
        },
        types: [
            {
                type: {
                    name: "grass"
                }
            },
            {
                type: {
                    name: "poison"
                }
            }
        ],
        stats: [
            {
                base_stat: 45,
                stat: {
                    name: "hp"
                }
            },
            {
                base_stat: 49,
                stat: {
                    name: "attack"
                }
            },
            {
                base_stat: 49,
                stat: {
                    name: "defense"
                }
            },
            {
                base_stat: 65,
                stat: {
                    name: "special-attack"
                }
            },
            {
                base_stat: 65,
                stat: {
                    name: "special-defense"
                }
            },
            {
                base_stat: 45,
                stat: {
                    name: "speed"
                }
            }
        ]
    };

    // Unit test: Render the component with a user created Pokemon's search information
    it('renders with user created Pokémon', () => {
        // 1. Arrange
        // Set Pokemon's search data.
        const pokemonSearchData = {
            id: 1,
            name: "bulbasaur",
            url: ""
        };

        // Render the component.
        render(<PokemonCard pokemonSearchData={pokemonSearchData} pokemonData={pokemonData} />);

        // 2. Act

        // Check title, message and button.
        const information = screen.getByText("Created by user");
        const name = screen.getByText(pokemonData.name);
        const buttonDelete = screen.getByRole("button",{
            name: /Delete/i
        });

        // 3. Assert

        // Check if the message is in the document.
        expect(information).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();
    });

    // Render the component with an API-retrieved Pokemon's search information
    it('renders with an "API" retrieved Pokémon', () => {
        // 1. Arrange

        // Set Pokemon's search data as if it was retrieved from the API.
        const pokemonSearchData = {
            id: 1,
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        };

        // Render the component.
        render(<PokemonCard pokemonSearchData={pokemonSearchData} pokemonData={pokemonData} />);

        // 2. Act

        // Check title, message and button.
        const information = screen.getByText(/Retrieved from PokeAPI/i);
        const name = screen.getByText(pokemonSearchData.name);
        const image = screen.getByRole("img", {name: pokemonSearchData.name});
        const types = screen.getByText(`Types: ${pokemonData.types.map(t=>t.type).map(t=>t.name).join(", ")}`);
        const buttonDelete = screen.getByRole("button",{
            name: /delete/i
        });

        // 3. Assert

        // Check if the message is in the document.
        expect(information).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(types).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();
    });
});