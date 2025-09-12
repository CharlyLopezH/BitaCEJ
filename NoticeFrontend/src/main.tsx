import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles.css'
//import IndiceEntes from './app/entes/IndiceEntes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CrearNotificacion from './componentes/notificaciones/CrearNotificacion'
import IndiceNotificaciones from './app/entes/componentes/notificaciones/IndiceNotificaciones'


createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <BrowserRouter>  
  {/* Encabezado del Proyecto */}
    <div className="container bg-my-header">
      Control de Bitácora de Notificaciones 
    </div>
      <Routes>
      {/* <Route index element={<CrearNotificacion/>} /> */}
      {/* Se establece ruta (index) por defecto */}
      <Route index element={<IndiceNotificaciones/>} />
         {/* Esta es una nueva ruta; se accede con url/crear */}
    <Route path="/notificaciones/crear" element={<CrearNotificacion/>} />
    </Routes>
  </BrowserRouter>
</StrictMode>
)
