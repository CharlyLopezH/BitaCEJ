import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ListadoEntes from '../src/app/entes/ListadoEntes'
import './Styles.css'
import IndiceEntes from './app/entes/IndiceEntes'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <IndiceEntes/>
  </StrictMode>,
)
