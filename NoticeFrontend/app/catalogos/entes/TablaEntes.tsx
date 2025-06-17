import type { AxiosResponse } from "axios";
import type { enteDTO } from "../models/entes.model";
import { urlEntes } from "../../../src/utils/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
//import reactLogo from './assets/react.svg'


const TablaEntes=()=>{
    //Variables de estado
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1); // Página actual (base 0)
    const [recordsPorPagina, setRecordsPorPagina] = useState(25); // Filas por página por defecto

    //Función memorizable para lectura de datos y carga de la tabla    
    const fetchInitialData = async ()=>{
        try {
            const response: AxiosResponse<enteDTO[]> = await axios.get(
            urlEntes,{
           params: {
             pagina: pagina,recordsPorPagina
           }
        });   
        await new Promise(resolve => setTimeout(resolve, 2000)) // Delay artificial fijo de 2 segundos      
        console.log(`Haciendo el Get Respuesta: ${JSON.stringify(response.data, null, 2)}`);

        } catch(error) {
        console.log(`Error al acceder al APIUrl ${error}`);

        } finally {
        setCargando(false);    
        }
    }

    //Llamado a la función memorizada que localiza los registros del APIUrl
    useEffect(()=>{
    fetchInitialData();
    },[pagina,recordsPorPagina ])

    if (cargando) return (
        <>
         <h3> Cargando....</h3>

        </>
    );

    return(
    <>
    <div>
      <hr />
          <p>Tabla</p>
        </div>
       
    </>
    );
}
export default TablaEntes;