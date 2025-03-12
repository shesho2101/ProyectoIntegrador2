import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacto from "./Contacto";
import "./index.css";
import Inicio from "./Inicio";
import Login from "./Login";
import Nosotros from "./Nosotros";
import Registro from "./Registro";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);