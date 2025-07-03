import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltroEntesString=()=>{
const [searchTerm, setSearchTerm] = useState('');
const [isSearching, setIsSearching] = useState(false);


  // Efecto para sincronizar con props externas
  // useEffect(() => {
  //   setSearchTerm(props.cadenaString || '');
  // }, [props.cadenaString]);


    // Debounce para evitar múltiples búsquedas al escribir
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (searchTerm.trim().length > 1) {
  //       handleSearch();
  //     } else if (searchTerm.trim().length === 0) {
  //       handleReset();
  //     }
  //   }, 100); // 10ms de delay
  //       return () => clearTimeout(timer);
  // }, [searchTerm]);

console.log('Entrando al componente Filtrar..... handle Search')
  const handleSearch = () => {    
    if (searchTerm.trim().length > 1) {
      setIsSearching(true);
      console.log(`Buscar término, actualizar render de tabla con el string ${searchTerm}`);
      //props.onSearchChange(searchTerm); // Notificar al padre que se ejecuta el onSearch
    }
  };


  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
    //props.onSearchChange(''); // Notificar al padre que se limpió la búsqueda
  };


   const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      //e.preventDefault();
      //handleSearch();
    }
  };


  const handleReset = () => {
    handleClear();
  };

  return (
    <form onSubmit={() => { handleSearch(); }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          style={{fontFamily:'Roboto', fontSize:'small'}}
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          //onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-outline-success"
          style={{paddingTop:0, paddingBottom:0}}
          type="button"
          onClick={handleSearch}
          disabled={searchTerm.trim().length < 2}
        >
          <FaSearch />
        </button>
        {searchTerm && (
          <button
            className="btn btn-outline-secondary"
            style={{paddingTop:0, paddingBottom:0}}
            type="button"
            onClick={handleReset}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  );

}

export default FiltroEntesString;

interface FiltroEntesStringProps {
    //cadenaString:string    
    //onSearchChange: (searchTerm: string) => void; //Callback componente padre
}



