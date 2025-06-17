// hooks/useFetchEntes.ts
import { useState, useEffect } from "react";
import axios, { type AxiosResponse} from "axios";
import type { enteDTO } from "../models/entes.model"; // Ajusta la ruta según tu estructura

export const useFetchEntes = (
  urlEntes: string,
  pagina: number,
  recordsPorPagina: number
) => {
  const [data, setData] = useState<enteDTO[]>([]);
  const [totalDeRegistros, setTotaDeRegistros] = useState(0);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = async () => {
    try {
      const response: AxiosResponse<enteDTO[]> = await axios.get(urlEntes, {
        params: { pagina, recordsPorPagina },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay artificial

      console.log(`Respuesta: ${JSON.stringify(response.data, null, 2)}`);

      const totalDeRegistros = parseInt(
        response.headers["cantidadtotalregistros"],
        10
      );
      setTotaDeRegistros(totalDeRegistros);
      setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
      setData(response.data);

    } catch (error) {
      console.error(`Error al acceder al API: ${error}`);
      setError("Error al cargar los datos");

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error del servidor:", error.response.data);
        } else if (error.request) {
          console.error("No hubo respuesta del servidor");
        } else {
          console.error("Error al configurar la petición:", error.message);
        }
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [pagina, recordsPorPagina]);

  return { data, totalDeRegistros, totalDePaginas, cargando, error };
};