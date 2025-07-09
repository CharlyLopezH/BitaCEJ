import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltrarData=(props:FiltrarDataProps)=>{

const [searchTerm, setSearchTerm] = useState('');
//const [isSearching, setIsSearching] = useState(false);

const [inputValue, setInputValue] = useState('');

//console.log(`Clicando Filtrar buscaré: ${inputValue} )(modificaré url base *responder con instrucción al componente padre*)`);
  const handleFiltrar = () => {
    props.setFiltrar(inputValue); // ¡Aquí se modifica el estado del padre!
  };


 const handleClear = () => {
    setSearchTerm('');    
    props.setFiltrar('');
    setInputValue('');    
  };

return (
    <form >
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          style={{fontFamily:'Roboto', fontSize:'small'}}
          placeholder="Filtrar..."
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
           onKeyDown={(e) => {
          if (e.key === 'Enter') { //Controla el enter en el input text
            e.preventDefault(); // Previene el comportamiento por defecto del formulario
            handleFiltrar();
          }
        }}
        />
        <button
          className="btn btn-outline-success"
          style={{paddingTop:0, paddingBottom:0}}
          type="button"
          onClick={handleFiltrar}
          disabled={inputValue.trim().length < 2}
        >
          <FaSearch />
        </button>
        {inputValue && (
          <button
            className="btn btn-outline-secondary"
            style={{paddingTop:0, paddingBottom:0}}
            type="button"
            onClick={handleClear}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  );

}

export default FiltrarData;

interface FiltrarDataProps {
setFiltrar:(valor: string) => void;
}