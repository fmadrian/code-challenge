import Link from "next/link";
import {useState} from "react";
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";
import {getPokemonSearchData} from "@/services/PokemonService";
import {useDataStore} from "@/stores/data-store";

export default function Header(){
    // Application's state.
    const reset = useDataStore(state => state.reset);
    const setSearchData = useDataStore(state => state.setSearchData);

    // Component's state.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Resets all data in the application and fills search array.
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
        if(isLoggedIn){
            redirect('/');
        }else{
            redirect('/login');
        }
    }

    return (
      <div className="bg-[#EAF5FF] border-2 flex flex-row py-1 gap-x-6 overflow-x-auto">
          <Link href="/">
              <Button variant="text" type="button">Main page</Button>
          </Link>
          <Link href="/pokemon">
              <Button variant="text" type="button">Pokemon list</Button>
          </Link>
          {
              !isLoading
                  ? <Button variant="text" type="button" color="error" onClick={resetData}>Reset data</Button>
                  : <Button variant="text" type="button" color="error" disabled>Loading data...</Button>

          }

          <Button variant="text" type="button" onClick={manageUser} >{isLoggedIn ? 'Logout (user)': 'Login'}</Button>
      </div>
    );

}