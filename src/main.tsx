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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
