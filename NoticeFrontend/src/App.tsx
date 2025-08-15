import { useState } from "react";

const App = ({ username = "Carlos" }) => {

    //Arreglo de Objetos
    const opcionesList=[
            { clave: 0, valor: "0 Cero 0" },
            { clave: 1, valor: "1 Uno 1" },
            { clave: 2, valor: "2 Dos 2" },
            { clave: 3, valor: "3 Tres 3" },
            { clave: 4, valor: "5 Cuatro 4" },
            { clave: 5, valor: "5 Cinco 5" },
            { clave: 6, valor: "6 Seis 6" }
          ]


    //Si el fomulario está abriendo (crear) el clave es nulo
    const [opcionDefault,setOpcionDefault]=useState(5);

  return (
    <>
      <div className="container-fluid">Hola {username}
      <p>Formulario para Editar registros</p>
      </div>
      <hr />

      <p/>
      
      <div>

        <select 
            className="form-select" 
            id="floatingSelect"  
            aria-label="Floating label select ejemplo"
            value={opcionDefault}
            //Modifica la variable de estado
            onChange={(e) => setOpcionDefault(Number(e.target.value))}                        
            >
          <option value={""}>Lista de Opciones</option>
            {opcionesList.map((opcionesList) => ( //Esto rellena el combo de opciones
            <option 
                key={opcionesList.clave}    
                value={opcionesList.clave}                
            >
            {opcionesList.valor}
            </option>
            ))}
        </select>
        
      </div>
    </>
  );
};
export default App;
