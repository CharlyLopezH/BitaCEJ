import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ListadoEntes from '../src/app/entes/ListadoEntes'
import './Styles.css'
import IndiceEntes from './app/entes/IndiceEntes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Formulario from './app/entes/componentes/Formulario'




createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <BrowserRouter>
  {/* Encabezado del Proyecto */}
    <div className="container bg-my-header">
      Sistema de Notificaciones 
      <IndiceEntes/>
    </div>
  </BrowserRouter>  
</StrictMode>,
)
