//Hook personalizado para obtener un response de la data de un API
import type { AxiosResponse } from "axios";
import {useCallback, useEffect, useState} from "react";
import type { notificacionDTO } from "../models/notificaciones.model";
import axios from "axios";

//Debe retornar un response.data con los datos a mostrar en la tabla del componente primario.
const useNotificacionesData = (props: useNotificacionesDataProps) => {
    const [data, setData] = useState<notificacionDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalDeRegistros, setTotalDeRegistros] = useState<number>(0);
    const [totalDePaginas, setTotalDePaginas] = useState<number>(0);    
    const [error, setError] = useState<string | null>(null);

        useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Construir URL dinámicamente
                let url;
                if (props.searchTerm && props.searchTerm.trim() !== '') {
                    url = `${props.apiURL}/buscarNotificaciones/${encodeURIComponent(props.searchTerm.trim())}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
                } else {
                    url = `${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
                }
                
                console.log('🌐 Fetching URL:', url);
                const response = await axios.get(url);
                
                const totalData = parseInt(response.headers["cantidadtotalregistros"], 10);
                setData(response.data);
                setTotalDeRegistros(totalData);
                setTotalDePaginas(Math.ceil(totalData / props.recordsPorPagina));
                
            } catch (err) {
                console.error('❌ Error fetching data:', err);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.apiURL, props.pagina, props.recordsPorPagina, props.searchTerm]);

    return { data, loading, totalDeRegistros, totalDePaginas, error };
};
export default useNotificacionesData; 

interface useNotificacionesDataProps {
 pagina:number   
 apiURL:string  //Viene desde el index, comopnente padre
 cargando:boolean
 recordsPorPagina:number
 searchTerm : string// ✅ Nuevo parámetro 
}




