import Link from "next/link";
import {Button, Divider} from "@mui/material";

/**
 * Component displays search data from a Pokemon.
 * @param pokemon - Pokemon to be displayed.
 */
export default function PokemonCard({pokemon}: any){
    const {id, name, url} = pokemon;

    const onUpdate = () => {
        // TODO: Implement behavior.
        console.log("update");
    };

    const onDelete = () => {
        // TODO: Implement behavior.
        console.log("delete");
    };


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
                <Button className="flex-grow" variant="contained" color="info" onClick={onUpdate}>Update</Button>
                <Button className="flex-grow" variant="contained" color="error" onClick={onDelete}>Delete</Button>
                </div>
            </div>
    );
}