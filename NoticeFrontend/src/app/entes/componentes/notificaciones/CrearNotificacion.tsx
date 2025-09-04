import { useRef, useState } from "react";
import axios from "axios";
import NotificacionForm from "./NotificacionForm";
import type { crearNotificacionDTO } from "../../../../models/notificaciones.model";
import { urlNotificaciones } from "../../../../utils/endpoints";
import {convertirFechaAISO} from "../../../../utils/utilerias"
import Swal from "sweetalert2";
import { handleApiError } from "../../../../utils/errorhandler";
import type { FormikProps } from "formik";

const CrearNotificacion=()=> {

  // Variables de estado manejar loading y mensajes de retroalimentación
  const [loading, setLoading] = useState(false);
    // 1. Crear la referencia con useRef
  const formikRef = useRef<FormikProps<crearNotificacionDTO>>(null);

  //Función que ejecuta la inserción de registros en la DB
  const handleSubmit = async (values: crearNotificacionDTO) => {
    setLoading(true);
    try {
      const datosAEnviar = {
      ...values,
      fechaBitacora: convertirFechaAISO(values.fechaBitacora),
      fechaAcuse: convertirFechaAISO(values.fechaAcuse),
      fechaRegistro: convertirFechaAISO(values.fechaRegistro)
    };
    //console.log('📤 Datos a enviar:', datosAEnviar); check
        // Envío usando Axios
    const response = await axios.post(urlNotificaciones, datosAEnviar, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 10 segundos de timeout
    });
    // ✅ Success
    //console.log('Respuesta del servidor:', response.data);
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Notificación agregada',
      showConfirmButton: false,
      timer: 2000
    }).then (()=>{
              // 2. Usar la ref para resetear el formulario después del éxito
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
    });
    return response.data;

  } catch (error) {
  const errorMessage = handleApiError(error);
  Swal.fire('Error', errorMessage, 'error');
  throw error;
  } finally {
    setLoading(false);
  }
};

  return(
    
    <>
    <div className="container">
      <h5>
        Crear Nueva Notificación
      </h5>      
      <NotificacionForm 
          onHandleSubmit={handleSubmit}
          loading={loading}       
          formRef={formikRef}    
        />

    </div>
    </>
  )
}
  
export default CrearNotificacion;