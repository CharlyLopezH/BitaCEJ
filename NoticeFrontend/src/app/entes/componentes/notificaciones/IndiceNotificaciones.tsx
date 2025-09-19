import { useEffect, useState } from "react";
import { urlNotificaciones } from "../../../../utils/endpoints";
import { FaEdit, FaTrash } from "react-icons/fa";
import Spinner from "../../../../utils/Spinner";
import useNotificacionesData from "../../../../hooks/useNotificacionesData ";
import SelectOpcionesRegsPorPag from "../../../../utils/SelectOpcionesRegsPorPag";
import Paginacion from "../../../../utils/Paginacion";

const IndiceNotificaciones = () => {
  //Variables de estado
  const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);

  //Uso e invocación del hook peronsalizado que trae la data
  const {
    data,
    loading,
    totalDeRegistros,
    totalDePaginas,
    error,
    recuperarData,
  } = useNotificacionesData({
    //Parámetros props a enviar al hook
    apiURL: urlNotificaciones, //Viene del archivo de notificaciones
    cargando: true, //Se requiere controlar el spinner
    recordsPorPagina,
    pagina
  });

  //Funciones
  useEffect(() => {
    recuperarData();
  }, [pagina,recordsPorPagina]);

  //Esperando la respuesta del fetch
  if (loading) {return (<div>{" "}<Spinner />{" "}</div>);};

  return (
    <>
      <div className="container">

        <div className="my-div-center-text">
          <code> Indice de Notificaciones </code>
        </div>
        <hr className="mt-0" />
        <div className="my-full-width-split">
          <div className="my-split-15">
            <SelectOpcionesRegsPorPag
              value={recordsPorPagina} // ← PROP IMPORTANTE, pasa el estado actual de la variable                          
              opciones={[5,10, 25, 50, 80,100]}
              onChangeRecords={setRecordsPorPagina}
              resetPage={() => setPagina(1)} // Función opcional para resetear              
            />
          </div>          
        </div>
<hr/>



        <div className="mi-div-con-roboto">
          <table className="table table-sm table-responsive  my-compact-table table-striped table-hover">
            <thead className="my-theader">
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
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <code>Total de Registros: {totalDeRegistros} {` filtrando por: ("${navigator.geolocation.clearWatch}")`}</code>     */}
          <Paginacion 
           paginaActual={pagina} 
           cantidadTotalDePaginas={totalDePaginas} 
           radio={3}
           onChange={(paginaActual) => {
                                        console.log(`paginaActual en el índice ${paginaActual}`)
                                        setPagina(paginaActual)
        }
        }
          />
        </div>
      </div>
    </>
  );
};
export default IndiceNotificaciones;
