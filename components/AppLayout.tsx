"use client";

import { ThemeProvider } from "@emotion/react";
import customTheme from "./Theme/CustomTheme";
import Header from "@/components/Header";
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
        <div className="size-full">
            <ThemeProvider theme={customTheme}>
                <Header />
                {children}
            </ThemeProvider>
        </div>
    );
}
