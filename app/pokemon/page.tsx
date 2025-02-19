"use client";

import { useEffect, useState } from "react";
import {useDataStore} from "@/stores/data-store";
// import {getPokemonSearchData} from "@/services/PokemonService";
import {Button, Divider, TextField} from "@mui/material";
import PokemonCard from "@/components/PokemonCard";
import {useForm} from "react-hook-form";
import {createForm} from "@/services/FormService";

export default function Page() {
    // Shows loading component while data is being fetched.
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Data in state.
    const searchData = useDataStore(state => state.searchData);
    const setSearchData = useDataStore(state => state.setSearchData);

    // Data shown to the user (filtered from search data).
    const [filteredData, setFilteredData] = useState<any[]>([]);

    // Form to be used in page.
    const forms = {
        search : createForm(useForm({}))
    };

    // Filters search data based on name passed.
    // If no name is passed, the original search data is shown.
    const filterSearchData = (form: any) =>{
        // Grab search term from form and prepare it  to make it easier to compare.
        const searchTerm = form.searchTerm.toLowerCase().trim();
        if(searchTerm === ""){
            setFilteredData([...searchData]);
        }
        else{
            setFilteredData([...searchData.filter(item=>item.name.toLowerCase().includes(searchTerm))])
        }
    }
    // TODO: Change placeholder data to actual data.
    const placeholderData = [{id: 1, name: "golbat", url: "https://pokeapi.co/api/v2/pokemon/42/"},
        {id: 2, name: "Ivysaur", url: ""}, {id: 3, name: "Venusaur", url: ""},
        {id: 4, name: "oddish", url: "https://pokeapi.co/api/v2/pokemon/43/"},
        {id: 5, name: "Charmeleon", url: ""},
    ];

    useEffect(() => {
        setIsLoading(true);
        /*
        getPokemonSearchData().then((res)=> {
         setSearchData(res);
         setFilteredData(res);
        });
        */
        setSearchData(placeholderData);
        setFilteredData(placeholderData);
        setIsLoading(false);
    }, [])

    return (
        <div className="flex flex-col gap-y-4 p-2 sm:p-8">
            <h1 className="font-bold text-4xl">All Pokemon available </h1>
            <Divider/>
            {/* Form to search available Pokemon.*/}
            <form onSubmit={forms.search.handleSubmit(filterSearchData)}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <TextField id="searchTerm"
                           className="col-span-2"
                           {...(forms.search.register)('searchTerm')}
                           label="Search a Pokemon"
                           placeholder="Search a Pokemon by its name. Ex, Pikachu, Bulbasaur"
                           variant="outlined"/>
                <Button className="col-span-1" type="submit" variant="contained">Search</Button>
                </div>
            </form>
            <Divider/>
            {/* Display filtered data using responsive grid.*/}
            <span className="text-xl">Showing {filteredData.length} of {searchData.length} possible results:</span>
            {!isLoading ?
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredData && filteredData.length > 0 ?
                        filteredData.map((item, index) => <PokemonCard key={index} pokemon={item}/>) : (<>
                            <h1>No items.</h1>
                        </>)
                    }
                </div> :
                <h1>Loading...</h1>
            }
        </div>
)
}