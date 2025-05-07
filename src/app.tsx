import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAlojamientos from "./administrador/AdminAlojamientos";
import AdminBus from "./administrador/BusAdmin";
import PerfilAdmin from "./administrador/PerfilAdmin";
import AdminVuelos from "./administrador/VuelosAdmin";
import Bus from "./Bus";
import Carrito from "./Carrito";
import Contacto from "./Contacto";
import Detalles from "./Detalles";
import FAQ from "./Faq";
import "./index.css";
import InformacionHab from "./InfoHabitaciones";
import Inicio from "./Inicio";
import Login from "./Login";
import Alojamientos from "./Lugares";
import Nosotros from "./Nosotros";
import Pagos from "./pagos";
import Perfil from "./Perfil";
import Recibos from "./Recibos";
import Registro from "./Registro";
import Transaccion from "./transaccion";
import Vuelos from "./vuelos";


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
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vuelos" element={<Vuelos />} />
        <Route path="/detalles" element={<Detalles />} />
        <Route path="/recibos" element={<Recibos />} />
        <Route path="/habitacion/:id" element={<InformacionHab />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/alojamientos" element={<Alojamientos />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/transaccion" element={<Transaccion />} />
        <Route path="/adminalojamientos" element={<AdminAlojamientos />} />
        <Route path="/adminperfil" element={<PerfilAdmin />} />
        <Route path="/adminvuelos" element={<AdminVuelos />} />
        <Route path="/adminbus" element={<AdminBus />} />
        <Route path="/carrito" element={<Carrito />} />



      </Routes>
    </BrowserRouter>
  </StrictMode>
);
