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
//const [cargando, setCargando] = useState<boolean>(false);

//Uso del hook peronsalizado que trae la data
const {data,  
    loading,
    totalDeRegistros,
    totalDePaginas,    
    error,     
    recuperarData 
} = useNotificacionesData({    
    //Parámetros props a enviar al hook
    apiURL: urlNotificaciones,  //Viene del archivo de notificaciones
    cargando:true, //Se requiere controlar el spinner
    recordsPorPagina,    
}); 
    // Para ver propiedades específicas:
    // Debug: verificar datos recibidos
    useEffect(() => {
        console.log('📊 Datos en componente:', data);
        console.log('🔄 Loading:', loading);
        console.log('📈 Total registros:', totalDeRegistros);
        console.log('🔢 Total páginas:', totalDePaginas);
        console.log('❌ Error:', error);
    }, [data, loading, totalDeRegistros, totalDePaginas, error]);


//Funciones
useEffect(()=>{
recuperarData(1)
//recuperarData2()
//console.log(`Info obtenido en el componente primario ${info}`);
},[]);


    //Esperando la respuesta del fetch
    if (loading) {  return ( <div> <Spinner/>  </div>    ); }

    return(
        <>
        <div  className="container">
        <div className="my-div-center-text">
            <code> Indice de Notificaciones </code>
        </div>    
        <hr className="mt-0"/>
            <div className="mi-div-con-roboto">
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


