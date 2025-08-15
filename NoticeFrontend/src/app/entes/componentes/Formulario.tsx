import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { urlEntes } from "../../../utils/endpoints";
import { useEffect, useState } from "react";

const Formulario = () => {

const location = useLocation();  
const { id } = location.state || {};
const [cargando, setCargando] = useState(!!id);
const [error, setError] = useState(null);
const [encabezado, setEncabezado] = useState('Nuevo Ente');


//Inicializar variables en caso de edición
const cargarDatos = async()=>{
  try {
    const response = await axios.get(`${urlEntes}/${id}`);
    console.log('Datos recibidos para edición:', {data: response.data, valorSelect: opcionesTipo.map(op => op.valor)});

              // Inicializa los campos del formulario con los datos recibidos
      formik.setValues({
        nombre:response.data.nombre,
        tipo:response.data.tipo.trim(),     
      });
    
  } catch (err) {
    setError(error);
  } finally {
    setCargando(false);
  }
}



useEffect(()=>{  
  //console.log('UseEffect ingresando al formulario');  
  if(!id) {return}; //Significa que no hay datos para cargar; por lo tanto no es una edición
  
  //Como sí es una edición se deben cargar los datos necesarios para inicializar componentes del formulario
  setEncabezado('Editando Registro '+ (id))
  console.log(`Editando Registro Id: ${id}`);
//Llamado async para inicializar formulario  
cargarDatos();
},[id]);



interface OpcionTipo {
  valor: string;  // Valor que se almacenará (OPD, SEC, etc.)
  etiqueta: string; // Texto que se mostrará
}

const opcionesTipo: OpcionTipo[] = [
  { valor: "OPD", etiqueta: "Organismo Público Descentralizado" },
  { valor: "SEC", etiqueta: "Secretaría Ejecutiva" },
  { valor: "FIDE", etiqueta: "Fideicomiso Público" },
  { valor: "MUN", etiqueta: "Gobierno Municipal" },
  { valor: "DESC", etiqueta: "Descentralizado" },
  { valor: "VAR", etiqueta: "Otro tipo..." }
];



  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
      
  tipo: Yup.string()
    .required("Debe seleccionar un tipo de ente")
    .oneOf(
      opcionesTipo.map(opcion => opcion.valor), // Valida contra los valores (no las etiquetas)
      "Seleccione una opción válida"
    )
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      nombre: "",
      tipo: "",      
      ...(id ? { cargando: true } : {}) // Marcar que estamos cargando si hay ID
    },
    enableReinitialize: true, // ¡Importante!
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // 1. Convertir los datos a FormData
        const formData = new FormData();
        formData.append("Nombre", values.nombre); // ¡Case-sensitive!
        formData.append("tipo", values.tipo); // ¡Faltaba este campo!


      // 👇 Lógica para decidir entre POST (crear) y PUT (editar)
      const url = id ? `${urlEntes}/${id}` : urlEntes; // Si hay ID, usa endpoint específico
      const method = id ? 'put' : 'post'; // PUT para edición, POST para creación

        // 2. Enviar con Axios (sin header Content-Type manual)
        const response = await axios({
          method,
          url,
          data:formData,
          headers: { 'Content-Type': 'multipart/form-data' }, // Importante para FormData
        });

      console.log(id ? "Registro actualizado:" : "Registro creado:", response.data);
      alert(`Ente ${id ? 'actualizado' : 'creado'} correctamente`);
        console.log("Registro exitoso:", response.data);
        alert("Ente registrado correctamente");
      } catch (error) {
        //Detectando el error ** * * * *
        console.error("Error detallado:", {
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Error desconocido",
          request: axios.isAxiosError(error)
            ? error.config?.url
            : "No disponible",
          payload: values,
        });

        if (axios.isAxiosError(error)) {
          // Error específico de Axios

          if (error.code === "ECONNABORTED") {
            alert("El servidor no respondió a tiempo. Intenta nuevamente.");
          } else if (error.response) {
            // Error con respuesta del servidor (4xx/5xx)
            const { status, data } = error.response;

            if (status === 500) {
              alert(`Error: ${JSON.stringify(error.response?.data, null, 2)}`);
            }

            if (status === 401) {
              alert("No autorizado. Por favor inicia sesión.");
            } else if (status === 400 && data.errors) {
              formik.setErrors(data.errors);
            } else {
              alert(
                `Error del servidor (${status}): ${
                  data.message || "Ocurrió un error"
                }`
              );
            }
          } else if (error.request) {
            // Error de conexión (servidor inalcanzable)
            if (error.message.includes("Network Error")) {
              console.log(error.message, "Error!");
              alert(
                "No se puede conectar al servidor. Verifica: \n1. Que el backend esté corriendo\n2. Que no haya problemas de CORS\n3. Tu conexión a internet" +
                  error.message
              );
            } else {
              alert("Error de red: " + error.message);
            }
          }
        } else {
          // Error no relacionado a Axios
          alert("Error inesperado: " + (error as Error).message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const navigate = useNavigate();

    const handleClose=()=>{        
         navigate(-1); // Esto equivale a setShowModal(false)
    }

  const handleSubmit=(e: any)=>{
    console.log('Contenido del arreglo:');
  }

  console.log('urlEntes',{ urlEntes });


  if (cargando) return <div>Cargando datos...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  
  return (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-card">
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h5 className="modal-title">{encabezado}</h5>
          <button 
            type="button" 
            className="close-btn"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <i className="bi bi-x-circle"></i> 
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="modal-body">
          <form onSubmit={formik.handleSubmit}>
            {/* Campo Nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input                            
                className={`form-control ${
                  formik.touched.nombre && formik.errors.nombre ? "is-invalid" : ""
                }`}
                id="nombre"
                name="nombre"                        
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="invalid-feedback">
                  {formik.errors.nombre}
                </div>
              )}
            </div>

            {/* Campo Tipo */}
            <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>



<div className="debug-info">
  <p>Valor actual: {formik.values.tipo || ''}</p>  
</div>


<select
  id="tipo"
  name="tipo"    
  className={`form-select  ${
    formik.touched.tipo && formik.errors.tipo ? 'is-invalid' : ''
  }`}  
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.tipo || ""} // Mostrar el valor precargado    
>  
  <option value="">Selecciona un tipo de ente</option>

  {opcionesTipo.map((opcion) => (
    <option key={opcion.valor} value={opcion.valor}>
      {opcion.etiqueta}
    </option>
  ))}
</select>


  {formik.touched.tipo && formik.errors.tipo && (
    <div className="invalid-feedback">{formik.errors.tipo}</div>
  )}
 </div>

            {/* Botón de guardar */}
            <div className="modal-footer">
              <button 
                onClick={handleSubmit}
                type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};
export default Formulario;

