import { type ChangeEvent } from "react";

const SelectOpcRegsPorPag=(props:SelectOpcRegsPorPagProps)=>{


  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(event.target.value, 10);
        props.onChangeRecords(newValue);
    if (props.resetPage) props.resetPage(); // Resetear página si existe la función
  }

return(
      <div className="my-select-recs-pagina">
        <label className="my-label">Registros Por Página:</label>
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
  //onChange(value: number): void;
  defaultValue:number
  opciones: number[]
  onChangeRecords: (value: number) => void;
  resetPage?: () => void;
}