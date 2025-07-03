import { useEffect, useState } from 'react';
//import useFetchEntes from '../../hooks/useFetchEntes';
import Spinner from "../../utils/Spinner";
import { urlEntes } from "../../utils/endpoints";
import SelectOpcRegsPorPag from './componentes/SelectOpcRegsPorPag';
import Paginacion from '../../utils/Paginacion';
import FiltroEntesString from '../../utils/FiltroEntesString';
import FiltrarData from '../../utils/FiltrarData';
import type { enteDTO } from '../../models/entes.model';
import axios, { type AxiosResponse } from 'axios';

//Render de Tabla
const TablaEntexx = () => {

const [apiURL, setApiURL] = useState(urlEntes);  
const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
const [recordsPorPagina, setRecordsPorPagina] = useState(10); //Determina cuantos registros por página vamos a mostrar (por default 10)  
const [totalDeRegistros, setTotaDeRegistros] = useState(0);
const [totalDePaginas, setTotalDePaginas] = useState(0);
const [cargando, setCargando] = useState(true);
const [data, setData] = useState<enteDTO[]>([]);
const [error, setError] = useState<string | null>(null);
const [filtrar, setFiltrar]=useState(''); //Recibe Indicación de Filtrar o no filtrar para decidir cual formato de apiUrl utilizar.



useEffect(() => {
  // Actualiza apiURL basado en filtrar
  if (filtrar.trim() !== '') {
    console.log('Cambio detectado Con Filtro:');
    const nuevaURL = `${urlEntes}`;
    //setApiURL(urlEntes+'/filtrar/'+filtrar+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina);
    setApiURL(urlEntes+'/filtrar/'+filtrar+'?');
    //setApiURL(apiURL+'/filtrar/'+filtrar+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina);    
    //setApiURL(nuevaURL);
    console.log(`Con filttroooo: ${nuevaURL}`);
  } else {
    setApiURL(urlEntes); // URL sin filtro
    console.log('Sin Filtro');
  }
  traerData;
}, [filtrar]); // Se ejecuta cuando filtrar cambia


useEffect(()=>{
 traerData();
},[pagina, recordsPorPagina,apiURL])

//Función que recupera la data necesaria para renderizar la tabla de datos
const traerData = async ()=> {
  // Actualiza apiURL basado en filtrar
 console.log('TRAER DATAAAA, TENGO QUE RECUPERAR LA DATA');
 console.log(`Valor de Filtrar ${filtrar}`);
 if (filtrar.length > 0 ) {
     console.log('Cambio en variable filtrar detectadooooo');
     //setApiURL(apiURL+'/filtrar/'+filtrar+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina);
     //setApiURL(`${urlEntes}sdfsdf//`)
 } else {
     //El apiurl se queda como está.  
     console.log('No se debe cambiar valor del apiUrl')
 }
   try {

    //https://localhost:7015/entes?pagina=1&recordsPorPagina=10    //ejemplo url inicial, por defecto    
    const response: AxiosResponse<enteDTO[]> = await axios.get(apiURL+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina);        
    // if (filtrar.length > 1) { //Clave para saber si hay algo que buscar y por lo tanto modificar el url base por defecto
    //   //Modificare url
    //   //https://localhost:7015/entes/filtrar/opd?pagina=1&recordsPorPagina=10 // ejemplo url para filtrar busqueda
    //   setApiURL(apiURL+'/filtrar/'+filtrar+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina);
    //   console.log('nuevoURL:  '+ apiURL+'/filtrar/'+filtrar+'?pagina='+pagina+'&recordsPorPagina='+recordsPorPagina)
    // }
    const totalDeRegistros = parseInt(response.headers["cantidadtotalregistros"],10);
    setTotaDeRegistros(totalDeRegistros);
    setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));  
    setData(response.data);
  } catch (error) {

  } finally {
     setCargando(false);
  }
}
  
  
   if (error) return <div>Error: {error}</div>; //Manejo (default) del posible error en el intento del hook personalizado
  //Si la Variable de estado "cargando" está en true, es porque no ha llegado al finally del load...
  if (cargando) {  return ( <div> <Spinner/>  </div>    ); }
  const handleEditar=(id: number)=> {
    throw new Error(`Function not implemented.${id}`);
  }
  

  // const handleFiltrar = (termino) => {
  //   console.log(`Desde tablaEnte termino:  ${termino}`)
  //   setFiltrar(termino);
  //   setPagina(1); // Resetear a página 1 al buscar
  // };

  //Cuando cargando sea false se ejecuta este return, que es el principal
  return (
    <>
    {/* Renderiza la tabla */}     
    <div className="my-full-width-split" >
      <div className='my-split-15'>
        <SelectOpcRegsPorPag             
             defaultValue={10} 
             opciones={[10, 25, 50,80]} 
             onChangeRecords={setRecordsPorPagina}
             resetPage={() => setPagina(1)} // Función opcional para resetear
             />
      </div>

      <div className='my-split-85'>
        {/* Este componente maneja un callback para ejecutar una acción que filtre los registros que coincidan con el string de búsqueda  */}
        {/* Componente Input para filtrar Datos de respuesta  */}
        <FiltrarData setFiltrar={setFiltrar}
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
            <code>Total de Registros: {totalDeRegistros} </code>
            
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
export default TablaEntexx;
