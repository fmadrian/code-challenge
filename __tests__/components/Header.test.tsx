import {render, screen} from "@testing-library/react";
import {mockUseAuthStore} from "@/jest.setup";
import Header from "@/components/Header";

describe('[COMPONENT] - Header', () => {

    // Unit test: Component renders without not being authenticated.
    it('renders while being unauthenticated',  () => {
        // 1. Arrange

        // Use auth store mock to simulate logged status.
        mockUseAuthStore({
            loggedIn: false,
        })

        // Render the component.
        render(<Header />);

        // 2. Act

        // Check 3 buttons.
        const buttonResetData = screen.getByRole('button', {name: /reset data/i});
        const buttonMainPage = screen.getByRole('button', {name: /login/i});
        const linkReadme = screen.getByRole('button', {name: /readme/i});

        // 3. Assert

        // Check if the message is in the document.
        expect(buttonResetData).toBeInTheDocument();
        expect(buttonMainPage).toBeInTheDocument();
        expect(linkReadme).toBeInTheDocument();
    });

    // Unit test: Component renders without being authenticated.
    it('renders while being authenticated',  () => {
        // 1. Arrange

        const loggedIn = true, name = "placeholder";
        // Use auth store mock to simulate logged status and user information.
        mockUseAuthStore({
            loggedIn,
            user:{
                name,
                password: "",
            }
        })

        // Render the component.
        render(<Header />);

        // 2. Act

        // Check 3 buttons.
        const buttonResetData = screen.getByRole('button', {name: /reset data/i});
        const buttonLogout = screen.getByRole('button', {name: `Logout (${name})`});
        const buttonMainPage = screen.getByRole('link', {name: /main page/i});
        const buttonPokemonList = screen.getByRole('link', {name: /pokémon list/i});
        const linkReadme = screen.getByRole('link', {name: /readme/i});

        // 3. Assert

        // Check if the message is in the document.
        expect(buttonResetData).toBeInTheDocument();
        expect(buttonLogout).toBeInTheDocument();
        expect(buttonMainPage).toBeInTheDocument();
        expect(buttonPokemonList).toBeInTheDocument();
        expect(linkReadme).toBeInTheDocument();
    });
});