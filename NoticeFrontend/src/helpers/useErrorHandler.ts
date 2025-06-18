// hooks/useErrorHandler.ts
import { useState } from "react";
import axios from "axios";

const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown): void => {
    let errorMessage = "Error desconocido";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data.message || "Sin detalles"}`;
      } else if (error.request) {
        errorMessage = "El servidor no respondió. Verifica tu conexión.";
      } else {
        errorMessage = `Error en la petición: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    setError(errorMessage);
    console.error("Error capturado:", error);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};

export default useErrorHandler;