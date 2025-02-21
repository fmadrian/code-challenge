"use client";
import {useAuthStore} from "@/stores/auth-store";
import {createForm} from "@/services/FormService";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

export default function Login() {
    // Application's state.
    const login = useAuthStore(state => state.login);
    const loggedIn = useAuthStore(state => state.loggedIn);

    // Component's state.
    // Show password in plain text.
    const [showPassword, setShowPassword] = useState(false);
    // If the user has tried to login.
    const [attemptedLogin, setAttemptedLogin] = useState(false);

    // Component's form.
    const form = createForm(useForm({}));

    // Function to be called when a login attempt is made.
    const onSubmit = (data: any) => {
        // If the user attempts to login but is not redirected, show an error message.
        login(data.name, data.password);
        setAttemptedLogin(true);
    }

    // Redirect to home page if the user is logged in.
    useEffect(() => {
        if(loggedIn){
            redirect("/")
        }
    }, [loggedIn]);

    return (
        <>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col flex-wrap gap-4 p-12 m-8 lg:max-w-md border ">
                <h1 className="font-bold text-4xl">Login</h1>
                <p>Enter your username (user1) and password (123).</p>
                <Divider />
                {!loggedIn && attemptedLogin ? <Alert severity="error">Invalid username or password. Try with username:user1 and password:123.</Alert> : null}
                <TextField id="name" label="Name" variant="filled"
                           slotProps={{input: {type: "text",}}}
                           {...(form.register)('name', {required: 'Name is required',})}
                           error={!!form.errors.name}
                           helperText={form.errors.name?.message}/>
                <TextField id="password" label="Password" variant="filled"
                           slotProps={{
                               input: {
                                   type: showPassword ? "text" : "password",
                                   endAdornment: <Button variant="contained"
                                                         onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}
                                                </Button>
                               },

                            }}
                           {...(form.register)('password', {required: 'Password is required'})}
                           error={!!form.errors.password}
                           helperText={form.errors.password?.message}/>
                <Divider/>
                <Button type="submit" variant="contained">Login</Button>
            </div>
        </form>
        </>
    )
}