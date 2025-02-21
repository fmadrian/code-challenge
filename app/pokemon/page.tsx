"use client";

import {useEffect, useState} from "react";
import {useDataStore} from "@/stores/data-store";
import {Button, Divider, TextField} from "@mui/material";
import PokemonCard from "@/components/PokemonCard";
import {useForm} from "react-hook-form";
import {createForm} from "@/helpers/FormService";
import Loading from "@/components/Loading";
import NoItems from "@/components/NoItems";
import PokemonForm from "@/components/PokemonForm";

export default function Page() {
    // Component's state.

    // Shows loading component while data is being fetched.
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Controls the visibility of the dialog to create a new Pokemon.
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    // Store the last searched term to reuse it when a new item is created or deleted.
    const [lastSearchTerm, setLastSearchTerm] = useState<string>("");
    // Data shown to the user (filtered from search data).
    const [filteredData, setFilteredData] = useState<any[]>([]);

    // Application's state.
    const searchData = useDataStore(state => state.searchData);
    const createPokemon = useDataStore(state => state.createPokemon);
    
    // Form to be used in page.
    const forms = {
        search : createForm(useForm({}))
    };

    // Receives data from form and creates a new Pokemon.
    const onSaveChanges = (data: any) => {
        createPokemon(data);
        setIsDialogOpen(false);
    }

    // Filters search data based on name passed.
    // If no name is passed, the original search data is shown.
    const filterSearchData = (form?: any) =>{
        // Use last search term or the new one passed in form.
        let term = lastSearchTerm;
        // Make it lower case and trim it so it is easier to compare.
        if(form){
            term = form.searchTerm.toLowerCase().trim();
        }

        // If no search term was passed, show all data.
        if(term === ""){
            setFilteredData([...searchData]);
        }
        else{
            setFilteredData([...searchData.filter(item=>item.name.toLowerCase().includes(term))])
            setLastSearchTerm(term);
        }
    }

    // Change filtered data when search data changes
    useEffect(() => {
        setIsLoading(true);
        filterSearchData();
        setIsLoading(false);
    }, [searchData])

    return (
        <div className="flex flex-col gap-y-4 p-3 sm:p-6">
            <h1 className="font-bold text-4xl">All Pokemon available </h1>
            <PokemonForm isDialogOpen={isDialogOpen}
                         onCloseDialog={() => setIsDialogOpen(false)}
                         onSaveChanges={onSaveChanges}
            />
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
                    <Button className="col-span-1" type="button" variant="contained" color="success" onClick={()=>setIsDialogOpen(true)}>Create</Button>
                </div>
            </form>
            <Divider/>
            {/* Display filtered data using responsive grid.*/}

            {!isLoading ?
                <>
                    <span className="text-xl">Showing {filteredData.length} of {searchData.length} possible results:</span>
                    {filteredData && filteredData.length > 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                            {filteredData.map((item, index) => <PokemonCard key={index} pokemon={item} />)}
                        </div> :
                        <>
                            <NoItems message="No Pokemon were found. Create one, change the search term or click 'Reset data'." />
                        </>
                    }
                </> :
                <Loading message="Loading all Pokemon..." />
            }
        </div>
    )
}