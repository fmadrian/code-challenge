import {render, screen} from '@testing-library/react';
import Login from "@/app/login/page";
import {mockUseAuthStore} from "@/jest.setup";
import {redirect} from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock('next/navigation');

describe('[PAGE] - Login - /login', () => {



    const user = userEvent.setup();
    // Unit test: Check if the page renders correctly.
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

    // Unit test: User and password validation.
    /*it('calls login function', () => {

        const name = "user1", password = "123";
        const loggedIn = false;
        // 1. Arrange

        // Mock data store.
        mockUseAuthStore(
            {
                loggedIn,
                availableUsers : [
                    {
                        name,
                        password
                    }
                ]
            }
        )


        render(<Login/>);
        user.type(screen.getByRole('textbox', { name: /name/i }),name);
        user.type(screen.getByLabelText(/password/i),password);

        // 2. Act
        user.click(screen.getByRole('button', { name: /login/i }));

        // 3. Assert

        // Check if the user is logged in.
        expect(loggedIn).toBe(true);

    });*/




});

