//Hook personalizado para obtener un response de la data de un API
import type { AxiosResponse } from "axios";
import {useEffect, useState} from "react";
import type { notificacionDTO } from "../models/notificaciones.model";
import axios from "axios";


//Debe retornar un response.data con los datos a mostrar en la tabla del componente primario.
const useNotificacionesData=(props: useNotificacionesDataProps)=>{

    const [data, setData] = useState<notificacionDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalDeRegistros, setTotalDeRegistros] = useState<number>(0);
    const [totalDePaginas, setTotalDePaginas] = useState<number>(0);    
    const [error, setError] = useState<string | null>(null);

    // Función simple sin useCallback
    const recuperarData = async () => {
        const urlBase = `${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
        console.log(`URL para fetching: ${urlBase}`);
        
        try {        
            setLoading(true);   
            setError(null);            
            const response: AxiosResponse<notificacionDTO[]> = await axios.get(urlBase);                 
            const totalData = parseInt(response.headers["cantidadtotalregistros"], 10);
            setData(response.data);
            setTotalDeRegistros(totalData);
            setTotalDePaginas(Math.ceil(totalData / props.recordsPorPagina));
            
        } catch (error) {
            console.log('Error!!:', error);
            setError('Error al cargar los datos');
            alert(`Error: ${error}`)            
        } finally {
            setLoading(false);
        }
    };

        // Cargar automáticamente la primera página
    useEffect(() => {
        recuperarData();
    }, [props.apiURL, props.recordsPorPagina]); // Se recarga cuando cambian estos parámetros



    // Retornamos todo lo necesario
    return {        
        data,
        loading,
        totalDeRegistros,
        totalDePaginas,
        error,
        recuperarData
    };
};




export default useNotificacionesData; 

interface useNotificacionesDataProps {
 pagina:number   
 apiURL:string
 cargando:boolean
 recordsPorPagina:number
}




