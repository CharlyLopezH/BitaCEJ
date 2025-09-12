import { useEffect, useState } from "react";
import { urlNotificaciones } from "../../../../utils/endpoints";
import type { AxiosResponse } from "axios";
import type { enteDTO } from "../../../../models/entes.model";
import axios from "axios";
import type { notificacionDTO } from "../../../../models/notificaciones.model";
import { FaEdit, FaTrash } from "react-icons/fa";
import Spinner from "../../../../utils/Spinner";
import useNotificacionesData from "../../../../hooks/useNotificacionesData ";


const IndiceNotificaciones=()=>{

//Variables de estado
const [apiURL, setApiURL] = useState(urlNotificaciones);
const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
const [recordsPorPagina, setRecordsPorPagina] = useState(10);
const [totalDeRegistros, setTotalDeRegistros] = useState(0);
const [totalDePaginas, setTotalDePaginas] = useState(0);
const [data, setData] = useState<notificacionDTO[]>([]);
const [cargando, setCargando] = useState<boolean>(true);


const info = useNotificacionesData({
    apiURL: urlNotificaciones
}); //tentativa propuesta

//Funciones
useEffect(()=>{
//recuperarData()
console.log(`Info obtenido en el componente primario ${info}`);
},[]);

const recuperarData= async()=> {

    //Url para traer datos recuperar la Data de notificaciones: urlNotificaciones + parámetros de paginación
    //Conexión con el API
    const urlBase = `${apiURL}?pagina=${pagina}&recordsPorPagina=${recordsPorPagina}`;
    console.log(`urlBase ${urlBase}`, 'urlBase');
    try {        
     setCargando(true);   
     const response: AxiosResponse<notificacionDTO[]> = await axios.get(urlBase);
     console.log(`response.data: ${response.data.toString}`);
     const totalData = parseInt(response.headers["cantidadtotalregistros"],10);
     setTotalDeRegistros(totalData);
     setTotalDePaginas(Math.ceil(totalData / recordsPorPagina));
     setData(response.data);
    } catch (error) {
        console.log('Error inesperado: '+error)
    }finally{
    setCargando(false);
    }
}
    //Esperando la respuesta del fetch
    if (cargando) {  return ( <div> <Spinner/>  </div>    ); }

    return(
        <>
        <div  className="container">
        <div className="my-div-center-text">
            <code> Indice de Notificaciones </code>
        </div>    
        <hr className="mt-0"/>
            <div>
                          <table className="table table-sm table-responsive  my-compact-table table-striped table-hover">
                            <thead className='my-theader'>
                            <tr>
                             <td>ID</td>
                             <td>Oficio/Memo</td>
                             <td>Fecha</td>
                             <td>Destinatario</td>
                             <td>Expediente/Asunto</td>
                             <td>Notificador</td>
                             <td>Acuse</td>
                            </tr>
                           </thead>
                            <tbody>
                              {data.map((noti) => (
                                   <tr key={noti.id}>
                                    <td>{noti.id}</td>
                                    <td>{noti.oficioMemo}</td>
                                    <td>{noti.fechaBitacora}</td>
                                    <td>{noti.destinatario}</td>
                                    <td>{noti.expedienteAsunto}</td>
                                    <td>{noti.notificador}</td>
                                    <td>{noti.fechaAcuse}</td>
                                    <td>
                                    </td>
                                   </tr>
                                  ))}
                            </tbody>
                            </table>
                
            </div>
        </div>
        </>
    )
}
export default IndiceNotificaciones;


