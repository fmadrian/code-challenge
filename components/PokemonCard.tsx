import Link from "next/link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {useDataStore} from "@/stores/data-store";
import Image from "next/image";
import NoItems from "@/components/NoItems";

/**
 * Component displays search data from a Pokémon.
 * @param pokemonSearchData - Pokémon to be displayed.
 */
export default function PokemonCard({pokemonSearchData, pokemonData}: { pokemonSearchData:any, pokemonData?:any}){
    // Pokémon's search data.
    const {id, name, url} = pokemonSearchData;

    // Application's state.
    const deletePokemon = useDataStore(state => state.deletePokemon);

    return (
        <div className="transition border flex flex-col p-4 gap-y-4 hover:bg-neutral-100 h-fit ">
            <Link href={`/pokemon/${id}`}>
                <div className="flex flex-col gap-y-2">
                    {
                        pokemonData ?
                            <>
                                <div className="self-center min-h-[100px]">
                                    {pokemonData.sprites.front_default ?
                                        <Image src={pokemonData.sprites.front_default}
                                               alt={name}
                                               width={0}
                                               height={0}
                                               className="w-full h-full"
                                               sizes="100vw"
                                        />
                                        : <NoItems message=""/>}

                                </div>
                                <Divider/>
                            </>
                            : null
                    }
                    <span className="text-lg font-bold">{name}</span>
                    <Divider/>
                    <span className="text-md">{url === '' ? 'Created by user' : 'Retrieved from PokeAPI'}</span>
                    <Divider/>
                    <div className="flex flex-col gap-y-2">
                        {
                            pokemonData ?
                                <>
                                    <span className="font-bold">{`Types: ${pokemonData.types.map((t:any)=>t.type).map((t:any)=>t.name).join(", ")}` }</span>
                                    <span className="text-md">{`Base XP/Height/Weight:  ${pokemonData.base_experience}/${pokemonData.height}/${pokemonData.weight}`}</span>
                                </>
                            :
                                <span className="text-xs">Open Pokémon to fully load its information.</span>
                        }
                </div>
                </div>
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 justify-stretch overflow-auto">
                {/* Button calls delete function from state. */}
                <Button className="flex-grow" variant="contained" color="error" onClick={() => deletePokemon(id)}>Delete</Button>
                </div>
            </div>
    );
}