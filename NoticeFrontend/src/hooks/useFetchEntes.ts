// hooks/useFetchEntes.ts
import { useState, useEffect } from "react";
import axios, { type AxiosResponse} from "axios";
import reactLogo from '../../src/assets/loadingbb.svg';

import type { enteDTO } from "../models/entes.model"; // Ajusta la ruta según tu estructura

const useFetchEntes = (urlEntes: string, 
                      pagina: number, 
                      recordsPorPagina: number) =>  {
  const [data, setData] = useState<enteDTO[]>([]);
  const [totalDeRegistros, setTotaDeRegistros] = useState(0);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = async () => {
    try {
      const response: AxiosResponse<enteDTO[]> = await axios.get(urlEntes, {
        params: { pagina, recordsPorPagina },
      });

      console.log(`Respuesta: ${JSON.stringify(response.data, null, 2)}`);

      const totalDeRegistros = parseInt(
        response.headers["cantidadtotalregistros"],
        10
      );
      setTotaDeRegistros(totalDeRegistros);
      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
      setData(response.data);

    } catch (error) {
    } finally {
      //Si no hubo un error entonces manda la instrucción de que la variable de estado del componente padre se apague
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [pagina, recordsPorPagina]);

  return { data, totalDeRegistros, totalDePaginas, cargando, error };
};

export default useFetchEntes;