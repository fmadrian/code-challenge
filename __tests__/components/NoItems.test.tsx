import {act, render, screen} from "@testing-library/react";
import NoItems from "@/components/NoItems";

describe('[COMPONENT] - NoItems', () => {
    // Render the component with a message different from the default message.
    it('renders with a message', async () => {
        // 1. Arrange
        const message = "This is a test message to show in the component.";

        // Render the component.
        await act(async () => render(<NoItems message={message} />));

        // 2. Act

        // Check message.
        const messageInsideComponent = screen.getByText(message);

        // 3. Assert

        // Check if the message is in the document.
        expect(messageInsideComponent).toBeInTheDocument();
    });
});