"use client";

import { useEffect, useState } from "react";
import {useDataStore} from "@/stores/data-store";
import {getPokemonSearchData} from "@/services/PokemonService";
import Link from "next/link";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchData = useDataStore(state => state.searchData);
    const setSearchData = useDataStore(state => state.setSearchData);

    useEffect(() => {
        setIsLoading(true);
        getPokemonSearchData().then((res)=> setSearchData(res));
        setIsLoading(false);
    }, [])

    return (
        <div>
            <h1>Pokemon index</h1>
            <div className="flex flex-row gap-8 flex-wrap">
            {searchData && searchData.length > 0 ?
                searchData.map((item, index) => (
                    <Link key={index} href={`/pokemon/${item.id}`}>
                        <span>{item.name}</span>
                    </Link>
                )) : (<>
                    <h1>No items.</h1>
                </>)
            }
            </div>
        </div>
    )
}