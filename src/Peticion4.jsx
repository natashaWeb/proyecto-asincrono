import { useEffect, useState } from "react";

function Peticion4() {
    const [users, setUsers] = useState([]);

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
                let getUsers = await fetch(
                    "https://randomuser.me/api/?gender=female",
                    options
                );
                let result = await getUsers.json();
                setUsers(result.results);
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
            <h1>La usuario Femenio es de nombre y apellido:</h1>
            <ul>
                {users &&
                    users.map((user, index) => (
                        <li key={index}>
                            {user.name.first} {user.name.last}
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default Peticion4;
