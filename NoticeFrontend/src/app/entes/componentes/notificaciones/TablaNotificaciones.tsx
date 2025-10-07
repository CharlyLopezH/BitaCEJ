import Paginacion from "../../../../utils/Paginacion";
import SelectOpcionesRegsPorPag from "../../../../utils/SelectOpcionesRegsPorPag";
import type { notificacionDTO } from "../../../../models/notificaciones.model";

const TablaNotificaciones=(props: TablaNotificacionesProps)=>{

  return (
    <>
      <div className="container">
        <hr className="mt-0" />
        <div className="my-text-sm">Registros por Página</div>
        <div className="my-full-width-split">
          <div className="my-split-15">
            <SelectOpcionesRegsPorPag
              value={props.recordsPorPagina} // ← PROP IMPORTANTE, pasa el estado actual de la variable                          
              opciones={[5,10, 25, 50, 80,100]}
              onChangeRecords={props.setRecordsPorPagina}
              resetPage={() => props.setPagina(1)} // Función opcional para resetear              
            />
          </div>          
        </div>

        <hr/>      
        {/* <div className="div-center modal-card"> {error} </div> */}
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
              {props.data.map((n) => (
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.oficioMemo}</td>
                  <td>{n.fechaBitacora ? new Date(n.fechaAcuse).toLocaleDateString('es-ES') : ''}</td>
                  <td>{n.destinatario}</td>
                  <td>{n.expedienteAsunto}</td>
                  <td>{n.notificador}</td>
                  <td>{n.fechaAcuse ? new Date(n.fechaAcuse).toLocaleDateString('es-ES') : ''}</td>
                  <td></td>
                </tr>
              ))}              
            </tbody>
          </table>
          {/* <code>Total de Registros: {props.totalDeRegistros} {` filtrando por: ("${navigator.geolocation.clearWatch}")`}</code>     */}
          <code className="my-text-sm">Mostrando {props.totalDeRegistros} Registros, {` en un total de ${props.totalDePaginas} página(s)`}</code>    
          <Paginacion 
           paginaActual={props.pagina} 
           cantidadTotalDePaginas={props.totalDePaginas} 
           radio={3}
           onChange={(paginaActual) => {
                                        console.log(`paginaActual en el índice ${paginaActual}`)
                                        props.setPagina(paginaActual)
        }
        }
          />
        </div>
      </div>
    </>
  );
} 
export default TablaNotificaciones;

interface TablaNotificacionesProps {
    data:notificacionDTO[]
    totalDePaginas:number
    pagina:number
    setRecordsPorPagina: any
    setPagina: any
    recordsPorPagina:number
    totalDeRegistros:number      
    //determinarApiURL:()=>void
}