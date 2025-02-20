"use client"

import {useEffect, useState} from "react";
import {useDataStore} from "@/stores/data-store";
import {getPokemonData} from "@/services/PokemonService";
import Image from "next/image";
import { redirect } from 'next/navigation'
import Loading from "@/components/Loading";
import PokemonForm from "@/components/PokemonForm";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoItems from "@/components/NoItems";

/**
 * Component in charge of searching
 * @param id ID inside the application
 * @constructor
 */
export default function PokemonData({id,}: {id: number}){

    // Application's state.
    const data = useDataStore(state => state.data);
    const searchData = useDataStore(state => state.searchData);
    const createPokemon = useDataStore(state => state.createPokemon);
    const updatePokemon = useDataStore(state => state.updatePokemon);

    // Component's state.
    // Is loading from PokeAPI.
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Is the create/update dialog open.
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    // Item to be displayed in page.
    const [item, setItem] = useState<any>({});

    // Update Pokemon in state and close dialog.
    const onUpdate = (data:any) => {
        updatePokemon(id, data);
        setIsDialogOpen(false);
    }

    // Load Pokemon data from API or application's data.
    const loadItemInComponent = async (id:number) =>{
        // Search in application's data.
        let pokemon = data.find((item) => item.id === id);
        if(!pokemon){
            // If the Pokemon is not found, search the API endpoint to retrieve on the search data array.
            const pokemonInSearch = searchData.find((item) => item.id === id);
            // If the Pokemon is not found in the search data array, it means it doesn't exist.
            if(!pokemonInSearch) {
                redirect('/not-found');
            }else {
                // Retrieve Pokemon's data from the API and store it in state.
                pokemon = await getPokemonData(id, pokemonInSearch.url);
                createPokemon(pokemon);
            }
        }
        // Set Pokemon to be displayed.
        return pokemon;
    };

    // When component is mounted, load item.
    useEffect(() => {
        setIsLoading(true);
        loadItemInComponent(id).then((res)=> {
            setItem(res)
        });
        setIsLoading(false);
    },[]);

    // When data array changes, update item.
    useEffect(() => {
        loadItemInComponent(id).then((res)=> {
            setItem(res)
        });
    }, [data]);

    return (
        <div className="flex flex-col gap-y-4 p-3 sm:p-6">
            {/*Dialog with form to update a Pokemon.*/}
            <PokemonForm isDialogOpen={isDialogOpen}
                         onCloseDialog={() => setIsDialogOpen(false)}
                         onSaveChanges={onUpdate}
                         element={item}
            />
            {
                isLoading ?
                    <Loading message="Loading Pokemon data..." />
                    :
                    item ?
                    <>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <h1 className="font-bold text-4xl">{item.name} ({item.id})</h1>
                            <Button className="flex-grow" variant="contained" color="info" onClick={()=>setIsDialogOpen(true)}>Update</Button>
                        </div>
                        <Divider/>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            {
                                item.sprites && item.sprites.other && item.sprites.other.home ?
                                    <Image src={item.sprites.other.home.front_default}
                                           alt={item.name}
                                           width={0}
                                           height={0}
                                           sizes="100vw"
                                           style={{width: '75%', height: '75%'}}/> : <></>
                            }
                            <div className="flex flex-col gap-y-4">
                                {/* Basic information */}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Attribute</TableCell>
                                                <TableCell>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Base experience</TableCell>
                                            <TableCell>{item.base_experience}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Height</TableCell>
                                            <TableCell>{item.height}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Weight</TableCell>
                                            <TableCell>{item.weight}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order</TableCell>
                                            <TableCell>{item.order}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Is default</TableCell>
                                            <TableCell>{item.is_default ? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </>
                        :
                        <NoItems message="No information found for this Pokemon." />
            }
        </div>
    );
}