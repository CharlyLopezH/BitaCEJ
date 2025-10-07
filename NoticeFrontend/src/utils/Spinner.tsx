//import imagen from '../../src/assets/loadingbb.svg';
import imagen from '../../src/assets/reactSpinner.svg';


//const Spinner=({textoCargando ='Cargando'})=>{
const Spinner=(props:SpinnerProps)=>{
      return (
        <div className="spinner-overlay">
        <div className="spinner-container">
          {/* <img src = {imagen} className="logo-react" style={{ height: '5em' }} alt='Cargando...' />                      */}
                <img 
        //src="https://cdn-icons-png.flaticon.com/512/6356/6356630.png" 
          src={imagen} 
          className="logo react"  style={{ height: '8em' }} 
          alt="Cargando..." 
        />          
          <div className="spinner-text">
          {props.mensaje}     
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>  
          </div> 
        </div>         
      </div>  
    )
}
export default Spinner

interface SpinnerProps {
  mensaje:string
}

