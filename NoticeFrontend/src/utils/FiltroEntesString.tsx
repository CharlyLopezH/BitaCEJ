import axios from "axios";
import { useEffect, useState } from "react";
import { urlEntes } from "./endpoints";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltroEntesString=(props:FiltroEntesStringProps)=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {    
    if (searchTerm.trim().length > 1) {
      setIsSearching(true);
      // Filtrar localmente
      // const resultados = data.filter(ente => 
      //   Object.values(ente).some(
      //     value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      //   )
      //);
      
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
    //onSearch(null);
  };

  useEffect(()=>{
    //axios.get(`${urlEntes}/todos`)
    console.log(`${ urlEntes }/todos`);
  },[])
    
  const handleKeyDown=()=>{
    throw new Error("Function not implemented.");
  }

  const handleReset = async () => {
    setSearchTerm('');
    await props.fetchData();
  };

    return(

      <form onSubmit={handleSearch}>
      <div className="input-group">
      <input
        type="text"
        className="form-control"
        style={{fontFamily:'Roboto', fontSize:'small'}}
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
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
        style={{
          paddingTop:0, 
          paddingBottom:0 }}
          type="button"
          onClick={handleReset}
        >
          <FaTimes />
        </button>
      )}
    </div>
        </form>
      



    // <div className="">
    //     <form onSubmit={handleSearch}>
    //       <div className="input-group">
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Buscar en todos los campos (mín. 2 caracteres)..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           minLength={2}
    //         />
    //         <button 
    //           className="btn btn-outline-secondary"
    //           type="submit"
    //           disabled={searchTerm.trim().length < 2}
    //         >
    //           <i className="bi bi-search"></i> Buscar
    //         </button>
    //         {isSearching && (
    //           <button 
    //             className="btn btn-outline-danger"
    //             type="button"
    //             onClick={handleClear}
    //           >
    //             <i className="bi bi-x-circle"></i> Limpiar
    //           </button>
    //         )}
    //       </div>
    //     </form>
    //   </div>
  );
}

export default FiltroEntesString;

interface FiltroEntesStringProps {
    cadenaString:string
    fetchData: () => Promise<any[]> | any[];
}



