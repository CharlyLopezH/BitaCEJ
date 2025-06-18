import { useState } from 'react';
import useFetchEntes from '../../hooks/useFetchEntes';
import Spinner from "../../utils/Spinner";
//import reactLogo from '../../assets/loadingbb.svg';
import { urlEntes } from "../../utils/endpoints";
import SelectOpcRegsPorPag from './componentes/SelectOpcRegsPorPag';
import Paginacion from '../../utils/Paginacion';

const TablaEntes = () => { //Trataremos de renderizar una tabla con los datos que vienen de un API
  
  const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
  const [recordsPorPagina, setRecordsPorPagina] = useState(10); //Determina cuantos registros por página vamos a mostrar (por default 10)  
  
  //Extableciendo conexión con el API de Entes mediante Hook personalizado para establecer
  const { data, totalDeRegistros, totalDePaginas, cargando, error } = useFetchEntes(urlEntes, pagina, recordsPorPagina); 
  if (error) return <div>Error: {error}</div>; //Manejo (default) del posible error en el intento del hook personalizado
  //Si la Variable de estado "cargando" está en true, es porque no ha llegado al finally del load...
  
  if (cargando) {  return ( <div>       <Spinner/>  </div>    ); }

  const handleEditar=(id: number)=> {
    throw new Error(`Function not implemented.${id}`);
  }

  //Cuando cargando sea false se ejecuta este return, que es el principal
  return (
    <>
      <div>        
        {/* Renderiza la tabla */}

        {/* Componente para Seleccionar la cantidad de registros a mostrar*/}
        <div className="container">
            <div className="my-select-recs-pagina">
                <label className='my-label'>Registros por página:</label>
                <select
                    className="form-control"
                    defaultValue={10}
                    onChange={e => {
                        setPagina(1);
                        setRecordsPorPagina(parseInt(e.currentTarget.value, 10))
                    }}>
                    <option value={5}>mostrar 5</option>
                    <option value={10}>mostrar 10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>



          <div>            
          <table className="table table-responsive table-sm table-responsive table-sm my-compact-table table-striped table-hover">
            <thead className='my-theader'>
            <tr>
             <td>ID</td>
             <td>Nombre</td>
             <td>Tipo</td>
             <td>Opciones</td>
            </tr>
           </thead>
           <tbody>
              {data.map((ente) => (
                   <tr key={ente.id}>
                    <td>{ente.id}</td>
                    <td>{ente.nombre}</td>
                    <td>{ente.tipo}</td>
                    <td className='text-center'>
                      <button className="btn btn-sm btn-outline-primary my-btn-compact"onClick={() => handleEditar(ente.id)}> Editar </button> 
                      <span> </span>
                      <button className="btn btn-sm btn-outline-danger my-btn-compact"onClick={() => handleEditar(ente.id)}> Borrar </button> 
                    </td>
                   </tr>
                  ))}
          </tbody>
          </table>
          </div>
              <SelectOpcRegsPorPag 
              defaultValue={10} 
              opciones={[5, 10, 25, 50]} 
              onChangeRecords={setRecordsPorPagina}
              resetPage={() => setPagina(1)} // Función opcional para resetear
              />
        </div>        
      </div>
      <div>
      </div>
    </>
  );
};
export default TablaEntes;
