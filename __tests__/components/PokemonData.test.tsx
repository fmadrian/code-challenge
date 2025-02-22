import {mockUseDataStore} from "@/jest.setup";
import PokemonData from "@/components/PokemonData";
import {act, render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe('[COMPONENT] - PokemonData', () => {

    const user = userEvent.setup();

    // Use mock data state for this tests
    beforeAll(() => {
        // Set mock state to have the element we are going to use for tests.
        mockUseDataStore({
            data: [
                {
                    id:2001,
                    name: 'bulbasaur',
                    base_experience: 63,
                    height: 7,
                    weight: 69,
                    order: 28,
                    is_default: true,
                    sprites:{
                        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
                    }
                },
            ]
        })
    });

    // Render the component with a Pokémon's data.
    it(`includes Pokémon's data`, async () => {
        // 1. Arrange.

        // Render the component.
        await act(async () => render(<PokemonData id={2001} />));

        // 2. Act.

        // Check data.
        const name = screen.getByRole('heading', {
            name: /bulbasaur/i
        });
        const tableName = screen.getByRole('row', {
            name: /Name bulbasaur/i
        });
        const tableBaseExperience = screen.getByRole('row', {
            name: /Base experience 63/i
        });
        const tableHeight = screen.getByRole('row', {
            name: /Height 7/i
        });
        const tableWeight = screen.getByRole('row', {
            name: /Weight 69/i
        });
        const tableOrder = screen.getByRole('row', {
            name: /Order 28/i
        });
        const tableIsDefault = screen.getByRole('row', {
            name: /Is default Yes/i
        });

        // Check images.
        const images = screen.getAllByRole('img', {
            name: /bulbasaur/i
        });

        // Check button.
        const buttonUpdate = screen.getByRole('button', {
            name: /Update Pokémon/i
        });
        const buttonAIAssistant = screen.getByRole('button', {
            name: /Ask AI Assistant/i
        });

        // 3. Assert.
        expect(name).toBeInTheDocument();
        expect(tableName).toBeInTheDocument();
        expect(tableBaseExperience).toBeInTheDocument();
        expect(tableHeight).toBeInTheDocument();
        expect(tableWeight).toBeInTheDocument();
        expect(tableOrder).toBeInTheDocument();
        expect(tableIsDefault).toBeInTheDocument();
        expect(buttonUpdate).toBeInTheDocument();
        expect(buttonAIAssistant).toBeInTheDocument();
        expect(images.length).toBe(2);
    });

    // Click ask AI assistant button and checks the alert has been displayed.
    it('click ask ai assistant button displays alert', async () => {
        // 1. Arrange.

        // Render the component.
        await act(async () => render(<PokemonData id={2001} />));

        // Click ask AI assistant button.
        await user.click(screen.getByRole('button', {
            name: /ask ai assistant/i
        }));

        // 2. Act

        // Wait for progress bar to disappear.
        // Given a 10 second timeout to allow the AI assistant to return a response.
        await waitForElementToBeRemoved(()=> screen.getAllByRole('progressbar'),{timeout : 10000});
        // Search alert component
        const alert = screen.getByRole('alert');

        // 3. Assert.
        expect(alert).toBeInTheDocument();
    });

});