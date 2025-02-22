import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page from "@/app/pokemon/page";

describe('[PAGE] - Pokemon index - /pokemon', () => {

    const user = userEvent.setup();
    /**
     * Open Pokémon creation form and create a Pokémon.
     * Result is stored in state.
     * @param name Pokémon's name.
     */
    const createPokemon = async (name:string) =>{
        // Click create button.
        await user.click(screen.getByRole('button', {
            name: /create/i
        }));

        // Fill inputs and click create.
        await user.type(screen.getByRole('textbox', {
            name: /name/i
        }), name);
        await user.type(screen.getByRole('spinbutton', {
            name: /base experience/i
        }), '112');
        await user.type(screen.getByRole('spinbutton', {
            name: /height/i
        }), '4');
        await user.type(screen.getByRole('spinbutton', {
            name: /weight/i
        }), '60');
        await user.type(screen.getByRole('spinbutton', {
            name: /order/i
        }), '25');

        await user.click(screen.getByRole('button', {
            name: /create/i
        }));
    }

    // Component renders.
    it('renders', () => {
        // 1. Arrange.

        // Render the component.
        render(<Page/>);

        // 2. Act.

        // Search for input, and buttons.
        const buttonSearch = screen.getByRole('button', {
            name: /search/i
        });
        const buttonCreate = screen.getByRole('button', {
            name: /create/i
        });
        const noPokemonMessage = screen.getByText(/No Pokémon were found. Create one, change the search term or click 'Reset data'./i);

        // 3. Assert.

        // Verify buttons and input are there.
        expect(buttonSearch).toBeInTheDocument();
        expect(buttonCreate).toBeInTheDocument();
        expect(noPokemonMessage).toBeInTheDocument();
    });

    // Pressing create button opens form.
    it('pressing create button opens the pokémon create form.', async () => {
        // 1. Arrange

        // Render the component.
        render(<Page/>);

        // 2. Act

        // Click create button.
        await user.click(screen.getByRole('button', {
            name: /create/i
        }));

        // Check inputs.
        const inputName = screen.getByRole('textbox', {
            name: /name/i
        });
        const inputBaseExperience = screen.getByRole('spinbutton', {
            name: /base experience/i
        });
        const inputHeight = screen.getByRole('spinbutton', {
            name: /height/i
        });
        const inputWeight = screen.getByRole('spinbutton', {
            name: /weight/i
        });
        const inputOrder = screen.getByRole('spinbutton', {
            name: /order/i
        });
        const buttonCreate = screen.getByRole('button', {
            name: /create/i
        });
        const buttonCancel = screen.getByRole('button', {
            name: /cancel/i
        });

        // 3. Assert
        expect(inputName).toBeInTheDocument();
        expect(inputBaseExperience).toBeInTheDocument();
        expect(inputHeight).toBeInTheDocument();
        expect(inputWeight).toBeInTheDocument();
        expect(inputOrder).toBeInTheDocument();
        expect(buttonCreate).toBeInTheDocument();
        expect(buttonCancel).toBeInTheDocument();
    });

    // Pressing delete Pokémon on a Pokémon deletes it.
    it ('delete a Pokemon', async () => {
        // 1. Arrange
        const name = "Butterfree";
        // Render the component.
        render(<Page/>);
        // Create a Pokémon.
        await createPokemon(name);

        // 2. Act

        await user.click(screen.getByRole('button', {
            name: /cancel/i
        }));
        const deleteButton = screen.getByText(/delete/i);
        await user.click(deleteButton);

        // 3. Assert
        // Confirm no elements are being displayed and the delete button has disappeared.
        const confirmationMessage = screen.getByText(/No Pokémon were found. Create one, change the search term or click 'Reset data'./i);
        expect(confirmationMessage).toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();
    });

    // Creates a Pokémon.
    it('creates a pokémon.', async () => {
        // 1. Arrange

        // Render the component.
        render(<Page/>);

        // 2. Act

        // Create a Pokémon.
        await createPokemon("Pikachu");

        // 3. Assert

        // Check if the pokémon was created.
        const confirmationMessage = await screen.findByText(/Created by user/i);
        expect(confirmationMessage).toBeInTheDocument();
    });

    // Searches for a Pokémon using a search term.
    it('searches for a pokémon.', async () => {
        const name = "Mewtwo", searchTerm = "me";

        // Render the component.
        render(<Page/>);
        const searchBar = screen.getByRole('textbox', {
            name: /Search a Pokémon/i
        });
        const searchButton = screen.getByRole('button', {
            name: /Search/i
        });

        // Create a Pokémon.
        await createPokemon(name);

        // Put term in search bar and click search button.
        await user.type(searchBar, searchTerm);
        await user.click(searchButton);

        // Check if the pokémon is returned and confirmation message.
        const pokemon = await screen.findByText(new RegExp(name, "i"));
        const confirmationMessage = await screen.findAllByText(/Created by user/i);
        expect(pokemon).toBeInTheDocument();
        expect(confirmationMessage.length).toBe(1);
    });
});