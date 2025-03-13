import { Link } from "react-router-dom";
import { FaHandsHelping, FaFire, FaUserCheck, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import Logo from "./imagenes/Logo(sin fondo).png";
import HeroImage from "./imagenes/FondoInicio.jpg";
import Persona from "./imagenes/persona.jpg";

export default function Nosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white bg-opacity-30 backdrop-blur-md shadow-md">
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
      {/* Hero Section */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <img src={HeroImage} alt="Colombian street" className="w-full h-full object-cover brightness-50" />
        <h1 className="absolute text-6xl font-extrabold text-white drop-shadow-lg">Nosotros</h1>
      </section>

      {/* About Section Mejorado */}
      <section className="py-16 px-6 md:px-16 flex justify-center">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row max-w-6xl w-full">
          
            {/* Imagen Ajustada */}
            <div className="w-full md:w-1/2">
          <img 
            src={Persona} 
            alt="Mujer sonriendo en un mercado colombiano" 
            className="w-full h-[500px] object-cover object-center md:object-left rounded-lg"
          />
        </div>

          {/* Texto Ajustado */}
          <div className="w-full md:w-1/2 flex items-center px-12 py-14 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg md:ml-8">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">Sobre Wayra</h2>
            <p className="text-xl leading-relaxed">
              En Wayra, nos especializamos en ofrecer soluciones de transporte aéreo y terrestre para conectar
              los destinos más importantes de Colombia.
              <br /><br />
              Nuestro compromiso es brindarte comodidad, seguridad y flexibilidad, permitiéndote viajar sin
              preocupaciones y disfrutar de cada trayecto.
            </p>
          </div>
        </div>
        
      </div>
    </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Nuestros Valores</h2>
        <p className="mb-12 text-gray-500">Principios que reflejan nuestro compromiso con la excelencia y la satisfacción de nuestros clientes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-yellow-200 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform">
            <FaHandsHelping className="text-6xl text-yellow-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">COMPROMISO</h3>
            <p className="text-lg">Ofrecemos un servicio de calidad que supera expectativas.</p>
          </div>
          <div className="bg-orange-300 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform">
            <FaFire className="text-6xl text-orange-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">PASIÓN</h3>
            <p className="text-lg">Trabajamos con entusiasmo para crear momentos inolvidables.</p>
          </div>
          <div className="bg-cyan-200 p-8 rounded-xl shadow-lg hover:scale-105 transition duration-300 transform">
            <FaUserCheck className="text-6xl text-cyan-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold">CONFIANZA</h3>
            <p className="text-lg">Creamos experiencias únicas adaptadas a cada viajero.</p>
          </div>
        </div>
      </section>

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
}
