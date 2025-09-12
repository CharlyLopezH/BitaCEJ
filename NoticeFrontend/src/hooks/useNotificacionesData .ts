//Hook personalizado para obtener un response de la data de un API
import { useEffect, useState} from "react";

//Debe retornar algo así-->> https://localhost:7015/notificaciones?pagina=1&recordsPorPagina=10
const useNotificacionesData=(props: useNotificacionesDataProps)=>{

    //const [valor,setValor] = useState('');

    useEffect(()=>{
        recuperarData();
    },[])




const recuperarData=()=> {
    console.log("Dentro de recuperar data enviada: "+props.apiURL);
    return(props);
   
}

return ('Regresando: '+props.apiURL);

}




export default useNotificacionesData; 

interface useNotificacionesDataProps {
 apiURL:string,
}




