import { useEffect, useState } from 'react';
import '../../../src/Styles.css';

//import useFetchEntes from '../../hooks/useFetchEntes';
import Spinner from "../../utils/Spinner";
import { urlEntes } from "../../utils/endpoints";
import SelectOpcRegsPorPag from './componentes/SelectOpcRegsPorPag';
import Paginacion from '../../utils/Paginacion';
import FiltrarData from '../../utils/FiltrarData';
import type { enteDTO } from '../../models/entes.model';
import axios, { type AxiosResponse } from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GrTooltip } from 'react-icons/gr';
import FormularioEntes from './FormularioEntes';

//Render de Tabla
const ListadoEntes = () => {
const [apiURL, setApiURL] = useState(urlEntes);  
const [pagina, setPagina] = useState(1); //Determina la página activa (porque usaremos paginación)
const [recordsPorPagina, setRecordsPorPagina] = useState(10); //Determina cuantos registros por página vamos a mostrar (por default 10)  
const [totalDeRegistros, setTotalDeRegistros] = useState(0);
const [totalDePaginas, setTotalDePaginas] = useState(0);
const [cargando, setCargando] = useState(true);
const [data, setData] = useState<enteDTO[]>([]);
const [error, setError] = useState<string | null>(null);
const [filtrar, setFiltrar]=useState(''); //Recibe Indicación de Filtrar o no filtrar para decidir cual formato de apiUrl utilizar.
const [showModal, setShowModal] = useState(false);
const [accion, setAccion] = useState<'agregar' | 'editar'>('agregar');


useEffect(() => {
  // Actualiza apiURL basado en filtrar
  if (filtrar.trim() !== '') {
    //console.log('Cambio detectado Con Filtro:');
    //const nuevaURL = `${urlEntes}`;    
    setApiURL(urlEntes+'/filtrarDataPag/'+filtrar);        
  } else {
    setApiURL(urlEntes); // URL sin filtro
    console.log('Url base; no filtra data');
  }
  traerData;
  setPagina(1); // Resetear a página 1 cuando cambia el filtro
}, [filtrar]); // Se ejecuta cuando filtrar cambia


useEffect(()=>{
 traerData();
},[pagina, recordsPorPagina,apiURL])

  
const traerData = async () => {
  // Construye la URL base con o sin filtro
  let urlBase = apiURL;
  if (filtrar.length > 0) {
  }

  // Parámetros de paginación a la url base
  const urlFinal = `${urlBase}?pagina=${pagina}&recordsPorPagina=${recordsPorPagina}`;  
  try {
    const response: AxiosResponse<enteDTO[]> = await axios.get(urlFinal);
    const totalData = parseInt(response.headers["cantidadtotalregistros"],10);
    
    setTotalDeRegistros(totalData);
    setTotalDePaginas(Math.ceil(totalData / recordsPorPagina));
    setData(response.data);

    console.log({
      totalRegistros: totalData,
      totalPaginas: Math.ceil(totalData / recordsPorPagina),
      paginaActual: pagina
    });

  } catch (error) {
    console.error('Error al obtener datos:', error);
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
  

  function handleBorrar(id: number): void {
    throw new Error('Function not implemented.');
  }


  function abrirFormulario(accion: string) {
    console.log(`Acción: ${accion}`)
    setShowModal(true);
  }

  return (
    <>
    {/* Renderiza la tabla */}     

            <button className='btn btn-primary mb-1'
            onClick={()=>{
              setAccion('agregar');
              setShowModal(true);              
            }}
            >
             Agregar nuevo  
            </button>    

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
        <FiltrarData 
          setFiltrar={setFiltrar}
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
                      <button className="btn btn-sm btn-outline-primary my-btn-compact"
                        onClick={() => handleEditar(ente.id)}> 
                        <FaEdit className="me-1" /> </button> 
                      <span/>
                    
                      <button className="btn btn-sm btn-outline-danger my-btn-compact"
                      onClick={() => handleBorrar(ente.id)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-custom-class="custom-tooltip"                
                      title={`Borrar registro ${ente.id}`}                                       
                      > 
                      <FaTrash className="me-1" /> 
                      </button>    

                      
                    </td>
                   </tr>
                  ))}
            </tbody>
            </table>

            <code>Total de Registros: {totalDeRegistros} {filtrar && ` filtrando por: ("${filtrar}")`}               
            </code>
            <div>
            </div>
            
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

      {/* Modal */}
      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div 
            className="modal-dialog" 
            style={{ 
              width: '30%',
              minWidth: '300px', // Para que no se haga muy pequeño
              maxWidth: '500px', // Máximo ancho
              margin: 'auto',
              height: '70vh', // 70% del viewport height
              marginTop: '15vh' // Centrado vertical
            }}
          >
            <div className="modal-content" style={{ height: '100%' }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {accion === 'agregar' ? 'Agregar nuevo' : 'Editar'}
                </h5>
                <button 
                  type="button" 
                  className="close" 
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ overflowY: 'auto' }}>
                <FormularioEntes
                  accion={accion}
                  onClose={() => setShowModal(false)} 
                  show={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default ListadoEntes;
