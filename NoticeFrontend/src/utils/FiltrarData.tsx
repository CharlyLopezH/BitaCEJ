import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltrarData=(props:FiltrarDataProps)=>{

const [searchTerm, setSearchTerm] = useState('');
//const [isSearching, setIsSearching] = useState(false);

const [inputValue, setInputValue] = useState('');

  const handleFiltrar = () => {
    props.setFiltrar(inputValue); // ¡Aquí se modifica el estado del padre!
    //console.log(`Clicando Filtrar buscaré: ${inputValue} )(modificaré url base *responder con instrucción al componente padre*)`);
  };


// const handleSearch = () => {    
//     //if (searchTerm.trim().length > 1) {
//       //setIsSearching(true);
//       console.log(`He clickado buscar; buscaré: ${searchTerm} )(modificar url base *responder con instrucción al compo padre*)`);
//       //props.onSearchChange(searchTerm); // Notificar al padre
//     //}
//   };

 const handleClear = () => {
    setSearchTerm('');
    setSearchTerm('');
    props.setFiltrar('');
    setInputValue('');
    //props.onSearchChange(''); // Notificar al padre que se limpió la búsqueda
  };

  const handleReset = () => {
    handleClear();
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
          //onKeyDown={handleInputChange}
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