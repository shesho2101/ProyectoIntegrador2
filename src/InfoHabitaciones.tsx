import React from "react";
import {
  FaStar,
  FaUserCircle,
  FaInfoCircle,
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";
import Logo from "./imagenes/Logo(sin fondo).png";

export default function Loft(): JSX.Element {
  return (
    <div className="font-sans bg-white min-h-screen flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src={Logo} alt="Logo de Wayra" className="h-10" />
        <div className="flex space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <FaStar />
            <span>Favoritos</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaUserCircle />
            <span>Iniciar Sesión</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaInfoCircle />
            <span>Nosotros</span>
          </div>
          <FaBars />
        </div>
      </nav>

      {/* Espaciador del header */}
      <div className="h-20" />

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Loft frente a la playa Cartagena, Colombia
        </h1>

        {/* Galería de imágenes */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="col-span-1 row-span-2">
            <img
              src="https://placehold.co/300x300/eeeeee/333333?text=Loft+Interior"
              alt="Loft interior"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="col-span-1">
            <img
              src="https://placehold.co/300x150/eeeeee/333333?text=Beach+View"
              alt="Vista playa"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img
              src="https://placehold.co/150x150/eeeeee/333333?text=Beach+Night"
              alt="Playa noche"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src="https://placehold.co/150x150/eeeeee/333333?text=Bathroom"
              alt="Baño moderno"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <h2 className="font-medium text-lg mb-2">Descripción del alojamiento</h2>
          <p className="text-sm text-gray-700 mb-4">
            Un paraíso costero, este alojamiento frente a la playa combina lujo y tranquilidad en un entorno de ensueño.
            Ubicado a pasos del mar cristalino y la arena dorada.
          </p>
          <p className="text-sm text-gray-700">
            La decoración mezcla elegancia y confort, con muebles de madera, textiles suaves y toques inspirados en el mar.
          </p>
        </div>

        {/* Servicios */}
        <div className="mb-6">
          <h2 className="font-medium text-lg mb-3">Servicios que ofrecemos</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["fas fa-wifi", "Wifi"],
              ["fas fa-paw", "Mascotas"],
              ["fas fa-coffee", "Desayuno"],
              ["fas fa-smoking", "Fumar"],
              ["fas fa-parking", "Estacionamiento"],
              ["fas fa-swimming-pool", "Piscina"],
              ["fas fa-umbrella-beach", "Vista a la playa"]
            ].map(([icon, label], i) => (
              <div className="flex items-center space-x-2" key={i}>
                <i className={`${icon} text-gray-600`} />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Precio y Reservar */}
        <div className="mb-6 border rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-teal-700">$540.000</span>
            <span className="text-sm text-gray-500">por noche</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="border rounded p-2">
              <div className="text-xs text-gray-500">Llegada</div>
              <div className="text-sm">1/05/2024</div>
            </div>
            <div className="border rounded p-2">
              <div className="text-xs text-gray-500">Salida</div>
              <div className="text-sm">7/05/2024</div>
            </div>
          </div>

          <div className="border rounded p-2 mb-3">
            <div className="text-xs text-gray-500">Personas</div>
            <div className="text-sm">1 huésped</div>
          </div>

          <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition text-sm">
            Reservar
          </button>
        </div>

        {/* Reseñas */}
        <div className="mb-6">
          <h2 className="font-medium text-lg mb-3">Reseñas de clientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src="https://placehold.co/40x40/cccccc/333333?text=AD"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="text-sm font-medium">Alex Daniel Montañez</div>
                    <div className="text-xs text-gray-500">Estudiante</div>
                  </div>
                </div>
                <p className="text-xs">
                  Pésimo servicio, no me aceptaron el pago a cuotas.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cyan-400 text-black py-12 px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Wayra logo" className="h-10 mb-3" />
            <h3 className="font-bold">Contáctanos</h3>
            <p>Carrera 11 #93-46, Bogotá, Colombia</p>
            <p>Teléfono: +57 123 456 7890</p>
            <p>Correo: contact@wayra.com</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Nuestras Redes</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>© 2025 Wayra - Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
