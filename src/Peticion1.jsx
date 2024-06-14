import { useEffect, useState } from "react";

function Peticion1() {
    const [productos, setProductos] = useState({});

    useEffect(() => {
        let controller = new AbortController();

        let options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
        };

        async function fetchData() {
            try {
                let getProducts = await fetch(
                    "https://fakestoreapi.com/products/1",
                    options
                );
                let result = await getProducts.json();
                setProductos(result);
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
            <h1> Peticion Api fake</h1>
            <h2>La categoria es: {productos.category}</h2>
            <p>***********************************************</p>
        </>
    );
}

export default Peticion1;
