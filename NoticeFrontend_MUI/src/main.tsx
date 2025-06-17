import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import customTheme from "../theme/customTheme.ts";
import './index.css'
import App from './App.tsx'
import IndiceEntes from "./componentes/entes/IndiceEntes.tsx";
import FormEntes from "./componentes/entes/FormEntes.tsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";


createRoot(document.getElementById("root")!).render(
  
  <BrowserRouter>
        <ThemeProvider theme={customTheme}>
        <Routes>
          <Route path="/" element={<IndiceEntes/>} /> {/* ✅ Ruta válida */}
          <Route path="/entes/crear/" element={<FormEntes nombre={""} tipo={""} />} />
          {/* <Route path="/entes/editar/:id" element={<FormEntes />} />  */}
        </Routes>
       </ThemeProvider>
    </BrowserRouter>  
);
