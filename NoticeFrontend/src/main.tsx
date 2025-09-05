import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles.css'
//import IndiceEntes from './app/entes/IndiceEntes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CrearNotificacion from './componentes/notificaciones/CrearNotificacion'


createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <BrowserRouter>  
  {/* Encabezado del Proyecto */}
    <div className="container bg-my-header">
      Bitácora de Notificaciones 
    </div>
    <Routes>
      <Route index element={<CrearNotificacion/>} />
    </Routes>
  </BrowserRouter>
</StrictMode>,
)
