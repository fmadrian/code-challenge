import {mockUseDataStore} from "@/jest.setup";
import PokemonData from "@/components/PokemonData";
import {act, render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe('[COMPONENT] - PokemonData', () => {

    const user = userEvent.setup();

    const data =
        {
            id:2001,
            name: 'bulbasaur',
            base_experience: 63,
            height: 7,
            weight: 69,
            order: 28,
            is_default: true,
            sprites:{
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png'
            },
            types: [
                {
                    type: {
                        name: "grass"
                    }
                },
                {
                    type: {
                        name: "poison"
                    }
                }
            ],
            stats: [
                {
                    base_stat: 45,
                    stat: {
                        name: "hp"
                    }
                },
                {
                    base_stat: 49,
                    stat: {
                        name: "attack"
                    }
                },
                {
                    base_stat: 49,
                    stat: {
                        name: "defense"
                    }
                },
                {
                    base_stat: 65,
                    stat: {
                        name: "special-attack"
                    }
                },
                {
                    base_stat: 65,
                    stat: {
                        name: "special-defense"
                    }
                },
                {
                    base_stat: 45,
                    stat: {
                        name: "speed"
                    }
                }
            ]
        }
    ;

    // Use mock data state for this tests
    beforeAll(() => {
        // Set mock state to have the element we are going to use for tests.
        mockUseDataStore({
            data : [data]
        })
    });

    // Unit test: Render the component with a Pokémon's data.
    it(`includes Pokémon's data`, async () => {
        // 1. Arrange.

        // Render the component.
        await act(async () => render(<PokemonData id={2001} />));

        // 2. Act.

        // Check data.
        const name = screen.getByRole('heading', {
            name: new RegExp(data.name, "i")
        });
        const tableName = screen.getByRole('row', {
            name: new RegExp(`Name ${data.name}`, "i")
        });
        const tableBaseExperience = screen.getByRole('row', {
            name: new RegExp(`Base experience ${data.base_experience}`, "i")
        });
        const tableHeight = screen.getByRole('row', {
            name: new RegExp(`Height ${data.height}`, "i")
        });
        const tableWeight = screen.getByRole('row', {
            name: new RegExp(`Weight ${data.weight}`, "i")
        });
        const tableOrder = screen.getByRole('row', {
            name: new RegExp(`Order ${data.order}`, "i")
        });
        const tableIsDefault = screen.getByRole('row', {
            name: new RegExp(`Is default ${data.is_default ? 'Yes' : 'No'}`, "i")
        });
        const tableHP = screen.getByRole('row', {
            name: new RegExp(`HP ${data.stats[0].base_stat}`, "i")
        });
        const tableAttack = screen.getByRole('row', {
            name: new RegExp(`Attack ${data.stats[1].base_stat}`, "i")
        });
        const tableDefense = screen.getByRole('row', {
            name: new RegExp(`Defense ${data.stats[2].base_stat}`, "i")
        });
        const tableSpecialAttack = screen.getByRole('row', {
            name: new RegExp(`Special Attack ${data.stats[3].base_stat}`, "i")
        });
        const tableSpecialDefense = screen.getByRole('row', {
            name: new RegExp(`Special Defense ${data.stats[4].base_stat}`, "i")
        });
        const tableSpeed = screen.getByRole('row', {
            name: new RegExp(`Speed ${data.stats[5].base_stat}`, "i")
        });

        // Check images.
        const images = screen.getAllByRole('img', {
            name: new RegExp(data.name, "i")
        });

        // Check button.
        const buttonUpdate = screen.getByRole('button', {
            name: /Update Pokémon/i
        });
        const buttonAIAssistant = screen.getByRole('button', {
            name: /Ask AI Assistant/i
        });

        // 3. Assert.
        expect(name).toBeInTheDocument();
        expect(tableName).toBeInTheDocument();
        expect(tableBaseExperience).toBeInTheDocument();
        expect(tableHeight).toBeInTheDocument();
        expect(tableWeight).toBeInTheDocument();
        expect(tableOrder).toBeInTheDocument();
        expect(tableIsDefault).toBeInTheDocument();
        expect(tableHP).toBeInTheDocument();
        expect(tableAttack).toBeInTheDocument();
        expect(tableDefense).toBeInTheDocument();
        expect(tableSpecialAttack).toBeInTheDocument();
        expect(tableSpecialDefense).toBeInTheDocument();
        expect(tableSpeed).toBeInTheDocument();
        expect(buttonUpdate).toBeInTheDocument();
        expect(buttonAIAssistant).toBeInTheDocument();
        expect(images.length).toBe(2);
    });

    // Integration test: Click ask AI assistant button and checks the alert has been displayed.
    it('click ask ai assistant button displays alert', async () => {
        // 1. Arrange.

        // Render the component.
        await act(async () => render(<PokemonData id={2001} />));

        // Click ask AI assistant button.
        await user.click(screen.getByRole('button', {
            name: /ask ai assistant/i
        }));

        // 2. Act

        // Wait for progress bar to disappear.
        // Given a 10 second timeout to allow the AI assistant to return a response.
        await waitForElementToBeRemoved(()=> screen.getAllByRole('progressbar'),{timeout : 10000});

        // Search alert component
        const alert = screen.getByRole('alert');
        const message = screen.getByText(/is indeed a Pokémon/i);

        // 3. Assert.
        expect(alert).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });

});