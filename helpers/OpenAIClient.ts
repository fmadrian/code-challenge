// Using Singleton pattern to manage OpenAI API client.
import OpenAI from "openai";

export class OpenAIClient {
    static #instance: OpenAIClient;
    private static client: OpenAI;

    private constructor() {
        // Initialize OpenAI client.
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_APIKEY;
        if (apiKey) {
            OpenAIClient.client = new OpenAI(({apiKey, dangerouslyAllowBrowser:true}));
        }
    }

    public static get instance(): OpenAIClient {
        if (!OpenAIClient.#instance) {
            OpenAIClient.#instance = new OpenAIClient();
        }

        return OpenAIClient.#instance;
    }

    /**
     * Ask OpenAI to generate a fact about a Pokémon.
     *
     * @param name Pokémon's name.
     * @returns completion
     */
    public async askAboutPokemon(name: string) {
        try{
            name = name.replace("-", " ").trim();
            const prompt = `Tell me an interesting or a funny fact about the Pokémon ${name}. If ${name} is not a Pokémon, just tell me it isn't a Pokémon and therefore you can't give me additional data about it.`;
            const completion = OpenAIClient.client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {"role": "user", "content": prompt},
                ],
            });

            const fact = completion.then((result) => {
                return result.choices[0].message.content ?? 'No response'
            });
            return await fact;
        }
        catch(error){
            return `Could not retrieve additional information about this Pokémon, wait a few seconds and try again.`;
        }
    }
}
