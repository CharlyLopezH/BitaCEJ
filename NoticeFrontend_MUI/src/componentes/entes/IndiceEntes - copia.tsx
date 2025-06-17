import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import type { enteDTO } from "../../models/entes.model";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState, type SetStateAction } from "react";
import { Delete, Edit } from "@mui/icons-material";
import MyCustomPagination from "../visuales/MyCustomPagination";
import MySelectorRecords from "../visuales/MySelectorRecords";
import BuscadorEntes from "./BuscadorEntes";
import { urlEntes } from "../../utils/endpoints";
const [isSearching, setIsSearching] = useState(false);


const IndiceEntes=()=>{

  const [data, setData] = useState <enteDTO[]> ([]);
  const [cargando, setCargando] = useState(true);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(25); // Filas por página por defecto
  const [pagina, setPagina] = useState(1); // Página actual (base 0)
  const [totalRecords,setTotalRecords] = useState(0);

    //Variables de estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el input

  const handleRecordsChange = (newValue: SetStateAction<number>) => {
  setRecordsPorPagina(newValue); // Mantienes tu estado actual
  setPagina(1); // Resetear página
  setSearchTerm(''); // Limpiar búsqueda
};

  

  
        
  //Memorización de la función que ejecuta el request get para recuperación de datos por medio de callback
  const fetchInitialData = async()=>{
        try {    
        //const response: AxiosResponse<enteDTO[]> = await axios.get('https://localhost:7015/entes',{
          const response: AxiosResponse<enteDTO[]> = await axios.get(
            urlEntes,{
           params: {
             pagina: pagina,recordsPorPagina
           }
        });  
        console.log(urlEntes,'UrlEntes');
        console.log(`Haciendo el Get Respuesta: ${JSON.stringify(response.data, null, 2)}`);    
        console.log("Total de algo:", response.data); // Verifica aquí
      //Siendo la Respuesta correcta, sin errores... Carga la variable de estado (estructura enteDTO)
        setData(response.data);
      // ¡Cálculo de total de páginas aquí! 
        const totalDeRegistros = parseInt(response.headers["cantidadtotalregistros"],10);
        setTotalRecords(totalDeRegistros);

      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
        } catch (error) {
        // Manejo de errores
        if (axios.isAxiosError(error)) {
          console.error('Error de Axiossssss:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data
          });
          
          if (error.response) {
            // El servidor respondió con un código de error
            console.error('Error del servidor:', error.response.data);
          } else if (error.request) {
            // La petición fue hecha pero no hubo respuesta
            console.error('No hubo respuesta del servidor');
          } else {
            // Error al configurar la petición
            console.error('Error al configurar la petición:', error.message);
          }
        } else {
          console.error('Error inesperado:', error);
        }
      } finally {
        setCargando(false);
      }
    };
    useEffect(()=>{
    fetchInitialData();
    },[pagina,recordsPorPagina ])

    
    function handleEdit(id: number): void {
      throw new Error("Function not implemented.");
    }
    
    function handleDelete(id: number): void {
      throw new Error("Function not implemented.");
    }
          
if (cargando) return <div>Cargando...</div>;
 // Función de búsqueda (con tipado AxiosResponse) ** Función de búsqueda
  const handleSearch = async () => {
    setIsSearching(true); // Activar carga
    if (searchTerm.trim().length < 1) return; //Si el string de búsqueda no tiene por lo menos dos caracteres no hace la búsqueda
    try { 
      const response: AxiosResponse<enteDTO[]> = await axios.get(
        `${urlEntes}/buscarRegistros/${searchTerm}`
        //{ params: { cadena: searchTerm } }
      );
      setData(response.data);
      setTotalDePaginas(1); // Resetear paginación durante búsqueda
    } catch (error) {
      console.error("Error al buscar:", error);
    } finally {
      setIsSearching(false); // Desactivar carga
    }
  };

    return(
    <>
    <Box sx={{ width: '100%' }}>
          <Box>
           <Paper variant="compact">
            <Typography variant="h3">Índice de Entes</Typography>
            </Paper>
           </Box>
           {/* Aquí va el código para renderizar la tabla de Entes */}

 {/* Selector de Cantidad de registros por página - Ancho fijo */}
<Box sx={{  display: 'flex',  alignItems: 'center',  width: '100%',  gap: 1, mb: 2}}>
     {/* Selector (20% del ancho) */}
  <Box sx={{ 
    width: '10%',
    minWidth: '180px', // Ancho mínimo para evitar compresión
    '& .MuiFormControl-root': {
      width: '100%' // Fuerza al selector a ocupar el 100% del contenedor
    }
  }}>
    <MySelectorRecords 
      defaultValue={recordsPorPagina}
      //onChange={setRecordsPorPagina} anterior
      onChange={handleRecordsChange}
      setPagina={setPagina}      
    />
  </Box>
    {/* Buscador (80% del ancho) */}
  <Box sx={{ 
    width: '90%',
    '& .MuiTextField-root': {
      width: '100%' // Fuerza al TextField a ocupar el 100% del contenedor
    }
  }}>
      <BuscadorEntes 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onHandleSearch={handleSearch}
        fetchData={fetchInitialData}
        loading={isSearching}
      />
    </Box>
  </Box>    

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de datos">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NOMBRE</TableCell>
            <TableCell>TIPO</TableCell>       
            <TableCell align="center" sx={{ width: '150px' }}>ACCIONES</TableCell>     
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.tipo || 'No especificado'}</TableCell>  
                       <TableCell align="center" sx={{ padding: '8px' }}>
            <Tooltip title="Editar">
              <IconButton 
                color="primary"
                onClick={() => handleEdit(row.id)}
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                  margin: '0 8px'
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton 
                color="error"
                onClick={() => handleDelete(row.id)}
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.08)' },
                  margin: '0 4px'
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

        {/* Buscador - Debe Ocupar el espacio restante */}

{/* Paginación */}

<Typography  variant="paginationDisplay" component="div"  sx={{ display: 'grid',  gridTemplateColumns: '1fr auto', gap: 2,  width: '100%', alignItems: 'center', }}>
  {/* Columna izquierda */}
  <Box>
    Página: 
    <Box component="span" sx={{ fontWeight: 'bold', mx: 0.5 }}>{pagina}</Box>
    de
    <Box component="span" sx={{ fontWeight: 'bold', ml: 0.5 }}>{totalDePaginas}</Box>
  </Box>

  {/* Columna derecha */}
  <Box sx={{ justifySelf: 'end' }}>
    Total de Registros: 
    <Box component="span" sx={{ fontWeight: 'bold', ml: 0.5 }}>{totalRecords}</Box>
  </Box>
</Typography>

      <MyCustomPagination 
          paginaActual={pagina}
          cantidadTotalDePaginas={totalDePaginas}
          radio={3}
          onChange={(nuevaPagina) => setPagina(nuevaPagina)} 
      />

     </Box>
    </>
    );
}
export default IndiceEntes