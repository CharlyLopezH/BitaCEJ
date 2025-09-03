import { useState } from "react";
import axios from "axios";
import NotificacionForm from "./NotificacionForm";
import type { crearNotificacionDTO } from "../../../../models/notificaciones.model";
import { urlNotificaciones } from "../../../../utils/endpoints";
import Swal from "sweetalert2";


const CrearNotificacion=()=> {


// Función para convertir DD-MMM-YYYY a YYYY-MM-DD
const convertirFechaAISO = (fechaDDMMYYYY: string): string => {
  if (!fechaDDMMYYYY) return new Date().toISOString().split('T')[0];
  
  // Dividir la fecha en partes: [dia, mes, anio]
  const [dia, mes, anio] = fechaDDMMYYYY.split('-');
  
  // Formatear a YYYY-MM-DD (formato ISO que .NET entiende)
  return `${anio}-${mes}-${dia.padStart(2, '0')}`;
};

  // Variables de estado manejar loading y mensajes de retroalimentación
  const [loading, setLoading] = useState(false);
  

  //Función que ejecuta la inserción de registros en la DB
  const handleSubmit = async (values: crearNotificacionDTO) => {
    try {


const datosAEnviar = {
      ...values,
      fechaBitacora: convertirFechaAISO(values.fechaBitacora),
      fechaAcuse: convertirFechaAISO(values.fechaAcuse),
      fechaRegistro: convertirFechaAISO(values.fechaRegistro)
    };

    console.log('📤 Datos a enviar:', datosAEnviar);

        // ✅ Envío usando Axios
    const response = await axios.post(urlNotificaciones, datosAEnviar, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos de timeout
    });

    // ✅ Success
    console.log('✅ Respuesta del servidor:', response.data);
        Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Notificación creada exitosamente',
      showConfirmButton: false,
      timer: 2000
    });
    
    return response.data;



  } catch (error) {
    // ✅ MOSTRAR EL ERROR REAL
// ✅ Manejo detallado de errores con Axios
    if (axios.isAxiosError(error)) {
      console.error('❌ Error de Axios:', error);
      
      if (error.response) {
        // El servidor respondió con un error (4xx, 5xx)
        const status = error.response.status;
        const errorData = error.response.data;
        
        console.error(`📋 Status: ${status}`);
        console.error('📋 Data del error:', errorData);
        
        const errorMessage = errorData.message || 
                            errorData.title || 
                            `Error del servidor (${status})`;
        
        alert(`Error: ${errorMessage}`);
        
      } else if (error.request) {
        // La request fue hecha pero no hubo respuesta
        console.error('❌ No hubo respuesta del servidor:', error.request);
        alert('Error: No se pudo conectar con el servidor');
      } else {
        // Error en la configuración de la request
        console.error('❌ Error en la configuración:', error.message);
        alert('Error: Configuración incorrecta de la solicitud');
      }
    } else {
      // Error inesperado
      console.error('❌ Error inesperado:', error);
      alert('Error inesperado al crear la notificación');
    }
    
    throw error; // Puedes relanzar el error si necesitas
  }
};

  return(
    
    <>
    <div className="container">
      <h5>
        Crear Nueva Notificación
      </h5>      
      <NotificacionForm onHandleSubmit={handleSubmit} />

    </div>
    </>
  )
}
  
export default CrearNotificacion;