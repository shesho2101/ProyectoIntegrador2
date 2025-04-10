import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacto from "./Contacto";
import "./index.css";
import Inicio from "./Inicio";
import Login from "./Login";
import Nosotros from "./Nosotros";
import Registro from "./Registro";
import Vuelos from "./vuelos";
import Detalles from "./Detalles";
import Recibos from "./Recibos";
import InformacionHab from "./InfoHabitaciones";
import Perfil from "./Perfil";


// 📌 Verifica que "root" existe antes de usarlo
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No se encontró el elemento con id='root'");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vuelos" element={<Vuelos />} />
        <Route path="/detalles" element={<Detalles />} />
        <Route path="/recibos" element={<Recibos />} />
        <Route path="/habitacion" element={<InformacionHab />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
