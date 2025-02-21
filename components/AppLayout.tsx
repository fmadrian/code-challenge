"use client";

import { ThemeProvider } from "@emotion/react";
import customTheme from "./Theme/CustomTheme";
import Header from "@/components/Header";
import {useEffect} from "react";
import {useAuthStore} from "@/stores/auth-store";
import {redirect} from "next/navigation";
import { usePathname } from 'next/navigation'
/**
 * Component that wraps children props inside custom theme.
 * Allows use of ThemeProvider which requires a client component.
 */
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Application's state.
    const loggedIn = useAuthStore(state => state.loggedIn);

    // Current path.
    const pathname = usePathname();

    useEffect(() => {
        // Redirect to login page if the user attempts to access any other page without being logged in.
        if(!loggedIn && pathname !== "/login"){
            redirect("/login");
        }
    }, []);

    return (
        <div className="size-full">
            <ThemeProvider theme={customTheme}>
                <Header />
                {children}
            </ThemeProvider>
        </div>
    );
}
