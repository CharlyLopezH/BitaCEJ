import axios from "axios";

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      return errorData.message || errorData.title || `Error del servidor (${status})`;
    } else if (error.request) {
      return 'No se pudo conectar con el servidor';
    } else {
      return 'Error en la configuración de la solicitud';
    }
  }
  return 'Error inesperado al procesar la solicitud';
};
