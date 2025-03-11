"use client"

import { useEffect, useState } from "react";
import { useDataStore } from "@/stores/data-store";
import { getPokemonData } from "@/helpers/PokemonService";
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
import { Alert } from "@mui/material";
import { askAIAboutPokemon } from "@/helpers/OpenAIService";

/**
 * Component in charge of searching
 * @param id ID inside the application
 * @constructor
 */
export default function PokemonData({ id, }: { id: number }) {

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
    // AI Fact about the Pokémon loaded.
    const [fact, setFact] = useState<string>("");
    const [isLoadingFact, setIsLoadingFact] = useState<boolean>(false);

    // Item to be displayed in page.
    const [item, setItem] = useState<any>({});

    // Update Pokémon in state and close dialog.
    const onUpdate = (data: any) => {
        updatePokemon(id, data);
        setIsDialogOpen(false);
    }

    const askAI = async () => {
        setIsLoadingFact(true);
        const answer = await askAIAboutPokemon(item.name)
        setFact(answer);
        setIsLoadingFact(false);
    }

    // Load Pokémon data from API or application's data.
    const loadItemInComponent = async (id: number) => {
        // Search in application's data.
        let pokemon = data.find((item) => item.id === id);
        if (!pokemon) {
            // If the Pokémon is not found, search the API endpoint to retrieve on the search data array.
            const pokemonInSearch = searchData.find((item) => item.id === id);
            // If the Pokémon is not found in the search data array, it means it doesn't exist.
            if (!pokemonInSearch) {
                redirect('/not-found');
            } else {
                // Retrieve Pokémon's data from the API and store it in state.
                // Avoid storing empty objects inside data and search array.
                try {
                    pokemon = await getPokemonData(id, pokemonInSearch.url);
                    createPokemon(pokemon);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        // Set Pokémon to be displayed.
        return pokemon;
    };

    // When component is mounted, load item.
    useEffect(() => {
        setIsLoading(true);
        loadItemInComponent(id).then((res) => {
            setItem(res)
        });
        setIsLoading(false);
    }, []);

    // When data array changes, update item.
    useEffect(() => {
        loadItemInComponent(id).then((res) => {
            setItem(res)
        });
    }, [data]);

    return (
        <div className="flex flex-col gap-y-4 p-3 sm:p-6">
            {/*Dialog with form to update a Pokémon.*/}
            <PokemonForm isDialogOpen={isDialogOpen}
                onCloseDialog={() => setIsDialogOpen(false)}
                onSaveChanges={onUpdate}
                element={item}
            />
            {
                isLoading ?
                    <Loading message="Loading Pokémon data..." />
                    :
                    item ?
                        <>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <h1 className="font-bold text-4xl">{item.name} ({item.id})</h1>
                                <Button className="" variant="contained" color="info" onClick={() => setIsDialogOpen(true)}>Update Pokémon</Button>
                                <Button className="" variant="contained" color="success" onClick={askAI}>Ask AI Assistant</Button>
                            </div>
                            <Divider />
                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 sm:content-center sm:mt-4">
                                {/*Render front and back images if they are available.*/}
                                <div className="flex flex-col gap-y-4 sm:p-8 p-2 shadow-lg h-fit">
                                    <h3 className="text-lg font-bold">Images:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                                        {
                                            item.sprites && item.sprites.front_default ?
                                                <Image src={item.sprites.front_default}
                                                       alt={`${item.name} front`}
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       className="w-full h-fit"
                                                /> : <NoItems message="Image not available."/>
                                        }
                                        {
                                            item.sprites && item.sprites.back_default ?
                                                <Image src={item.sprites.back_default}
                                                       alt={`${item.name} back`}
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       className="w-full h-fit"
                                                /> : <NoItems message="Image not available."/>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    {/* Display AI obtained fact about Pokémon*/}
                                    {
                                        isLoadingFact ?
                                            <Loading message="Using AI to retrieve an interesting fact..."/> :
                                            fact !== ""
                                                ?
                                                <>
                                                    <h3 className="text-lg font-bold">Additional facts
                                                        about {item.name}:</h3>
                                                    <Alert severity="success">
                                                        {fact}
                                                    </Alert>
                                                    <p className="text-xs">{"Information obtained using OpenAI's gpt-4o-mini model."}</p>
                                                    <Divider/>
                                                </>
                                                : <></>
                                    }
                                    {/* Display basic information obtained from API or user's input */}
                                    <h3 className="text-lg font-bold">Basic information:</h3>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow className="bg-[#EAF5FF]">
                                                    <TableCell><span className="font-bold">Attribute</span></TableCell>
                                                    <TableCell><span className="font-bold">Value</span></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow hover>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell>Base experience</TableCell>
                                                    <TableCell>{item.base_experience}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell>Height</TableCell>
                                                    <TableCell>{item.height}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell>Weight</TableCell>
                                                    <TableCell>{item.weight}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell>Order</TableCell>
                                                    <TableCell>{item.order}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell>Is default</TableCell>
                                                    <TableCell>{item.is_default ? 'Yes' : 'No'}</TableCell>
                                                </TableRow>
                                                {
                                                    item.types && item.types.length > 0 ?
                                                        <>
                                                            <TableRow hover>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>{item.types.map((i: any) => i.type).map((t: any) => t.name).join(", ")}</TableCell>
                                                            </TableRow>
                                                        </>
                                                        : null
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Divider/>
                                    <h3 className="text-lg font-bold">Attributes:</h3>
                                    {item.stats ?
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow className="bg-[#EAF5FF]">
                                                        <TableCell><span
                                                            className="font-bold">Attribute</span></TableCell>
                                                        <TableCell><span className="font-bold">Value</span></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.stats.map((s: any, index: number) =>

                                                        <TableRow hover key={index}>
                                                            <TableCell>{s.stat.name.replace("-", " ")}</TableCell>
                                                            <TableCell>{s.base_stat}</TableCell>
                                                        </TableRow>
                                                    )

                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        : <NoItems message="No additional stats to show..."/>
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <NoItems message="No information found for this Pokémon." />
            }
        </div>
    );
}