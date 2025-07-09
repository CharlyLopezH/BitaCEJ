
const FormularioEntes = (props:FormularioEntesProps) => {
    

    console.log('props ',{
        'show':props.show,
        'accion':props.accion,
        'onHide':props.onClose});


    return (
        <>
          <h2>Formulario para Agregar/Editar Entes</h2>
          <hr/>
            Acción: {props.accion} 
            <p/>
            Show: {props.show}
            <p/>
            onHide: {props.onClose}
    <form>
      {/* Tus campos de formulario aquí */}
      <div className="form-group">
        <label>Campo de ejemplo</label>
        <input type="text" className="form-control" />
      </div>
      
      <div className="modal-footer">
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={props.onClose}
        >
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          {props.accion === 'agregar' ? 'Agregar' : 'Guardar cambios'}
        </button>
      </div>
    </form>




        </>
    )

}

export default FormularioEntes

interface FormularioEntesProps {
    show:boolean;
    accion: 'agregar'| 'editar';
    onClose: () => void;
}
