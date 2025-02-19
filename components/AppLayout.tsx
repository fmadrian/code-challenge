"use client";

import { ThemeProvider } from "@emotion/react";
import customTheme from "./Theme/CustomTheme";
/**
 * Component that wraps children props inside custom theme.
 * Allows use of ThemeProvider which requires a client component.
 */
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ThemeProvider theme={customTheme}>
                {children}
            </ThemeProvider>
        </>
    );
}
