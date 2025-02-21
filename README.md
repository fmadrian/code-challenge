  

# code-challenge

  

Adrián Fallas Marín's code challenge solution: [fmadrian-codechallenge.netlify.app.](fmadrian-codechallenge.netlify.app).

  

## Description of solution


The solution developed is a web application to show different Pokémon and manage some of their data. The data is extracted using PokeAPI's API or is input by the user.

The users can also ask an AI assistant to give them additional facts about a Pokémon they are currently seeing.

### Web client

Made with Next.js alongside MUI, axios, Jest (testing), zustand libraries. In addition, the application uses PokeAPI's API to retrieve basic Pokémon data and an external API to get additional information about the Pokémon.

### External/AI API

The application uses OpenAI Completions API to get additional information or facts about the different Pokémon.

To avoid exposing OpenAI's API key on the web client, I created an API with one endpoint which receives a Pokémon's name and forwards it to OpenAI's gpt-4o-mini model. 

The API was created with Express and deployed using Netlify Functions. The URL to its repository is: [https://github.com/fmadrian/code-challenge-chatapi](https://github.com/fmadrian/code-challenge-chatapi).

## AI integration

OpenAI's Completions API provides complementary facts about the Pokémon selected. This improves the experience of searching a Pokémon's data as it offers data which is not given by PokeAPI.
## Application's URL and users

### Application's URL
  

The application's URL is [fmadrian-codechallenge.netlify.app](https://fmadrian-codechallenge.netlify.app).

### Users

  

This is a list of the users available in the application:

  

```
username/password: user1/123
username/password: user2/123
username/password: user3/123
```

  

## Tests

  

To run the tests, use the following command on the root folder of this project.

  

```
npm run test
```

  

## Locally run the application

  

### Requisites

  

Before running the application, you need:

1. An OpenAI Completions API key.

2. Rename the file ***.env.example*** to ***.env*** and fill the missing environment variables.

  

### Command

  

To run the application, use the following command on the root folder of this project.

  

```
npm run dev
```

  

Then you can access the application by going to [http://localhost:3000](http://localhost:3000).

  

## How to use the application?

  

### Search Pokémon

  

**If no name is given, all Pokémon in the list will be returned.**

  

To search a Pokémon, follow these steps:

  

1. Click the ***POKEMON LIST button***.

2. Type a name in the ***search bar***.

3. Click the ***SEARCH button***.

  

### Create Pokémon

![Pokémon list button](readme_images/pokemon-list-button.png)

![Search Pokémon](readme_images/search-pokemon.png)

  

To create a Pokémon, follow these steps:

  

1. Click the ***POKEMON LIST button***.

2. Click the ***CREATE button***.

3. Fill the form.

4. Click the ***CREATE button*** inside the **form**.

  

![Create Pokémon](readme_images/create-pokemon.png)

  

### See Pokémon's information

  

To create a Pokémon's, follow these steps:

  

1. Search a Pokémon.

2. Click the ***Pokémon's card***.

  

![Pokémon card](readme_images/pokemon-card-button.png)

  

### Update Pokémon

  

To update a Pokémon, follow these steps:

  

1. Open a Pokémon's information.

2. Click the ***UPDATE button***.

3. Make changes on the form.

4. Click the ***UPDATE button*** inside the **form**.

  

![Update Pokémon](readme_images/update-pokemon.png)

  

### Delete Pokémon

  

To delete a Pokémon, follow these steps:

  

1. Search a Pokémon.

2. Click the ***DELETE button***.

  

![Delete Pokémon](readme_images/delete-pokemon.png)

  

### Restart / fill data

  

Restarting the application's data will fill it with Pokémon from PokeAPI.

  

To restart the application's data, follow this step:

  

1. Click ***RESET DATA button*** in the **header**.

  

![Reset application's data](readme_images/reset-data.png)

  

### Ask AI assistant

  

To the AI assistant additional information about a Pokémon, follow these steps.

  

1. Open a Pokémon's information.

2. Click the ***ASK AI ASSISTANT button***.

3. Wait for the information to load.

  

![AI Assistant giving information](readme_images/ai-assistant.png)