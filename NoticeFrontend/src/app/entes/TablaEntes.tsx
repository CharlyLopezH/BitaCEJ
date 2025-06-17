import type { AxiosResponse } from "axios";
//import type { enteDTO } from "../models/entes.model";
import type { enteDTO } from "../../../src/models/entes.model";
import { urlEntes } from "../../../src/utils/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../utils/Spinner";
//import reactLogo from './assets/react.svg'

const TablaEntes = () => {
  //Variables de estado
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1); // Página actual (base 0)
  const [recordsPorPagina, setRecordsPorPagina] = useState(25); // Filas por página por defecto
  const [totalDeRegistros, setTotaDeRegistros] = useState(0);
  const [totalDePaginas, setTotalDePaginas] = useState(0);

  //Función memorizable para lectura de datos y carga de la tabla
  const fetchInitialData = async () => {
    try {
      const response: AxiosResponse<enteDTO[]> = await axios.get(urlEntes, {
        params: {
          pagina: pagina,
          recordsPorPagina,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay artificial fijo de 2 segundos *fake delay para probar el spinner
      console.log(
        `Haciendo el Get Respuesta: ${JSON.stringify(response.data, null, 2)}`
      );

      //Calcular número de páginas
      const totalDeRegistros = parseInt(
        response.headers["cantidadtotalregistros"],
        10
      ); //Convierte string a base 10
      setTotaDeRegistros(totalDeRegistros);

      //Cuántas páginas
      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));

      //Control y manejo de errores
    } catch (error) {
      console.log(`Error al acceder al APIUrl ${error}`);

      if (axios.isAxiosError(error)) {
          console.error("Axios error:", {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
        if (error.response) {
          // El servidor respondió con un código de error
          console.error("Error del servidor:", error.response.data);
        } else if (error.request) {
          // La petición fue hecha pero no hubo respuesta
          console.error("No hubo respuesta del servidor");
        } else {
          // Error al configurar la petición
          console.error("Error al configurar la petición:", error.message);
        }
      } else {
        console.error(`Inesperado ${error}`)
      }

    } finally {
      setCargando(false);
    }
  };

  //Llamado a la función memorizada que localiza los registros del APIUrl
  useEffect(() => {
    fetchInitialData();
  }, [pagina, recordsPorPagina]);

  //Si la Variable de estado "cargando" está en true, es porque no ha llegado al finally del load...
  if (cargando) {return (<Spinner />);}

  //Cuando cargando sea false se ejecuta este return, que es el principal
  return (
    <>
      <div>
        <hr />
      </div>
    </>
  );
};
export default TablaEntes;
