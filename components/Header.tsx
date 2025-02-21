import Link from "next/link";
import {useState} from "react";
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";
import {getPokemonSearchData} from "@/helpers/PokemonService";
import {useDataStore} from "@/stores/data-store";
import {useAuthStore} from "@/stores/auth-store";

export default function Header(){
    // Application's authentication state.
    const loggedIn = useAuthStore(state => state.loggedIn);
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);

    // Application's data state.
    const reset = useDataStore(state => state.reset);
    const setSearchData = useDataStore(state => state.setSearchData);

    // Component's state.

    const [isLoading, setIsLoading] = useState(false);

    // Resets all data in the application and fills the search array.
    const resetData = () => {
        setIsLoading(true);
        reset();

        getPokemonSearchData().then((res)=> {
         setSearchData(res);
        });

        setIsLoading(false);
    }

    // Redirects user to login page if not logged in, or to main page if we are logging out.
    const manageUser = () => {
        if(loggedIn){
            logout();
            redirect("/login");
        }else{
            redirect("/login");
        }

    }

    return (
        <div className="bg-[#EAF5FF] border-2 flex flex-row py-1 gap-x-6 overflow-x-auto">
            {loggedIn ? <>
                <Link href="/">
                    <Button variant="text" type="button">Main page</Button>
                </Link>
                <Link href="/pokemon">
                    <Button variant="text" type="button">Pokemon list</Button>
                </Link>
            </> : <></>
            }
            <a target="_blank" className="block" href="https://github.com/fmadrian/code-challenge/blob/main/README.md">
                <Button variant="text" color="primary">README</Button>
            </a>
            {
                !isLoading
                    ? <Button variant="text" type="button" color="error" onClick={resetData}>Reset data</Button>
                    : <Button variant="text" type="button" color="error" disabled>Loading data...</Button>

            }

            <Button variant="text" type="button"
                    onClick={manageUser}>{loggedIn ? `Logout (${user.name})` : 'Login'}</Button>
        </div>
    );

}