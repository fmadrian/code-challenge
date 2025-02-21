import PokemonData from "@/components/PokemonData";

/**
 * Page displays a Pokémon's data.
 * Searching data delegated to PokemonData component due to the impossibility to use useEffect in async components
 * Component has to be async in order to get ID from URL.
 * @param params URL parameter (id).
 */
export default async function Page({params,}: {params: Promise<{ id: string }>}) {
    // Retrieve ID from URL.
    const id = parseInt((await params).id);

    return (
        <>
            <PokemonData id={id}/>
        </>
    )
}