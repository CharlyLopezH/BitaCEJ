import { useEffect, useState } from 'react';
import useFetchEntes from '../../hooks/useFetchEntes';
import Spinner from "../../utils/Spinner";
import { urlEntes } from "../../utils/endpoints";
import SelectOpcRegsPorPag from './componentes/SelectOpcRegsPorPag';
import Paginacion from '../../utils/Paginacion';
import FiltroEntesString from '../../utils/FiltroEntesString';

const TablaEntes = () => { //Trataremos de renderizar una tabla con los datos que vienen de un API
  
  const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
  const [recordsPorPagina, setRecordsPorPagina] = useState(10); //Determina cuantos registros por página vamos a mostrar (por default 10)    
  const [apiURL, setApiURL] = useState('');
  //const [searchTerm, setSearchTerm] = useState('');
  
  //Definición y armado del Url correcto según la búsqueda que se requiera 
  //Si es sin término-cadena

  // const definirDataURL=()=> {
  //   console.log(`URL ejemplo: https://localhost:7015/entes?pagina=1&recordsPorPagina=10`);
  //   console.log(`**** Entrando a la función para definir la dataURL urlEntes= ${urlEntes}`);
  //   const params = new URLSearchParams({
  //   pagina: pagina.toString(),
  //   recordsPorPagina: recordsPorPagina.toString() 
  //   });      
  // } 

//Llamado a funciones de extracción y respuesta de datos
//Estableciendo conexión con el API de Entes mediante **Hook personalizado** para establecer
//console.log(`apiURL:  ${apiURL}`);
//Modificaré el apiURL en función de que cadenaBuscar tenga valor o no lo tenga
// ✅ Efecto para actualizar apiURL sin bucle infinito


// Efecto para construir la URL completa ******* 
// useEffect(() => {
//   const params = new URLSearchParams({
//     pagina: pagina.toString(),
//     recordsPorPagina: recordsPorPagina.toString()
//   });  
//   const nuevaURL = cadenaBuscar.trim().length > 1
//   ? `${urlEntes}/filtrar/${encodeURIComponent(cadenaBuscar)}?${params}`
//   : `${urlEntes}?`;  
//   setApiURL(nuevaURL);
// //}, [cadenaBuscar, pagina, recordsPorPagina]);
// }, []);
// *** ** * * * * * * ** * * * * * * * * * * ** * * * * * * * *


   //console.log(`apiURL ${apiURL}/filtrar/${encodeURIComponent(cadenaBuscar)}?pagina=${pagina}&recordsPorPagina=${recordsPorPagina}`)    
   // ***** IMPORTANTE ***** **** *** ** ****** *** Hook personalizado
   //console.log(`APIURL antes de llamar al hook: ${apiURL}`);

   
   useEffect(()=>{
   // Traer la Data
  },[])
  const { data, totalDePaginas, cargando, error } = useFetchEntes(apiURL, pagina, recordsPorPagina);    







   //console.log(`la data después de llamar al hook: ${data}`);

  if (error) return <div>Error: {error}</div>; //Manejo (default) del posible error en el intento del hook personalizado
  //Si la Variable de estado "cargando" está en true, es porque no ha llegado al finally del load...  
  if (cargando) {  return ( <div> <Spinner/>  </div>    ); }

  const handleEditar=(id: number)=> {
    throw new Error(`Function not implemented.${id}`);
  }

  //Cuando cargando sea false se ejecuta este return, que es el principal
  return (
    <>
        {/* Renderiza la tabla */}
        
    <div className="my-full-width-split" >
      <div className='my-split-15'>
        <SelectOpcRegsPorPag             
             defaultValue={10} 
             opciones={[5, 10, 25, 50]} 
             onChangeRecords={setRecordsPorPagina}
             resetPage={() => setPagina(1)} // Función opcional para resetear
             />
      </div>

      <div className='my-split-85'>
        {/* Este componente maneja un callback para ejecutar una acción que filtre los registros que coincidan con el string de búsqueda  */}
        <FiltroEntesString 
        //onSearchChange={setCadenaBuscar} //Actualiza el valor de la variable de estado...
        //cadenaString={cadenaBuscar}      //Variable que tiene el término de búsqueda   
        />
    </div>
    </div>
        <div>
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
            
           {/* Componente de paginación  */}
           <Paginacion 
           paginaActual={pagina} 
           cantidadTotalDePaginas={totalDePaginas} 
           radio={3}
           onChange={(nuevaPagina) => setPagina(nuevaPagina)}
           />
          </div>
        </div>        
      <div>
    </div>
    </>
  );
};
export default TablaEntes;
