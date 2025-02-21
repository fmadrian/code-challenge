import axios from "axios";

/**
 * Ask external API to tell OpenAI's API to generate a fact about a Pokémon.
 * @param name Pokemon's name
 */
export const askAIAboutPokemon = async (name: string) => {
    try {
        // Clean name when passing it to request.
        const res = await axios.post(`${process.env.NEXT_PUBLIC_AIAPI_ENDPOINT}`,{name: name = name.replace("-", " ").trim()});
        // We must change the ID to the one assigned on the application.
        return res.data.message;
    } catch (error) {
        console.error(error);
        return `Could not retrieve additional information about this Pokémon, wait a few seconds and try again.`;
    }
}