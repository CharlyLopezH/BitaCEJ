import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndiceEntes from '../src/app/entes/IndiceEntes'
import './Styles.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <IndiceEntes/>
  </StrictMode>,
)
