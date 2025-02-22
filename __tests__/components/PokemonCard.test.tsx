import {render, screen} from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";

describe('[COMPONENT] - PokemonCard', () => {
    // Unit test: Render the component with a user created Pokemon's search information
    it('renders with user created Pokémon', () => {
        // 1. Arrange

        // Set Pokemon's search data.
        const pokemon = {
            id: 1,
            name: "bulbasaur",
            url: ""
        };

        // Render the component.
        render(<PokemonCard pokemon={pokemon} />);

        // 2. Act

        // Check title, message and button.
        const information = screen.getByText("Created by user");
        const name = screen.getByText(pokemon.name);
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
        const pokemon = {
            id: 1,
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        };

        // Render the component.
        render(<PokemonCard pokemon={pokemon} />);

        // 2. Act

        // Check title, message and button.
        const information = screen.getByText(/Retrieved from PokeAPI/i);
        const name = screen.getByText(pokemon.name);
        const buttonDelete = screen.getByRole("button",{
            name: /delete/i
        });

        // 3. Assert

        // Check if the message is in the document.
        expect(information).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();
    });
});