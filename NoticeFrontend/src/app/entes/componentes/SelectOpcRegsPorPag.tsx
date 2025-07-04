import { type ChangeEvent } from "react";

const SelectOpcRegsPorPag=(props:SelectOpcRegsPorPagProps)=>{

  console.log('Componente de selección de cantidad de registros')

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(event.target.value, 10);
        console.log(`handleChange del componente de Seleccioanr opc newValue:  ${newValue}`);
        props.onChangeRecords(newValue);
    if (props.resetPage) props.resetPage(); // Resetear página si existe la función
  }

return(
      <div>        
        <select
          className="form-select form-select-sm"
          defaultValue={props.defaultValue}
          onChange={handleChange}
        >
          {props.opciones?.map(opcion => (
            <option key={opcion} value={opcion}>
              Mostrar {opcion}
            </option>
          ))}
        </select>
      </div>
)    
}
export default SelectOpcRegsPorPag;

interface SelectOpcRegsPorPagProps {  
  defaultValue?:number
  opciones: number[]
  onChangeRecords: (value: number) => void;
  resetPage?: () => void;
}