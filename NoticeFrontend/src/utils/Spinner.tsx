import { useEffect } from 'react';
import reactLogo from '../../src/assets/loadingbb.svg';

const Spinner=()=>{


      return (
        <div className="div-center">
          <img src = {reactLogo}
          className="logo react spinner" 
          //style={{ height: '3em' }} 
          />
        </div>
    )
}
export default Spinner

