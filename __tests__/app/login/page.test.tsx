import {render, screen} from '@testing-library/react';
import Login from "@/app/login/page";

describe('[PAGE] - Login - /login', () => {

    it('renders', () => {
        // 1. Arrange

        // Render the component.
        render(<Login/>);

        // 2. Act
        
        // Search for name, password buttons, and login button.
        const inputName = screen.getByRole('textbox', {
            name: /name/i
        })
        // To test a password field, we must use getByLabelText.
        const inputPassword = screen.getByLabelText(/password/i)
        const loginButton = screen.getByRole('button', {
            name: /login/i
        })

        // 3. Assert
        expect(inputName).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();

    });

});

