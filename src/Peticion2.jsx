import { useEffect, useState } from "react";

function Peticion2() {
    const [personas, setPersonas] = useState({});

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
                let getPersons = await fetch(
                    "https://www.dnd5eapi.co/api/features",
                    options
                );
                let result = await getPersons.json();
                setPersonas(result);
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
            <h2>Peticion de la Api: dnd5eapi</h2>
            <h2>Conteo de caracteristicas: {personas.count}</h2>

            <p>**********************************************</p>
        </>
    );
}

export default Peticion2;
