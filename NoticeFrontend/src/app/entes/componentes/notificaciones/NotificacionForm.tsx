import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import type { crearNotificacionDTO } from "../../../../models/notificaciones.model";
import "../../../../Styles.css";
import { format as dateFnsFormat } from "date-fns";

const NotificacionForm = (props: notificacionFormProps) => {
  //console.log("Entrando a NotificacionForm:", props.onSubmit.toString()); // ← Sin llaves extra
  const formatMesNumero = (date: Date) => {
    return dateFnsFormat(date, "dd-MM-yyyy");
  };

  // Valores iniciales del formulario
  const initialValues: crearNotificacionDTO = {
    oficioMemo: "prb001",
    fechaBitacora: formatMesNumero(new Date()),
    destinatario: "Juan Antonio Pérez Pérez",
    notificador: "Anselmo Quintanilla",
    expedienteAsunto: "17/2023-S02SEA",
    fechaAcuse: formatMesNumero(new Date()),
    fechaRegistro: formatMesNumero(new Date()),
    capturo: "CapturadorEnTurno",
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    oficioMemo: Yup.string().required("* Oficio/Memo es un dato requerido"),
    fechaBitacora: Yup.date().required("La fecha de bitácora es información requerida").typeError('Formato incorrecto de fecha'),
    destinatario: Yup.string().required("El destinatario es requerido"),
    notificador: Yup.string().required("El notificador es requerido"),
    expedienteAsunto: Yup.string().required("El expediente del asunto es requerido"
    ),
    fechaAcuse: Yup.date().required("La fecha de acuse es requerida").typeError("Error en el formato"),
    fechaRegistro: Yup.date().required("La fecha de registro es requerida"),
    capturo: Yup.string().required("La persona que capturó es requerida"),
  });

  return (
    <>
      <div>
        {/* <h5> Formulario para creación de registro de bitácora</h5> */}
      </div>
      <hr className="mt-0" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={valores=>{
          console.log(`Recibiendo estos Valores, preparado para Salvar: ${{valores}}`, JSON.stringify(valores, null, 2));  
          props.onHandleSubmit(valores);        
        }}
        
      >
        <Form>
          <div className="form-group">
            {/* Oficio */}
            <label htmlFor="oficioMemo" className="my-label">
              Número de Oficio/Memo:
            </label>
            <Field
              id="oficioMemo"
              className="form-control border border-primary shadow-sm rounded"
              name="oficioMemo"
            />
            <ErrorMessage name="oficioMemo" component="div"  className="text-danger fs-8"
            />

            {/* Fecha de notificación*/}
            <div className="mt-3">
              <label htmlFor="fechaBitacora" className="my-label">
                Fecha de notificación:
              </label>
              <Field name="fechaBitacora" id="fechaBitacora" className="form-control border border-primary shadow-sm rounded" 
              />
              <ErrorMessage name="fechaBitacora" component="div" className="text-danger fs-8"/>
            </div>

          {/* Destinatario */}
          <div className="mt-3">
            <label htmlFor="destinatario" className="my-label mt-8">
              Nombre del destinatario:
            </label>
            <Field
              id="destinatario"
              className="form-control border border-primary shadow-sm rounded"
              name="destinatario"
            />
            <ErrorMessage name="destinatario" component="div" className="text-danger fs-8"/>
            </div>


            {/* Notificador */}
            <div className="mt-3">
            <label htmlFor="notificador" className="my-label mt-8">
              Notificador:
            </label>
            <Field
              id="notificador"
              className="form-control border border-primary shadow-sm rounded"
              name="notificador"
            />
            <ErrorMessage name="notificador" component="div" className="text-danger fs-8"/>
            </div>

            {/* Expediente */}
            <div className="mt-3">
            <label htmlFor="expedienteAsunto" className="my-label mt-8">
              Expediente:
            </label>
            <Field
              id="expedienteAsunto"
              className="form-control border border-primary shadow-sm rounded"
              name="expedienteAsunto"
            />
            <ErrorMessage name="expedienteAsunto" component="div" className="text-danger fs-8"/>
            </div>


            {/* Fecha de Acuse*/}
            <div className="mt-3">
              <label htmlFor="fechaAcuse" className="my-label">
                Fecha de acuse:
              </label>
              <Field name="fechaAcuse" id="fechaAcuse" className="form-control border border-primary shadow-sm rounded" 
              />
              <ErrorMessage name="fechaAcuse" component="div" className="text-danger fs-8"/>
            </div>
            <hr className="mb-0"/>
          </div>
        <button className="btn btn-success m-2" type="submit">Salvar</button>
        <button className="btn btn-danger">Cancelar</button>          
        </Form>
      </Formik>
    </>
  );
};
export default NotificacionForm;

interface notificacionFormProps {
  onHandleSubmit: (values: crearNotificacionDTO) => void;
}
