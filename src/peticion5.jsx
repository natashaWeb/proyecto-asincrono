import { useEffect, useState } from "react";

function Peticion5() {
    const [games, setGames] = useState([]);

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
                let getGames = await fetch(
                    "https://api.rawg.io/api/games?key=87de2e7b83aa4de69123fe69e628e0cd&metacritic=95,100",
                    options
                );
                let result = await getGames.json();
                setGames(result.results);
            } catch (error) {
                console.log(error);
            } finally {
                controller.abort();
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>Los mejores juegos son:</h1>
            <ul>
                {games &&
                    games.map((game, index) => (
                        <li key={index}>{game.name}</li>
                    ))}
            </ul>
        </>
    );
}

export default Peticion5;
