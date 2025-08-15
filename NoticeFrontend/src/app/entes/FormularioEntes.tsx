import { Field, Form, Formik } from "formik";

const FormularioEntes = (props:FormularioEntesProps) => {

 

    return (
   <>
   <h5>{props.accion}</h5>     
   <Formik initialValues={{
            nombre:'',
            tipo:''
   }} 
   onSubmit={values=>{console.log(values)}}
   >
   <Form>
    <div className="form-group">
      <label htmlFor="nombre" className="form-label mb-0">Nombre *</label>
      <Field name="nombre" className="form-control"/>

      <label htmlFor="tipo" className="form-label mt-2 mb-0">Tipo *</label>
      <Field name="tipo" className="form-control"/>
      {/* <button className="btn btn-success mt-1">Salvar</button> */}
    </div>

    <hr/>

    <div className="mt-auto pt-1"> {/* mt-auto y padding-top para separación */}
    <div className="d-flex justify-content-end gap-2">
      <button type="button" className="btn btn-secondary">
        Cancelar
      </button>
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </div>
  </div>
   </Form>
   </Formik>   

   </>
    )

}

export default FormularioEntes

interface FormularioEntesProps {
    show:boolean;
    accion: 'agregar'| 'editar';
    onClose: () => void;    
}

