import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";
import PokemonForm from "@/components/PokemonForm";

describe('[COMPONENT] - PokemonForm', () => {

    // Unit test: Attempt to save the form while data is missing.
    it('save form while data is missing', async () => {

        const user = userEvent.setup();

        // 1. Arrange

        // Render the component.
        render(<PokemonForm isDialogOpen={true} onSaveChanges={jest.fn} onCloseDialog={jest.fn} />);

        // 2. Act
        await user.click(screen.getByRole('button', {
            name: /create/i
        }));

        // 3. Assert.

        // Check all 'this field is required' errors are displayed.
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/base experience is required/i)).toBeInTheDocument();
        expect(screen.getByText(/height is required/i)).toBeInTheDocument();
        expect(screen.getByText(/weight is required/i)).toBeInTheDocument();
        expect(screen.getByText(/order is required/i)).toBeInTheDocument();

    });
});