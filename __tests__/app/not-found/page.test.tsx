
import {render, screen} from "@testing-library/react";
import Page from "@/app/not-found/page";

describe('[PAGE] - Not found - /not-found', () => {

    // Unit test: Check if the page renders.
    it('renders component', () => {
        // 1. Arrange

        // Render component.
        render(<Page/>);
        // 2. Act

        // Search for the message and the button.
        const message = screen.getByText(/404 - not found/i);
        const buttonMainMenu = screen.getByRole("button",{
            name: /go back to main menu/i
        });

        // 3. Assert
        expect(message).toBeInTheDocument();
        expect(buttonMainMenu).toBeInTheDocument();
    });
});
