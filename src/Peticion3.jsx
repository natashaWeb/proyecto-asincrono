import { useState, useEffect } from "react";

function Peticion3() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        let controller = new AbortController();

        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        };
        async function fetchData() {
            try {
                let getPokemons = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0",
                    options
                );
                let result = await getPokemons.json();
                setPokemonList(result.results);
            } catch (error) {
                console.log(error);
            } finally {
                controller.abort();
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Listado de Pokémon</h1>
            <ul>
                {pokemonList &&
                    pokemonList.map((pokemon, index) => (
                        <li key={index}>{pokemon.name}</li>
                    ))}
            </ul>
        </div>
    );
}

export default Peticion3;
