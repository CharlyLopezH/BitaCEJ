//Decoración de pontalla modal para el formulario entes
import type { ReactNode } from "react";
import FormularioEntes from "../FormularioEntes";

const EntesModalForm = (props:EntesModalForm) => {

if (!props.showModal) return null;
const title = props.modalTitle || (props.accion === 'agregar' ? 'Registro de un nuevo Ente' : 'Editar Ente');
//props.customCloseIcon=<i className="bi bi-x-circle fs-4"></i>

return (
    <div className={`modal fade show modal-show-custom ${props.className}`}>
      <div className="modal-dialog-custom">
        <div className="modal-content modal-content-custom">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="close" 
              onClick={() => props.setShowModal(false)}
              aria-label="Cerrar"
            >
                {/*Icono cerrar del formulario Modal para Editar Entes  */}
              <i className="bi bi-x-circle"></i> 
            </button>
          </div>
          <div className="modal-body" style={{ overflowY: 'auto' }}>
            {props.children || (
              <FormularioEntes
                accion={props.accion}
                onClose={props.cerrarVentana}
                show={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

};
export default EntesModalForm

interface EntesModalForm {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  accion: 'agregar' | 'editar';
  cerrarVentana: () => void;
  children?: ReactNode;
  customCloseIcon?: ReactNode;
  modalTitle?: string;
  className?: string;
}