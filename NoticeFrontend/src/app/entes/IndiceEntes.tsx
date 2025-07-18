import { Route, Routes } from "react-router-dom";
import ListadoEntes from "./ListadoEntes";
import FormularioEntes from "./FormularioEntes";
import Formulario from "./componentes/Formulario";


const IndiceEntes=()=>{
  
return (
<>
<div className="container bg-my-header">
   Sistema Notice / Índice de Entes
</div>
<hr/>
<ListadoEntes/>
<hr/>

</>
);

}
export default IndiceEntes;