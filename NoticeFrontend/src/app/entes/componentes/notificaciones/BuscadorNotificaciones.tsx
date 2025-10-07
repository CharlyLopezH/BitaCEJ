//Render del componenten de búsqueda, no realiza procesos
const BuscadorNotificaciones=(props: BuscadorNotificacionesProps)=>{



  // 📢 Ejecuta la búsqueda cuando se hace clic en el botón
  const handleBuscar = () => {
    if (props.searchTerm.trim() !== "") {
      console.log(`Ejecutando búsqueda con término: ${props.searchTerm}`);
      props.ejecutarBusquedaCadena(props.searchTerm); // 🔥 dispara la búsqueda
    } else {
      console.log("No se puede buscar, el término está vacío");
    }
  };

  // 🔹 Maneja el cambio de texto en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearchTermChange(e.target.value);
  };

    const handleCancelar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.onSearchTermChange(""); // Limpia input
  };


    return ( 
    <div className="notification-search container">
            <div className="search-input-group">
                <input
                    type="text"
                    className="search-input"
                    value={props.searchTerm}
                    onChange={handleChange}                    
                    placeholder="Buscar..."
                />
                
                <div className="search-buttons">
                    <button 
                        //onClick={()=>props.onSearchTermChange(props.searchTerm)}
                        onClick={handleBuscar}                        
                        disabled={!props.searchTerm.trim()}
                        className="search-btn"                                                
                    >
                        🔍  
                    {/* <FaSearch className="btn-icon" /> */}
                    </button>
                    
                    <button 
                        onClick={handleCancelar}
                        disabled={!props.searchTerm}
                        className="cancel-btn"
                    >                                            
                    ❌
                    </button>
                </div>
            </div>
    </div>
    );

}


export default BuscadorNotificaciones;

interface BuscadorNotificacionesProps {
 apiUrl:string   //Url default 
 searchTerm:string 
 onSearchTermChange: (value: string) => void; 
 pagina:number
 recordsPorPagina:number
 ejecutarBusquedaCadena:(cadena:string)=>void;
}


