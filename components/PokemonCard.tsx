import Link from "next/link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {useDataStore} from "@/stores/data-store";

/**
 * Component displays search data from a Pokemon.
 * @param pokemon - Pokemon to be displayed.
 * @param refreshFilteredList - Function to refresh the filtered list on parent component.
 */
export default function PokemonCard({pokemon}: { pokemon:any,}){
    // Pokemon's search data.
    const {id, name, url} = pokemon;

    // Application's state.
    const deletePokemon = useDataStore(state => state.deletePokemon);

    return (
        <div className="transition border flex flex-col p-4 gap-y-4 hover:bg-neutral-100">
            <Link href={`/pokemon/${id}`}>
                <div className="flex flex-col gap-y-2">
                    <span className="text-lg">{name}</span>
                    <Divider/>
                    <span className="text-md">{url === '' ? 'Created by user' : 'Retrieved from PokeAPI'}</span>
                </div>
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 justify-stretch overflow-auto">
                {/* Button calls delete function from state. */}
                <Button className="flex-grow" variant="contained" color="error" onClick={() => deletePokemon(id)}>Delete</Button>
                </div>
            </div>
    );
}