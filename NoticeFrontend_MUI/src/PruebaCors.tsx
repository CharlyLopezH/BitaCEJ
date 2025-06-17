import { useEffect } from "react";

const PruebaCors=()=>{
        useEffect(()=>{
        fetch('https://localhost:7015/')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('CORS - Error de Cors:', error));
      },[])

    return(
        <>
        <h3>Probando Cors</h3>
        <h2>Checa la consola -Press F12- </h2>
        </>
    )

}
export default PruebaCors