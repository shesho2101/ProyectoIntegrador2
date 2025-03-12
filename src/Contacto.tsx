import { Link } from "react-router-dom";
import Logo from "./imagenes/Logo(sin fondo).png";
import Fondo from "./imagenes/Paisaje2.jpg";

export default function Contacto() {
  return (
    <div className="relative min-h-screen w-full text-gray-900">
      <div className="absolute inset-0 w-full h-full">
        <img src={Fondo} alt="Paisaje de fondo" className="w-full h-full object-cover" />
      </div>

      <nav className="relative z-10 flex justify-between items-center px-8 py-4">
        <Link to="/">
          <img src={Logo} alt="Wayra logo" className="h-20" />
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-500 transition duration-300">Inicio</Link>
          <Link to="/nosotros" className="hover:text-yellow-500 transition duration-300">Nosotros</Link>
          <Link to="/vuelos" className="hover:text-yellow-500 transition duration-300">Vuelos</Link>
          <Link to="/hoteles" className="hover:text-yellow-500 transition duration-300">Hoteles</Link>
          <Link to="/bus" className="hover:text-yellow-500 transition duration-300">Bus</Link>
          <Link to="/contacto" className="text-yellow-500 font-bold transition duration-300">Contacto</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row px-10 pt-20 md:pt-28 w-full">
        {/* Left Column - Contact Info */}
        <div className="w-full md:w-1/2 pr-8 text-white">
          <h1 className="text-5xl font-bold mb-6">Contacte con nosotros</h1>
          <p className="text-lg mb-8">
            Estamos aquí para ayudarte a planear tu próxima aventura.<br />
            Contáctanos y hagamos realidad tus sueños de viaje.
          </p>
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
              📞
            </div>
            <span className="text-lg">+57 315 983 7643</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
              📧
            </div>
            <span className="text-lg">wayra_25@gmail.com</span>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white bg-opacity-90 rounded-3xl p-8 shadow-lg">
            <form>
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Nombre" 
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-4">
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-6">
                <textarea 
                  placeholder="Mensaje" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}