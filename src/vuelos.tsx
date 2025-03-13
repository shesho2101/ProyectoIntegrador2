import React from "react";
import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const flights = [
  {
    id: 1,
    airline: "Avianca",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=AV",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$700.400",
  },
  {
    id: 2,
    airline: "Avianca",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=AV",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$1.098.890",
  },
  {
    id: 3,
    airline: "LATAM",
    logo: "https://placehold.co/40x40/0000ff/ffffff?text=LA",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$678.800",
  },
  {
    id: 4,
    airline: "Viva",
    logo: "https://placehold.co/40x40/ffff00/000000?text=VV",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$900.890",
  },
  {
    id: 5,
    airline: "Copa Airlines",
    logo: "https://placehold.co/40x40/ff0000/ffffff?text=CM",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$345.908",
  },
  {
    id: 6,
    airline: "LATAM",
    logo: "https://placehold.co/40x40/0000ff/ffffff?text=LA",
    time: "07:02 - 10:32",
    route: "BOG Dorado - CTA Mamatoco Alex",
    price: "$456.789",
  },
];

const Vuelos: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
        <img src={Logo} alt="Logo de Wayra" className="h-16" />
        <div className="flex space-x-6">
          <Link to="/" className="text-lg font-semibold text-black transition duration-300">Inicio</Link>
          <Link to="/nosotros" className="text-lg font-semibold text-black transition duration-300">Nosotros</Link>
          <Link to="/vuelos" className="text-lg font-semibold text-black transition duration-300">Vuelos</Link>
          <Link to="/hoteles" className="text-lg font-semibold text-black transition duration-300">Hoteles</Link>
          <Link to="/bus" className="text-lg font-semibold text-black transition duration-300">Bus</Link>
          <Link to="/contacto" className="text-lg font-semibold text-black transition duration-300">Contacto</Link>
        </div>
      </nav>

      {/* Barra de búsqueda */}
      <div className="container mx-auto px-6 py-6 mt-20">
        <div className="flex rounded-full border border-gray-300 shadow-md bg-white overflow-hidden">
          <div className="flex-1 px-4 py-3 border-r border-gray-300">
            <div className="text-xs font-semibold text-gray-700">Destino</div>
            <input type="text" placeholder="Lugar que deseas" className="text-sm text-gray-500 w-full focus:outline-none" />
          </div>
          <div className="flex-1 px-4 py-3 border-r border-gray-300">
            <div className="text-xs font-semibold text-gray-700">Salida</div>
            <input type="date" className="text-sm text-gray-500 w-full focus:outline-none" />
          </div>
          <div className="flex-1 px-4 py-3 border-r border-gray-300">
            <div className="text-xs font-semibold text-gray-700">Llegada</div>
            <input type="date" className="text-sm text-gray-500 w-full focus:outline-none" />
          </div>
          <div className="flex-1 px-4 py-3 border-r border-gray-300">
            <div className="text-xs font-semibold text-gray-700">Quienes</div>
            <input type="number" min="1" placeholder="Cantidad" className="text-sm text-gray-500 w-full focus:outline-none" />
          </div>
          <button className="bg-blue-900 text-white px-6 flex items-center justify-center rounded-full hover:bg-blue-800 transition">
            <i className="fas fa-arrow-right text-lg"></i>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto flex gap-6 px-6">
        
       {/* Barra de filtros */}
<div className="w-1/4 bg-white rounded-lg shadow-lg p-5">
  <h3 className="text-lg font-semibold mb-4">Filtros</h3>

  {/* Filtro de Escalas */}
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Escalas</h4>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Directo</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
      <span>1 escala</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>2 escalas</span>
    </label>
  </div>

  {/* Filtro de Horarios */}
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Horarios</h4>
    <div className="flex justify-between items-center text-xs mb-2">
      <span>Despegue de XX</span>
      <span>XX: 4:00 - XX 16:00</span>
    </div>
    <input type="range" min="0" max="24" step="1" className="w-full" />
    <div className="flex justify-between items-center text-xs mt-2">
      <span>Despegue de XX</span>
      <span>XX: 7:00 - XX 23:00</span>
    </div>
    <input type="range" min="0" max="24" step="1" className="w-full" />
  </div>

  {/* Filtro de Aerolíneas */}
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Aerolíneas</h4>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Avianca</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>LATAM</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Viva</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Copa Airlines</span>
    </label>
  </div>

  {/* Filtro de Precio */}
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Precio</h4>
    <input type="range" min="100000" max="1000000" step="50000" className="w-full" />
    <div className="text-xs text-gray-600 mt-2">356.678 - 1.000.000</div>
  </div>

  {/* Filtro de Clase */}
  <div className="mb-6">
    <h4 className="text-sm font-medium mb-2">Clase</h4>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Económica básica</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Económica</span>
    </label>
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-blue-600" />
      <span>Ejecutiva</span>
    </label>
  </div>
</div>

        {/* Lista de vuelos */}
        <div className="w-3/4">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center border border-gray-300">
              {/* Información del vuelo */}
              <div className="flex items-center space-x-4">
                <input type="radio" name="flight" className="w-5 h-5 text-blue-500" />
                <img src={flight.logo} alt={`${flight.airline} logo`} className="h-10 w-10 rounded-md shadow-md" />
                <div>
                  <div className="text-md font-bold">{flight.time}</div>
                  <div className="text-gray-600 text-sm">{flight.route}</div>
                  <div className="text-gray-500 text-xs">Escala</div>
                </div>
              </div>
              {/* Precio y botón */}
              <div className="flex flex-col items-end">
                <div className="text-xl font-bold text-green-600">{flight.price}</div>
                <div className="text-xs text-gray-500">{flight.airline}</div>
                <button className="mt-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="Wayra logo" className="h-16 mb-4" />
            <h3 className="text-lg font-bold mb-2">Contáctanos</h3>
            <p className="text-sm">📍 Calle 123, Bogotá, Colombia</p>
            <p className="text-sm">📞 +57 123 456 7890</p>
            <p className="text-sm">✉ contacto@wayra.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl"><FaFacebook /></a>
              <a href="#" className="text-2xl"><FaInstagram /></a>
              <a href="#" className="text-2xl"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">© 2025 Wayra - Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
};

export default Vuelos;
