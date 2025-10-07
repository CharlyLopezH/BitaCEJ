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

//Experimental ****
    console.log(props.searchTerm+ ' Entrando al hook useNotifData');
    

///    


    //Variables para el buscador
    let urlBase = `${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
    //console.log( `** ${urlBase} Este es el URL base FORMADO`);

    //Todo bien, a menos que el searchTerm no esté en blanco

    if (props.searchTerm !='') {
        console.log('CAMBIAR URL BASe!!!');     
        urlBase = `${props.apiURL}?pagina=${props.pagina}&recordsPorPaginas=${props.recordsPorPagina}`;
    } else {
        console.log('¡¡Mantener URL Base!!!');
    }


    //UseEffect para control de la ruta que queremos utilizar ya sea con o sin filtrar 
    // (Normal es sin filtrar // con filtro es porque hay una cadena en el componente de Busqueda)
    // useEffect(()=>{
    //     if(props.searchTerm=='') {
    //         setUrlBase(props.apiURL+'/filtrarDataPag/'+props.searchTerm);
    //         console.log('Alterar urlBase para ejecutar la búsqueda string');
    //         console.log(`Revisando props.apiURL!!: ${urlBase}`);
    //     }
    // },[])
    
    
    // Función simple sin useCallback
    const recuperarData = async () => {
        //console.log('Entrando a recuperarData!! '+props.searchTerm);     
        
        // let urlBase = '';                
        // if (props.searchTerm.trim() ==''){
        //     urlBase = `${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
        // }else {
        //     urlBase= `${props.apiURL}/notificaciones/buscarNotificaciones/ ${props.searchTerm} ?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;                                  
        // }
        // console.log(urlBase);
        
            //urlBase= `${props.apiURL}/notificaciones/buscarNotificaciones/ ${props.searchTerm} ?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;                                  
            // if (props.searchTerm == '') {
            //     console.log('NO Modificar urlBase!!! atención')
            //  } else {
            //     console.log('Cambiar api URL para activar filtrado')
            //     urlBase = `${props.apiURL}/notificaciones/buscarNotificaciones/ ${props.searchTerm} ?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
            //  }

        //let urlBase=''
        // if (props.searchTerm == '') {
        //     console.log('No hay string de búsqueda')
        //     urlBase=`${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;           
        // } else if(props.searchTerm!='') {
        //     console.log(`Comprobación !!! modificar el api base para activar buscarNotifs: ${urlBase}`);        
        //     //urlBase=`${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;           
        //     //urlBase=`${props.apiURL}?pagina=${props.pagina}&recordsPorPagina=${props.recordsPorPagina}`;
        //     setUrlBase('https://localhost:7015/notificaciones/buscarNotificaciones/SEA?pagina=1&recordsPorPagina=10'); 
        // }                
        
        try { 
            console.log(`Entrando al hook Personalizado---> ${props.apiURL} searchTerm: ${props.searchTerm}`);
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
    }, [props.apiURL, props.recordsPorPagina,props.pagina]); // Se recarga cuando cambian estos parámetros



    // Retornamos todo lo necesario
    return {        
        data,
        loading,
        totalDeRegistros,
        totalDePaginas,
        error,
        recuperarData,
        
    };
};



export default useNotificacionesData; 

interface useNotificacionesDataProps {
 pagina:number   
 apiURL:string  //Viene desde el index, comopnente padre
 cargando:boolean
 recordsPorPagina:number
 searchTerm : string// ✅ Nuevo parámetro 
}




